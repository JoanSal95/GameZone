import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const NotFound = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="text-center shadow border-0">
            <Card.Body className="p-5">
              <div className="display-1 text-danger mb-3">404</div>
              <Card.Title as="h2" className="h3 mb-3">
                ¡Ups! Página no encontrada
              </Card.Title>
              <Card.Text className="text-muted mb-4">
                La página que estás buscando no existe o ha sido movida.
              </Card.Text>
              
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button as={Link} to="/" variant="primary" size="lg">
                  🏠 Volver al Inicio
                </Button>
                <Button as={Link} to="/games" variant="outline-primary" size="lg">
                  🎮 Ver Juegos
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound
