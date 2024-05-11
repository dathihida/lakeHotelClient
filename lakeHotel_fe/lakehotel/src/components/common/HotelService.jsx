import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from 'react-icons/fa'

const HotelService = () => {
    return (
        <>
            <Container className="mb-2">
                <Header title={"Our Services"}/>
                <Row>
                    <h4 className="text-center">
                        Service at <span className="hotel-color">lakeSide - </span> Hotel
                        <span className="gap-2">
                            <FaClock/> -24-Hour Front Desk
                        </span>
                    </h4>
                </Row>
                <hr/>

                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi/> Wifi
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high-speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaUtensils/> Breakfast
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high-speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaClock/> Clock
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high-speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaCocktail/> Cocktail
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high-speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaParking/> Parking
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high-speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaTshirt/> Tshirt
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high-speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaSnowflake/> Snowflake
                                </Card.Title>

                                <Card.Text>
                                    Stay connected with high-speed internet access
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>  
        </>
    )
}

export default HotelService
