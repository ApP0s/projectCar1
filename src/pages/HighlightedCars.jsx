import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import carData from '../dataRod/taladrod-cars.json';

const HighlightedCars = () => {
  const [cars, setCars] = useState([]);
  const [highlightedCars, setHighlightedCars] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    setCars(carData.Cars);
    // Load highlighted cars from localStorage on component mount
    const storedHighlightedCars = JSON.parse(localStorage.getItem('highlightedCars')) || [];
    setHighlightedCars(storedHighlightedCars);
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

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  // Toggle highlight status of a car
  const toggleHighlight = (car) => {
    const isHighlighted = highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid);

    if (isHighlighted) {
      // Remove from highlight
      const updatedHighlightedCars = highlightedCars.filter(highlightedCar => highlightedCar.Cid !== car.Cid);
      setHighlightedCars(updatedHighlightedCars);
      localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlightedCars));
    } else {
      // Add to highlight
      const updatedHighlightedCars = [...highlightedCars, car];
      setHighlightedCars(updatedHighlightedCars);
      localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlightedCars));
    }
  };

  // Remove car from highlight
  const removeHighlightedCar = (car) => {
    const updatedHighlightedCars = highlightedCars.filter(highlightedCar => highlightedCar.Cid !== car.Cid);
    setHighlightedCars(updatedHighlightedCars);
    localStorage.setItem('highlightedCars', JSON.stringify(updatedHighlightedCars));
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center">
          <InputGroup className="w-100">
            <Form.Control
              type="text"
              placeholder="Search cars..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
          </InputGroup>
        </Col>
      </Row>

      {/* Display highlighted cars at the top */}
      {highlightedCars.length > 0 && (
        <Row className="mb-4">
          <Col>
            <h2>Pinned Cars</h2>
            <Row>
              {highlightedCars.map(car => (
                <Col xs={12} sm={6} md={4} lg={3} key={car.Cid} className="mb-4">
                  <Card className="shadow-sm h-100">
                    <Card.Img variant="top" src={car.Img300} alt={car.Model} />
                    <Card.Body>
                      <Card.Title>{car.NameMMT}</Card.Title>
                      <Card.Text>
                        Price: {car.Prc} <br />
                        Year: {car.Yr} <br />
                        Province: {car.Province} <br />
                        Views: {car.PageViews}
                      </Card.Text>
                      <Button variant="danger" onClick={() => removeHighlightedCar(car)}>Remove</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}

      {/* Button group for selecting brands */}
      <ButtonGroup className="mb-4 d-flex flex-wrap">
        {brands.map(brand => (
          <Button
            key={brand}
            variant={selectedBrand === brand ? 'primary' : 'outline-primary'}
            onClick={() => setSelectedBrand(brand)}
            className="mb-2"
          >
            {brand}
          </Button>
        ))}
      </ButtonGroup>

      {/* Display the list of cars */}
      <Row>
        {filterCars().map(car => (
          <Col xs={12} sm={6} md={4} lg={3} key={car.Cid} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src={car.Img300} alt={car.Model} />
              <Card.Body>
                <Card.Title>{car.NameMMT}</Card.Title>
                <Card.Text>
                  Price: {car.Prc} <br />
                  Year: {car.Yr} <br />
                  Province: {car.Province} <br />
                  Views: {car.PageViews}
                </Card.Text>
                <Button
                  variant={highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid) ? 'danger' : 'success'}
                  onClick={() => toggleHighlight(car)}
                >
                  {highlightedCars.some(highlightedCar => highlightedCar.Cid === car.Cid) ? 'Cancel' : 'Highlight'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HighlightedCars;

