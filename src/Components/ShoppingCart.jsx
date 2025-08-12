import React, { useState, useContext } from 'react'
import { Offcanvas, Button, ListGroup, Badge, Card, Row, Col } from 'react-bootstrap'
import { CartContext } from '../context/CartContext.jsx'
import PriceTag from './PriceTag'

const ShoppingCart = ({ show, handleClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useContext(CartContext)

  const handleQuantityChange = (gameId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(gameId)
    } else {
      updateQuantity(gameId, newQuantity)
    }
  }

  const handleCheckout = () => {
    alert('¡Funcionalidad de checkout en desarrollo! 🚀')
    // Aquí iría la lógica de checkout real
  }

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="cart-offcanvas">
      <Offcanvas.Header closeButton className="bg-primary text-white">
        <Offcanvas.Title className="d-flex align-items-center">
          <span className="me-2">🛒</span>
          Carrito de Compras
          {cartItems.length > 0 && (
            <Badge bg="warning" text="dark" className="ms-2">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </Badge>
          )}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0">
        {cartItems.length === 0 ? (
          <div className="text-center p-5">
            <div className="display-1 text-muted mb-3">🛒</div>
            <h5 className="text-muted">Tu carrito está vacío</h5>
            <p className="text-muted">Agrega algunos juegos increíbles</p>
            <Button variant="primary" onClick={handleClose}>
              Explorar Juegos
            </Button>
          </div>
        ) : (
          <>
            {/* Lista de productos */}
            <div className="cart-items flex-grow-1" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.game.id} className="p-3 border-bottom">
                    <Row className="align-items-center">
                      <Col xs={3}>
                        <img 
                          src={item.game.background_image || 'https://via.placeholder.com/80x60?text=No+Image'} 
                          alt={item.game.name}
                          className="img-fluid rounded"
                          style={{ height: '60px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col xs={9}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1 me-2">
                            <h6 className="mb-1 text-truncate" title={item.game.name}>
                              {item.game.name}
                            </h6>
                            <div className="mb-2">
                              <PriceTag game={item.game} size="small" />
                            </div>
                            
                            {/* Controles de cantidad */}
                            <div className="d-flex align-items-center">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.game.id, item.quantity - 1)}
                                className="btn-quantity"
                              >
                                -
                              </Button>
                              <span className="mx-2 fw-bold">{item.quantity}</span>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.game.id, item.quantity + 1)}
                                className="btn-quantity"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeFromCart(item.game.id)}
                            className="btn-remove"
                          >
                            🗑️
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            {/* Resumen y checkout */}
            <Card className="border-0 border-top rounded-0">
              <Card.Body className="p-3">
                {/* Botón limpiar carrito */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button 
                    variant="outline-warning" 
                    size="sm"
                    onClick={clearCart}
                  >
                    🧹 Limpiar Carrito
                  </Button>
                  <small className="text-muted">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)} artículos
                  </small>
                </div>

                {/* Total */}
                <div className="d-flex justify-content-between align-items-center mb-3 p-2 bg-light rounded">
                  <h5 className="mb-0">Total:</h5>
                  <h4 className="mb-0 text-primary fw-bold">
                    ${getCartTotal().toFixed(2)}
                  </h4>
                </div>

                {/* Botones de acción */}
                <div className="d-grid gap-2">
                  <Button 
                    variant="success" 
                    size="lg"
                    onClick={handleCheckout}
                    className="fw-bold"
                  >
                    💳 Proceder al Pago
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    onClick={handleClose}
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart
