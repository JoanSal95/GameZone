import React from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'

const Contact = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-5">
            <h1 className="display-5 text-primary">Contacto</h1>
            <p className="lead">¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="h-100 shadow border-0">
            <Card.Body className="p-4">
              <Card.Title className="h4 text-primary mb-3">
                📞 Información de Contacto
              </Card.Title>
              
              <div className="mb-3">
                <strong>📧 Email:</strong>
                <br />
                <a href="mailto:info@gamezone.com" className="text-decoration-none">
                  info@gamezone.com
                </a>
              </div>
              
              <div className="mb-3">
                <strong>📱 Teléfono:</strong>
                <br />
                +1 (555) 123-4567
              </div>
              
              <div className="mb-0">
                <strong>🏢 Dirección:</strong>
                <br />
                123 Gaming Street, Tech City
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <Card.Title className="h4 text-primary mb-3">
                ✉️ Envíanos un mensaje
              </Card.Title>
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    placeholder="Tu nombre completo"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    placeholder="tu@email.com"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Mensaje:</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    id="message" 
                    name="message" 
                    required 
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    📤 Enviar Mensaje
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact
