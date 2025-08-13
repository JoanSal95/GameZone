import React from 'react'
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          {}
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'bold'
            }}>
              🎮 GameZone
            </h1>
            <p className="lead text-muted">
              Tu marketplace digital definitivo para descubrir, explorar y adquirir los mejores videojuegos
            </p>
          </div>

          {}
          <Row className="g-4">
            {}
            <Col lg={8}>
              <Card className="shadow border-0 h-100">
                <Card.Body className="p-4">
                  <h2 className="h4 text-primary mb-3">� ¿Qué es GameZone?</h2>
                  <p className="mb-3">
                    GameZone es una plataforma de e-commerce especializada en videojuegos, desarrollada con las últimas 
                    tecnologías web. Ofrecemos una experiencia de compra completa y moderna, conectando a los gamers 
                    con los títulos más populares y relevantes del mercado.
                  </p>
                  <p className="mb-3">
                    Nuestra plataforma integra la poderosa API de RAWG, proporcionando acceso a una extensa base de datos 
                    con información detallada de más de 500,000 videojuegos, incluyendo capturas de pantalla, 
                    calificaciones, géneros, plataformas y mucho más.
                  </p>
                  <p className="mb-0">
                    Con un diseño responsivo y una interfaz intuitiva, GameZone hace que descubrir tu próximo juego 
                    favorito sea una experiencia emocionante y sin complicaciones.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            {}
            <Col lg={4}>
              <Card className="shadow border-0 h-100 bg-primary text-white">
                <Card.Body className="p-4 text-center">
                  <h3 className="h5 mb-4">📊 En Números</h3>
                  <div className="mb-3">
                    <div className="display-6 fw-bold">500K+</div>
                    <small>Juegos en catálogo</small>
                  </div>
                  <div className="mb-3">
                    <div className="display-6 fw-bold">100+</div>
                    <small>Plataformas soportadas</small>
                  </div>
                  <div className="mb-3">
                    <div className="display-6 fw-bold">24/7</div>
                    <small>Disponibilidad</small>
                  </div>
                  <div>
                    <div className="display-6 fw-bold">100%</div>
                    <small>Precios competitivos</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {}
          <Row className="mt-5">
            <Col>
              <Card className="shadow border-0">
                <Card.Body className="p-4">
                  <h2 className="h4 text-primary mb-4">✨ Características Principales</h2>
                  <Row className="g-3">
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-success">🛒 Carrito de Compras Inteligente</strong>
                          <br />
                          <small className="text-muted">Sistema de carrito persistente con localStorage</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-danger">💝 Lista de Deseos</strong>
                          <br />
                          <small className="text-muted">Guarda tus juegos favoritos para comprar más tarde</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-info">🔍 Búsqueda Avanzada</strong>
                          <br />
                          <small className="text-muted">Encuentra juegos por nombre, género o plataforma</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-warning">💰 Sistema de Precios Dinámico</strong>
                          <br />
                          <small className="text-muted">Precios basados en popularidad, rating y fecha de lanzamiento</small>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-primary">🎠 Carousel Interactivo</strong>
                          <br />
                          <small className="text-muted">Descubre los juegos más relevantes en la página principal</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-secondary">� Diseño Responsivo</strong>
                          <br />
                          <small className="text-muted">Optimizado para dispositivos móviles, tablets y escritorio</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-dark">🏷️ Sistema de Descuentos</strong>
                          <br />
                          <small className="text-muted">Ofertas especiales y descuentos automáticos</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-0 px-0 py-2">
                          <strong className="text-success">📊 Información Detallada</strong>
                          <br />
                          <small className="text-muted">Capturas, ratings, géneros, plataformas y más</small>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {}
          <Row className="mt-5">
            <Col>
              <Card className="shadow border-0">
                <Card.Body className="p-4">
                  <h2 className="h4 text-primary mb-4">🛠️ Tecnologías Utilizadas</h2>
                  <Row className="text-center">
                    <Col md={3} className="mb-3">
                      <div className="tech-item">
                        <div className="display-6 mb-2">⚛️</div>
                        <Badge bg="info" className="mb-2">React 19.1.1</Badge>
                        <p className="small text-muted mb-0">Framework Frontend</p>
                      </div>
                    </Col>
                    <Col md={3} className="mb-3">
                      <div className="tech-item">
                        <div className="display-6 mb-2">🅱️</div>
                        <Badge bg="primary" className="mb-2">Bootstrap 5</Badge>
                        <p className="small text-muted mb-0">Framework CSS</p>
                      </div>
                    </Col>
                    <Col md={3} className="mb-3">
                      <div className="tech-item">
                        <div className="display-6 mb-2">⚡</div>
                        <Badge bg="warning" className="mb-2">Vite</Badge>
                        <p className="small text-muted mb-0">Build Tool</p>
                      </div>
                    </Col>
                    <Col md={3} className="mb-3">
                      <div className="tech-item">
                        <div className="display-6 mb-2">🌐</div>
                        <Badge bg="success" className="mb-2">RAWG API</Badge>
                        <p className="small text-muted mb-0">Base de Datos</p>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {}
          <Row className="mt-5">
            <Col>
              <Card className="bg-gradient text-white border-0" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}>
                <Card.Body className="p-4 text-center">
                  <h2 className="h4 mb-3">🚀 ¡Comienza tu Aventura Gaming!</h2>
                  <p className="mb-4">
                    Explora nuestro extenso catálogo de juegos, agrega tus favoritos a la lista de deseos 
                    y disfruta de una experiencia de compra única.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Button 
                      as={Link} 
                      to="/games" 
                      variant="light" 
                      size="lg"
                      className="fw-bold"
                    >
                      🎮 Explorar Juegos
                    </Button>
                    <Button 
                      as={Link} 
                      to="/wishlist" 
                      variant="outline-light" 
                      size="lg"
                      className="fw-bold"
                    >
                      💝 Mi Lista de Deseos
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default About
