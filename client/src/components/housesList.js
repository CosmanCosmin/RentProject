import React, {useState, useEffect} from "react";
import houseService from "../services/houseService";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";

const HouseList = () => {
    const [houses, setHouses] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();
    const navigateToSpecificPage = (house) => {
        navigate(`/${house.id}`);
    };
    useEffect(() => {
        retrieveHouses();
    }, []);

    const retrieveHouses = () => {
        houseService.getByCriteria({
            county: searchParams.get("county"),
            type: searchParams.get("type"),
            sellType: searchParams.get("sellType")
        })
            .then(res => {
                res.data = res.data
                    .map(value => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value)
                setHouses(res.data)
            })
            .catch(e => {
                console.log(e)
            });
    };
    const getCardInfo = (house) => {
        var result = ""
        if (house.rooms < 2) result += "o cameră | " 
        else result += `${house.rooms} camere | `
        result += `${house.space} mp | `
        result += `${house.spaceType} | `
        result += `etaj ${house.floor}`
        return result
    }
    return (
            <Container fluid style={{marginTop:"20px"}}>
                <Row>
                    {houses.length > 0 ?
                    houses.map((house, index) => (
                        <Col key={index} style={{marginLeft:"32px"}}>
                            <Card style={{ height: '50vh', width: '40vh'}} key={index} onClick={() => navigateToSpecificPage(house)}>    
                                <Card.Img variant="top" src={`http://localhost:3001/${house.photos[0]}`}/>
                                <Card.Body>
                                    <Card.Title>{house.title}</Card.Title>
                                    <footer fixed="bottom">{getCardInfo(house)}</footer>
                                </Card.Body>
                                <Button variant="primary">Vezi detalii</Button>
                            </Card>
                        </Col>
                    )):
                    <Alert variant="primary" style={{ marginLeft:"20px", width: '40vh'}}>
                        Se pare că nu există niciun articol...
                    </Alert>
                    }
                </Row>
            </Container>
    );
}

export default HouseList;