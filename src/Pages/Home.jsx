import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge, Toast, ToastContainer, Carousel } from 'react-bootstrap'
import { gamesAPI, getRatingColor } from '../services/gamesAPI'
import PriceTag from '../Components/PriceTag'
import { CartContext } from '../context/CartContext.jsx'

const Home = () => {
  const [featuredGames, setFeaturedGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (game) => {
    addToCart(game)
    setToastMessage(`${game.name} añadido al carrito`)
    setShowToast(true)
  }

  useEffect(() => {
    const fetchFeaturedGames = async () => {
      try {
        setLoading(true)
        const games = await gamesAPI.getPopularGames()
        // Seleccionar los 5 juegos más relevantes (mayor rating y popularidad)
        const sortedGames = games
          .filter(game => game.rating && game.ratings_count)
          .sort((a, b) => {
            // Combinar rating y popularidad para determinar relevancia
            const scoreA = (a.rating || 0) * Math.log(a.ratings_count || 1)
            const scoreB = (b.rating || 0) * Math.log(b.ratings_count || 1)
            return scoreB - scoreA
          })
          .slice(0, 5)
        
        setFeaturedGames(sortedGames)
        setError(null)
      } catch (err) {
        setError('Error al cargar los juegos destacados')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedGames()
  }, [])

  return (
    <Container fluid className="home-page">
      {/* Hero Section */}
      <Row className="hero-section text-center text-white py-5 mb-5">
        <Col>
          <h1 className="display-4 fw-bold mb-3">¡Bienvenido a GameZone!</h1>
          <p className="lead mb-4">Descubre los juegos más increíbles y emocionantes</p>
          <Button as={Link} to="/games" variant="warning" size="lg" className="px-4">
            Explorar Todos los Juegos
          </Button>
        </Col>
      </Row>

      <Container>
        {/* Featured Games Carousel Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">🌟 Juegos Más Relevantes</h2>
            <p className="text-center text-muted mb-4">Los títulos mejor valorados por nuestra comunidad</p>
          </Col>
        </Row>

        {loading ? (
          <Row className="justify-content-center">
            <Col xs="auto" className="text-center">
              <Spinner animation="border" variant="primary" className="mb-3" />
              <p>Cargando juegos destacados...</p>
            </Col>
          </Row>
        ) : error ? (
          <Row className="justify-content-center">
            <Col md={6}>
              <Alert variant="danger" className="text-center">
                {error}
              </Alert>
            </Col>
          </Row>
        ) : (
          <>
            {/* Games Carousel */}
            <Row className="justify-content-center mb-5">
              <Col lg={10} xl={8}>
                <Carousel 
                  indicators={true} 
                  controls={true} 
                  interval={4000}
                  className="games-carousel shadow-lg rounded"
                >
                  {featuredGames.map((game, index) => (
                    <Carousel.Item key={game.id}>
                      <div className="carousel-game-card">
                        <Row className="align-items-center g-0">
                          <Col md={6}>
                            <div className="carousel-image-container">
                              <img
                                src={game.background_image || 'https://via.placeholder.com/600x400?text=No+Image'}
                                alt={game.name}
                                className="carousel-image"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'
                                }}
                              />
                              <div className="carousel-overlay">
                                <Badge 
                                  bg="success"
                                  className="rating-badge"
                                  style={{ backgroundColor: getRatingColor(game.rating) }}
                                >
                                  ⭐ {game.rating?.toFixed(1) || 'N/A'}
                                </Badge>
                                <div className="popularity-indicator">
                                  <small className="text-white">
                                    🔥 {(game.ratings_count || 0).toLocaleString()} valoraciones
                                  </small>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="carousel-content p-4">
                              <div className="game-rank">
                                <Badge bg="warning" className="mb-2">
                                  #{index + 1} MÁS RELEVANTE
                                </Badge>
                              </div>
                              <h3 className="game-title">{game.name}</h3>
                              <p className="game-genres text-muted mb-3">
                                {game.genres?.slice(0, 3).map(genre => genre.name).join(' • ') || 'Género no disponible'}
                              </p>
                              
                              {/* Precio destacado */}
                              <div className="price-section mb-4">
                                <PriceTag game={game} size="large" />
                              </div>
                              
                              {/* Descripción breve */}
                              {game.description_raw && (
                                <p className="game-description text-muted mb-4">
                                  {game.description_raw.substring(0, 150)}...
                                </p>
                              )}
                              
                              {/* Action buttons */}
                              <div className="carousel-actions d-flex gap-3">
                                <Button 
                                  as={Link} 
                                  to={`/games/${game.id}`} 
                                  variant="outline-primary" 
                                  size="lg"
                                  className="flex-fill"
                                >
                                  📖 Ver Detalles
                                </Button>
                                <Button 
                                  variant="success" 
                                  size="lg"
                                  className="flex-fill"
                                  onClick={() => handleAddToCart(game)}
                                >
                                  🛒 Comprar Ahora
                                </Button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Col>
            </Row>
            
            {/* Call to action */}
            <Row className="text-center mt-5">
              <Col>
                <div className="cta-section p-4 bg-light rounded">
                  <h4 className="mb-3">¿Quieres ver más juegos increíbles?</h4>
                  <Button as={Link} to="/games" variant="primary" size="lg" className="px-5">
                    🎮 Explorar Catálogo Completo
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>

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

export default Home