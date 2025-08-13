import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Toast, ToastContainer } from 'react-bootstrap'
import { gamesAPI, formatReleaseDate, getRatingColor } from '../services/gamesAPI'
import PriceTag from '../Components/PriceTag'
import { CartContext } from '../context/CartContext.jsx'
import { WishlistContext } from '../context/WishlistContext.jsx'

const GameDetail = () => {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  
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

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true)
        const gameData = await gamesAPI.getGameDetails(id)
        setGame(gameData)
        setError(null)
      } catch (err) {
        setError('Error al cargar los detalles del juego')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchGameDetails()
    }
  }, [id])

  if (loading) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <Spinner animation="border" variant="primary" size="lg" className="mb-3" />
            <p>Cargando detalles del juego...</p>
          </Col>
        </Row>
      </Container>
    )
  }

  if (error || !game) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Alert variant="danger" className="text-center">
              <Alert.Heading>Error</Alert.Heading>
              <p>{error || 'Juego no encontrado'}</p>
              <Button as={Link} to="/games" variant="outline-danger">
                ← Volver a Juegos
              </Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      {}
      <Row className="mb-4">
        <Col>
          <Button as={Link} to="/games" variant="outline-primary">
            ← Volver a Juegos
          </Button>
        </Col>
      </Row>

      {}
      <Row className="mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow">
            <Card.Img 
              variant="top"
              src={game.background_image || 'https://via.placeholder.com/600x400?text=Game+Image'}
              alt={game.name}
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found'
              }}
            />
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0 shadow">
            <Card.Body className="p-4">
              <Card.Title as="h1" className="display-6 text-primary mb-3">
                {game.name}
              </Card.Title>
              
              {}
              <div className="d-flex align-items-center mb-3">
                <Badge 
                  bg="success" 
                  className="fs-6 me-2"
                  style={{ backgroundColor: getRatingColor(game.rating) }}
                >
                  ⭐ {game.rating || 'N/A'}
                </Badge>
                <span className="text-muted">
                  ({game.ratings_count || 0} valoraciones)
                </span>
              </div>

              {}
              <div className="mb-4 p-3 bg-light rounded">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="text-primary mb-2">Precio:</h5>
                    <PriceTag game={game} size="large" />
                  </div>
                  <div className="d-flex flex-column gap-2">
                    <Button 
                      variant="success" 
                      size="lg" 
                      className="px-4"
                      onClick={() => handleAddToCart(game)}
                    >
                      🛒 Comprar Ahora
                    </Button>
                    <Button 
                      variant={isInWishlist(game.id) ? "danger" : "outline-primary"} 
                      size="sm"
                      onClick={() => handleWishlistToggle(game)}
                    >
                      {isInWishlist(game.id) ? "💔 Quitar de Wishlist" : "💝 Añadir a Wishlist"}
                    </Button>
                  </div>
                </div>
              </div>

              {}
              <div className="mb-3">
                <strong className="text-primary">Fecha de lanzamiento:</strong> 
                <span className="ms-2">{formatReleaseDate(game.released)}</span>
              </div>

              {game.developers && game.developers.length > 0 && (
                <div className="mb-3">
                  <strong className="text-primary">Desarrollador:</strong> 
                  <span className="ms-2">{game.developers.map(dev => dev.name).join(', ')}</span>
                </div>
              )}

              {game.publishers && game.publishers.length > 0 && (
                <div className="mb-3">
                  <strong className="text-primary">Editor:</strong> 
                  <span className="ms-2">{game.publishers.map(pub => pub.name).join(', ')}</span>
                </div>
              )}

              {}
              {game.genres && game.genres.length > 0 && (
                <div className="mb-3">
                  <strong className="text-primary d-block mb-2">Géneros:</strong>
                  {game.genres.map(genre => (
                    <Badge key={genre.id} bg="primary" className="me-1 mb-1">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}

              {}
              {game.platforms && game.platforms.length > 0 && (
                <div className="mb-3">
                  <strong className="text-primary d-block mb-2">Plataformas:</strong>
                  {game.platforms.map(platform => (
                    <Badge key={platform.platform.id} bg="success" className="me-1 mb-1">
                      {platform.platform.name}
                    </Badge>
                  ))}
                </div>
              )}

              {}
              {game.website && (
                <div className="mt-4">
                  <Button 
                    href={game.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    variant="outline-primary"
                  >
                    🌐 Sitio web oficial
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {}
      {game.description_raw && (
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow">
              <Card.Body className="p-4">
                <Card.Title as="h2" className="h3 text-primary mb-3">
                  Descripción
                </Card.Title>
                <Card.Text style={{ lineHeight: '1.8' }}>
                  {game.description_raw}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {}
      {game.screenshots && game.screenshots.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow">
              <Card.Body className="p-4">
                <Card.Title as="h2" className="h3 text-primary mb-3">
                  Capturas de pantalla
                </Card.Title>
                <Row>
                  {game.screenshots.slice(0, 6).map((screenshot, index) => (
                    <Col md={4} key={index} className="mb-3">
                      <Card.Img 
                        src={screenshot.image} 
                        alt={`Screenshot ${index + 1}`}
                        loading="lazy"
                        className="rounded shadow-sm"
                        style={{ 
                          height: '200px', 
                          objectFit: 'cover',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {}
      {game.tags && game.tags.length > 0 && (
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow">
              <Card.Body className="p-4">
                <Card.Title as="h2" className="h3 text-primary mb-3">
                  Etiquetas
                </Card.Title>
                {game.tags.slice(0, 15).map(tag => (
                  <Badge key={tag.id} bg="light" text="dark" className="me-1 mb-1">
                    {tag.name}
                  </Badge>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {}
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

export default GameDetail
