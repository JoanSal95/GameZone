import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { CartContext } from '../context/CartContext.jsx'
import { WishlistContext } from '../context/WishlistContext.jsx'
import ShoppingCart from './ShoppingCart'

const Navigation = () => {
  const location = useLocation()
  const { getCartItemsCount } = useContext(CartContext)
  const { getWishlistItemsCount } = useContext(WishlistContext)
  const [showCart, setShowCart] = useState(false)

  const handleCartToggle = () => setShowCart(!showCart)
  const handleCartClose = () => setShowCart(false)

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-logo">
            🎮 GameZone
          </Navbar.Brand>

          <div className="d-flex d-lg-none align-items-center gap-2">
            <Button 
              as={Link}
              to="/wishlist"
              variant="outline-light" 
              size="sm"
              className="position-relative wishlist-button"
            >
              💝
              {getWishlistItemsCount() > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem' }}
                >
                  {getWishlistItemsCount()}
                </Badge>
              )}
            </Button>

            <Button 
              variant="outline-warning" 
              size="sm"
              onClick={handleCartToggle}
              className="position-relative cart-button me-2"
            >
              🛒
              {getCartItemsCount() > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.6rem' }}
                >
                  {getCartItemsCount()}
                </Badge>
              )}
            </Button>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>

          <div className="d-none d-lg-block">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="/" 
                className={location.pathname === '/' ? 'active' : ''}
              >
                🏠 Inicio
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/games" 
                className={location.pathname === '/games' ? 'active' : ''}
              >
                🎮 Juegos
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
              >
                ℹ️ Acerca de
              </Nav.Link>
            </Nav>

            <div className="d-none d-lg-flex gap-2">
              <Button 
                as={Link}
                to="/wishlist"
                variant="outline-light" 
                className="position-relative wishlist-button"
              >
                💝 Lista de Deseos
                {getWishlistItemsCount() > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {getWishlistItemsCount()}
                  </Badge>
                )}
              </Button>

              <Button 
                variant="outline-warning" 
                onClick={handleCartToggle}
                className="position-relative cart-button"
              >
                🛒 Carrito
                {getCartItemsCount() > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {getCartItemsCount()}
                  </Badge>
                )}
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ShoppingCart show={showCart} handleClose={handleCartClose} />
    </>
  )
}

export default Navigation
