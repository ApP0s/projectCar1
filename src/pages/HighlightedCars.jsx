import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const HighlightedCars = () => {
  const [highlightedCars, setHighlightedCars] = useState([]);

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(storedCars);
  }, []);

  const removeCarFromHighlight = (car) => {
    const updatedCars = highlightedCars.filter(c => c.id !== car.id);
    setHighlightedCars(updatedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedCars));
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Highlighted Cars</h1>
      <Row>
        {highlightedCars.map((car, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{car.brand} {car.model}</Card.Title>
                <Card.Text>
                  Value: {car.value} Baht
                </Card.Text>
                <Button variant="danger" onClick={() => removeCarFromHighlight(car)}>Remove</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HighlightedCars;
