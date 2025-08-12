import React, { useContext } from 'react'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { WishlistContext } from '../context/WishlistContext'
import { CartContext } from '../context/CartContext'
import PriceTag from '../Components/PriceTag'

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useContext(WishlistContext)
  const { addToCart } = useContext(CartContext)

  const handleAddToCart = (game) => {
    addToCart(game)
  }

  const handleRemoveFromWishlist = (gameId) => {
    removeFromWishlist(gameId)
  }

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center">
              <div className="mb-4">
                <h1 className="display-4 mb-3">💝 Lista de Deseos</h1>
                <p className="lead text-muted">Tu lista de deseos está vacía</p>
              </div>
              
              <Alert variant="info" className="mb-4">
                <Alert.Heading>¡Comienza a explorar!</Alert.Heading>
                <p className="mb-0">
                  Agrega juegos a tu lista de deseos para guardar tus favoritos y comprarlos más tarde.
                </p>
              </Alert>

              <div className="d-flex gap-3 justify-content-center">
                <Button as={Link} to="/" variant="primary" size="lg">
                  🏠 Ir al Inicio
                </Button>
                <Button as={Link} to="/games" variant="outline-primary" size="lg">
                  🎮 Explorar Juegos
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-5 mb-2">💝 Mi Lista de Deseos</h1>
          <p className="text-muted mb-0">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'juego guardado' : 'juegos guardados'}
          </p>
        </div>
        
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline-danger" 
            onClick={clearWishlist}
            className="d-none d-md-block"
          >
            🗑️ Limpiar Lista
          </Button>
        )}
      </div>

      {/* Botón limpiar lista en móvil */}
      {wishlistItems.length > 0 && (
        <div className="d-md-none mb-3">
          <Button 
            variant="outline-danger" 
            size="sm"
            onClick={clearWishlist}
            className="w-100"
          >
            🗑️ Limpiar Lista de Deseos
          </Button>
        </div>
      )}

      <Row>
        {wishlistItems.map(game => (
          <Col key={game.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
            <Card className="h-100 game-card">
              <div className="game-image position-relative">
                <Card.Img 
                  variant="top" 
                  src={game.background_image || '/placeholder-game.jpg'} 
                  alt={game.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                
                {/* Overlay con botones */}
                <div className="game-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="d-flex gap-2">
                    <Button 
                      as={Link} 
                      to={`/games/${game.id}`}
                      variant="primary" 
                      size="sm"
                    >
                      👁️ Ver
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(game.id)}
                    >
                      ❌ Quitar
                    </Button>
                  </div>
                </div>
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 mb-2" style={{ minHeight: '2.5rem' }}>
                  {game.name}
                </Card.Title>

                {/* Géneros */}
                {game.genres && game.genres.length > 0 && (
                  <div className="mb-2">
                    <small className="text-muted">
                      {game.genres.slice(0, 2).map(genre => genre.name).join(', ')}
                    </small>
                  </div>
                )}

                {/* Rating */}
                {game.rating && (
                  <div className="mb-2">
                    <span className={`badge ${
                      game.rating >= 4.5 ? 'bg-success' : 
                      game.rating >= 4.0 ? 'bg-primary' : 
                      game.rating >= 3.0 ? 'bg-warning' : 'bg-secondary'
                    }`}>
                      ⭐ {game.rating}
                    </span>
                  </div>
                )}

                {/* Precio */}
                <div className="mb-3">
                  <PriceTag game={game} size="small" />
                </div>

                {/* Botones de acción */}
                <div className="mt-auto d-flex flex-column gap-2">
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => handleAddToCart(game)}
                  >
                    🛒 Agregar al Carrito
                  </Button>
                  
                  <div className="d-flex gap-2">
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
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveFromWishlist(game.id)}
                      title="Quitar de la lista"
                    >
                      💔
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Call to action */}
      <div className="text-center mt-5 py-4">
        <h3 className="mb-3">¿Buscas más juegos?</h3>
        <p className="text-muted mb-4">Explora nuestro catálogo completo y encuentra tu próximo juego favorito</p>
        <Button as={Link} to="/games" variant="primary" size="lg">
          🎮 Explorar Más Juegos
        </Button>
      </div>
    </Container>
  )
}

export default Wishlist
