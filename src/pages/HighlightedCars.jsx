import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import carData from '../dataRod/taladrod-cars.json';

const HightlightedCars = () => {
  const [cars, setCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCars(carData.Cars);
  }, []);

  // Extract unique brands from the car data
  const brands = ['All', ...new Set(cars.map(car => car.NameMMT.split(' ')[0]))];

  const filterCars = () => {
    let filteredCars = cars;

    if (selectedBrand !== 'All') {
      filteredCars = filteredCars.filter(car => car.NameMMT.split(' ')[0] === selectedBrand);
    }

    if (searchQuery) {
      filteredCars = filteredCars.filter(car =>
        car.NameMMT.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredCars;
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Car Dashboard</h1>
        </Col>
        <Col xs="auto">
          <Form inline>
            <Form.Control
              type="text"
              placeholder="Search cars..."
              className="mr-sm-2"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </Form>
        </Col>
      </Row>

      <ButtonGroup className="mb-4">
        {brands.map(brand => (
          <Button 
            key={brand} 
            variant={selectedBrand === brand ? 'primary' : 'outline-primary'}
            onClick={() => setSelectedBrand(brand)}
          >
            {brand}
          </Button>
        ))}
      </ButtonGroup>

      <Row>
        {filterCars().map(car => (
          <Col md={4} key={car.Cid} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img variant="top" src={car.Img300} alt={car.Model} />
              <Card.Body>
                <Card.Title>{car.NameMMT}</Card.Title>
                <Card.Text>
                  Price: {car.Prc} <br />
                  Year: {car.Yr} <br />
                  Province: {car.Province} <br />
                  Views: {car.PageViews}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HightlightedCars;
