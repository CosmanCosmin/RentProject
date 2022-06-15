import React, { useEffect, useState } from "react";
import { Carousel, CarouselItem, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import houseService from "../services/houseService";    
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/house.css'

const House = () => {
    const id = useParams();
    const initialHouseState = {
        id: null,
        type: "house",
        title: "",
        price: 0,
        description: "",
        county: "",
        address: "",
        ownerName: "",
        phoneNumber: "",
        contactEmail: "",
        sellType: "rent",
        spaceType: "",
        rooms: 0,
        space: 0,
        floor: "",
        photos: ""
    }

    const [house, setHouse] = useState(initialHouseState);
    
    const getHouse = id => {
        houseService.get(id)
            .then(res => {
                setHouse(res.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        if (id) {
            getHouse(id["id"]);
        }
    }, [id]);

    return (
        <Container fluid>
            <Carousel style={{marginTop: '5px'}} controls={false}>
                {
                    Array.from(house.photos).map((image) => {
                        return (
                        <CarouselItem>
                            <img class="d-block mx-auto" width={900} height={300} src={`http://localhost:3001/${image}`} alt="house"/>
                        </CarouselItem>
                        )
                    })
                }
            </Carousel>
            <div id='content-container'>
                <div id='text-container'>
                        <div id='text-content'>
                            <h1>{house.title}</h1>
                            <h2>{house.address}</h2>
                            <h3>Preț de {house.price} euro pe lună</h3>
                            <div class='spacer'></div>
                            <h4>{house.description}</h4>
                            <h4>Proprietarul: {house.ownerName}</h4>
                            <h4>Număr de telefon: {house.phoneNumber}</h4>
                            <h4>Adresa de email: {house.contactEmail}</h4>
                            <div class='spacer'></div>
                            <h5>Compartimentare: {house.spaceType}</h5>
                            <h5>Spațiu: {house.space} metrii pătrați</h5>
                            <h5>Etajul: {house.floor}</h5>
                            <h5>Camere: {house.rooms > 1 ? `${house.rooms} camere` : `o cameră`}</h5>
                        </div>
                </div>
            </div>
        </Container>
    );
}

export default House;