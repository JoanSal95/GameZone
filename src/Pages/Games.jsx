import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Form, InputGroup, Spinner, Alert, Badge, Toast, ToastContainer, Pagination } from 'react-bootstrap'
import { gamesAPI, formatReleaseDate, getRatingColor } from '../services/gamesAPI'
import PriceTag from '../Components/PriceTag'
import { CartContext } from '../context/CartContext.jsx'
import { WishlistContext } from '../context/WishlistContext.jsx'

const Games = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrevious, setHasPrevious] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [sortOption, setSortOption] = useState('relevance')
  
  const { addToCart } = useContext(CartContext)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext)

  const handleAddToCart = (game) => {
    addToCart(game)
    setToastMessage(`${game.name} añadido al carrito`)
    setShowToast(true)
  }

  const handleWishlistToggle = (game) => {
    if (isInWishlist(game.id)) {
      removeFromWishlist(game.id)
      setToastMessage(`${game.name} removido de la lista de deseos`)
    } else {
      addToWishlist(game)
      setToastMessage(`${game.name} añadido a la lista de deseos`)
    }
    setShowToast(true)
  }

  // Función para ordenar juegos
  const sortGames = (gamesArray, sortBy) => {
    const sortedGames = [...gamesArray]
    
    switch (sortBy) {
      case 'alphabetical':
        return sortedGames.sort((a, b) => a.name.localeCompare(b.name))
      
      case 'alphabetical-desc':
        return sortedGames.sort((a, b) => b.name.localeCompare(a.name))
      
      case 'release-date':
        return sortedGames.sort((a, b) => {
          const dateA = a.released ? new Date(a.released) : new Date(0)
          const dateB = b.released ? new Date(b.released) : new Date(0)
          return dateB - dateA // Más recientes primero
        })
      
      case 'release-date-asc':
        return sortedGames.sort((a, b) => {
          const dateA = a.released ? new Date(a.released) : new Date(0)
          const dateB = b.released ? new Date(b.released) : new Date(0)
          return dateA - dateB // Más antiguos primero
        })
      
      case 'rating':
        return sortedGames.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      
      case 'relevance':
      default:
        // Ordenar por relevancia (rating * popularidad)
        return sortedGames.sort((a, b) => {
          const scoreA = (a.rating || 0) * Math.log((a.ratings_count || 1) + 1)
          const scoreB = (b.rating || 0) * Math.log((b.ratings_count || 1) + 1)
          return scoreB - scoreA
        })
    }
  }

  // Manejar cambio de ordenamiento
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption)
    if (games.length > 0) {
      const sortedGames = sortGames(games, newSortOption)
      setGames(sortedGames)
    }
  }

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    fetchGames(newPage)
    // Scroll al inicio de la página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    fetchGames(1)
    setCurrentPage(1)
  }, [])

  // Efecto para aplicar ordenamiento cuando cambie la opción
  useEffect(() => {
    if (games.length > 0) {
      const sortedGames = sortGames(games, sortOption)
      setGames(sortedGames)
    }
  }, [sortOption])

  const fetchGames = async (page = 1) => {
    try {
      setLoading(true)
      
      const data = await gamesAPI.getAllGames(page)
      const sortedGames = sortGames(data.games, sortOption)
      
      setGames(sortedGames)
      setTotalCount(data.totalCount)
      setHasNext(data.hasNext)
      setHasPrevious(data.hasPrevious)
      setError(null)
    } catch (err) {
      setError('Error al cargar los juegos')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      setIsSearching(false)
      setCurrentPage(1)
      fetchGames(1)
      return
    }

    try {
      setLoading(true)
      setIsSearching(true)
      setCurrentPage(1)
      const searchResults = await gamesAPI.searchGames(searchTerm)
      const sortedResults = sortGames(searchResults, sortOption)
      setGames(sortedResults)
      setError(null)
    } catch (err) {
      setError('Error al buscar juegos')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setIsSearching(false)
    setCurrentPage(1)
    fetchGames(1)
  }

  return (
    <Container className="games-page py-4">
      {/* Header */}
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4 text-primary">Catálogo de Juegos</h1>
          <p className="lead text-muted">Descubre los mejores videojuegos</p>
        </Col>
      </Row>

      {/* Search Section */}
      <Row className="justify-content-center mb-4">
        <Col lg={8}>
          <Form onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Buscar juegos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="lg"
              />
              <Button variant="primary" type="submit">
                🔍 Buscar
              </Button>
              {isSearching && (
                <Button 
                  variant="outline-danger" 
                  onClick={handleClearSearch}
                >
                  ✕ Limpiar
                </Button>
              )}
            </InputGroup>
          </Form>
        </Col>
      </Row>

      {/* Sort Section */}
      <Row className="justify-content-center mb-4">
        <Col lg={8}>
          <div className="sort-section">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted fw-semibold">Ordenar por:</span>
                <Form.Select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{ width: 'auto', minWidth: '200px' }}
                  size="sm"
                >
                  <option value="relevance">🎯 Relevancia</option>
                  <option value="alphabetical">🔤 A-Z</option>
                  <option value="alphabetical-desc">🔤 Z-A</option>
                  <option value="rating">⭐ Mejor Valorados</option>
                  <option value="release-date">📅 Más Recientes</option>
                  <option value="release-date-asc">📅 Más Antiguos</option>
                </Form.Select>
              </div>
              <div className="text-muted small">
                {games.length} {games.length === 1 ? 'juego' : 'juegos'}
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Games Info */}
      <Row className="mb-3">
        <Col>
          <p className="text-muted text-center">
            {isSearching 
              ? `Resultados para "${searchTerm}": ${games.length} juegos encontrados`
              : `Mostrando ${games.length} juegos de ${totalCount.toLocaleString()} disponibles`
            }
          </p>
        </Col>
      </Row>

      {loading ? (
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <Spinner animation="border" variant="primary" size="lg" className="mb-3" />
            <p>Cargando juegos...</p>
          </Col>
        </Row>
      ) : error ? (
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error}</p>
              <Button variant="outline-danger" onClick={() => fetchGames(1)}>
                Reintentar
              </Button>
            </Alert>
          </Col>
        </Row>
      ) : (
        <>
          {/* Games Grid */}
          <Row>
            {games.map((game) => (
              <Col lg={4} md={6} key={game.id} className="mb-4">
                <Card className="h-100 game-card shadow-sm border-0">
                  <div className="position-relative">
                    <Card.Img 
                      variant="top" 
                      src={game.background_image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                      alt={game.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                      }}
                    />
                    
                    {/* Rating Badge */}
                    <div className="position-absolute top-0 end-0 m-2">
                      <Badge 
                        bg="success"
                        style={{ backgroundColor: getRatingColor(game.rating) }}
                      >
                        ⭐ {game.rating || 'N/A'}
                      </Badge>
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="h6">{game.name}</Card.Title>
                    
                    <div className="mb-2">
                      <small className="text-muted">
                        {game.genres && game.genres.length > 0 
                          ? game.genres.slice(0, 2).map(genre => genre.name).join(', ')
                          : 'Sin categoría'
                        }
                      </small>
                    </div>

                    {/* Precio del juego */}
                    <div className="mb-2">
                      <PriceTag game={game} size="normal" />
                    </div>
                    
                    <Card.Text className="text-muted small">
                      <strong>Lanzado:</strong> {formatReleaseDate(game.released)}
                    </Card.Text>
                    
                    {/* Botones de acción */}
                    <div className="mt-auto d-flex gap-2">
                      <Button 
                        as={Link} 
                        to={`/games/${game.id}`} 
                        variant="outline-primary" 
                        size="sm"
                        className="flex-grow-1"
                      >
                        Ver Detalles
                      </Button>
                      <Button 
                        variant={isInWishlist(game.id) ? "danger" : "outline-secondary"} 
                        size="sm"
                        className="px-2"
                        onClick={() => handleWishlistToggle(game)}
                        title={isInWishlist(game.id) ? "Quitar de wishlist" : "Añadir a wishlist"}
                      >
                        {isInWishlist(game.id) ? "💔" : "💝"}
                      </Button>
                      <Button 
                        variant="success" 
                        size="sm"
                        className="px-3"
                        onClick={() => handleAddToCart(game)}
                        title="Añadir al carrito"
                      >
                        🛒
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination Controls */}
          {!isSearching && (
            <Row className="justify-content-center mt-5">
              <Col xs="auto">
                <Pagination className="mb-0">
                  <Pagination.First 
                    onClick={() => handlePageChange(1)}
                    disabled={!hasPrevious}
                  />
                  <Pagination.Prev 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!hasPrevious}
                  />
                  
                  {/* Páginas visibles */}
                  {(() => {
                    const totalPages = Math.ceil(totalCount / 12) // 12 juegos por página
                    const maxVisiblePages = 5
                    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
                    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)
                    
                    // Ajustar el inicio si estamos cerca del final
                    if (endPage - startPage < maxVisiblePages - 1) {
                      startPage = Math.max(1, endPage - maxVisiblePages + 1)
                    }
                    
                    const pages = []
                    
                    // Mostrar primera página si no está visible
                    if (startPage > 1) {
                      pages.push(
                        <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
                          1
                        </Pagination.Item>
                      )
                      if (startPage > 2) {
                        pages.push(<Pagination.Ellipsis key="start-ellipsis" />)
                      }
                    }
                    
                    // Páginas del rango visible
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <Pagination.Item 
                          key={i} 
                          active={i === currentPage}
                          onClick={() => handlePageChange(i)}
                        >
                          {i}
                        </Pagination.Item>
                      )
                    }
                    
                    // Mostrar última página si no está visible
                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pages.push(<Pagination.Ellipsis key="end-ellipsis" />)
                      }
                      pages.push(
                        <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
                          {totalPages}
                        </Pagination.Item>
                      )
                    }
                    
                    return pages
                  })()}
                  
                  <Pagination.Next 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!hasNext}
                  />
                  <Pagination.Last 
                    onClick={() => handlePageChange(Math.ceil(totalCount / 12))}
                    disabled={!hasNext}
                  />
                </Pagination>
              </Col>
            </Row>
          )}

          {/* Información de paginación */}
          {!isSearching && (
            <Row className="justify-content-center mt-3">
              <Col xs="auto">
                <small className="text-muted">
                  Página {currentPage} de {Math.ceil(totalCount / 12)} 
                  ({totalCount.toLocaleString()} juegos en total)
                </small>
              </Col>
            </Row>
          )}
        </>
      )}

      {/* Toast de confirmación */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast 
          bg="success" 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
        >
          <Toast.Body className="text-white">
            <strong>✅ {toastMessage}</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  )
}

export default Games
