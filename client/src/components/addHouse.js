import React, {useState} from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import houseService from "../services/houseService";
import userService from "../services/userService";

const AddHouse = () => {
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
    const [submitted, setSubmitted] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setHouse({...house, [name]: value});
    };

    const saveHouse = (event) => {
        if (!userService.getCurrentUser()) {
            alert("Trebuie să fii logat pentru a adăuga un anunț.")
            return;
        }
        const form = event.currentTarget;   
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);

        const input = [...document.getElementById("photos").files];
        let photoUrls = []
        let index = 0
        input.forEach(function(file) {
            const formData = new FormData();
            formData.append("file", file)
        
            const options = {
                method: 'POST',
                body: formData
            }

            fetch("http://localhost:3001/housingAPI/handleFile", options)
                .then(res => res.json())
                .then(data => {
                    photoUrls.push(data.message)
                })
                .then(() => {
                    index++ 
                    if (index === input.length) {
                        var data = {
                            title: house.title,
                            type: house.type,
                            price: house.price,
                            description: house.description,
                            county: house.county,
                            address: house.address,
                            ownerName: house.ownerName,
                            phoneNumber: house.phoneNumber,
                            contactEmail: house.contactEmail,
                            sellType: house.sellType,
                            spaceType: house.spaceType,
                            rooms: house.rooms,
                            space: house.space,
                            floor: house.floor,
                            photos: photoUrls
                        };
                        
                        houseService.create(data)
                            .then(response => {
                                setHouse({
                                    id: response.data.id,
                                    type: response.data.type,
                                    price: response.data.price,
                                    title: response.data.title,
                                    description: response.data.description,
                                    county: response.data.county,
                                    address: response.data.address,
                                    ownerName: response.data.ownerName,
                                    phoneNumber: response.data.phoneNumber,
                                    contactEmail: response.data.contactEmail,
                                    sellType: response.data.sellType,
                                    spaceType: response.data.spaceType,
                                    rooms: response.data.rooms,
                                    space: response.data.space,
                                    floor: response.data.floor,
                                    photos: response.data.photos
                                });
                                setSubmitted(true);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
                .catch(err => console.log(err))   
        })
    };

    const newHouse = () => {
        setHouse(initialHouseState);
        setSubmitted(false);
    }
    
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Anunț adăugat cu succes!</h4>
                    <button className="btn btn-success" onClick={newHouse}>Adăugați alt anunț</button>
                </div>
            ) : (
                <Container fluid style={{marginTop:"20px"}}>
                    <Form noValidate validated={validated} onSubmit={saveHouse}>
                        <Row>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Titlu" required onChange={handleInputChange} name="title"/>
                                    <label htmlFor="floatingInputCustom">Titlul articolului</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="number" placeholder="Preț" required onChange={handleInputChange} name="price"/>
                                    <label htmlFor="floatingInputCustom">Preț în euro</label>
                                </Form.Floating>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Nume" required onChange={handleInputChange} name="ownerName"/>
                                    <label htmlFor="floatingInputCustom">Numele proprietarului</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Mobil" required onChange={handleInputChange} name="phoneNumber"/>
                                    <label htmlFor="floatingInputCustom">Numărul de telefon</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Mail" required onChange={handleInputChange} name="contactEmail"/>
                                    <label htmlFor="floatingInputCustom">Adresa de e-mail</label>
                                </Form.Floating>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Oraș" required onChange={handleInputChange} name="county"/>
                                    <label htmlFor="floatingInputCustom">Localitatea</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Adresa" required onChange={handleInputChange} name="address"/>
                                    <label htmlFor="floatingInputCustom">Adresa</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Select onChange={handleInputChange} required name="sellType">
                                        <option value="house">Închiriere</option>
                                        <option value="apartment">Vânzare</option>
                                    </Form.Select>
                                    <label htmlFor="floatingInputCustom">Tipul tranzacției</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Select onChange={handleInputChange} required name="type">
                                        <option value="house">Casă</option>
                                        <option value="apartment">Apartament</option>
                                    </Form.Select>
                                    <label htmlFor="floatingInputCustom">Casă/Apartament</label>
                                </Form.Floating>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Tip" required onChange={handleInputChange} name="spaceType"/>
                                    <label htmlFor="floatingInputCustom">Compartimentare</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="number" placeholder="Camere" required onChange={handleInputChange} name="rooms"/>
                                    <label htmlFor="floatingInputCustom">Camere</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="number" placeholder="Camere" required onChange={handleInputChange} name="space"/>
                                    <label htmlFor="floatingInputCustom">Spațiul în mp</label>
                                </Form.Floating>
                            </Col>
                            <Col>
                                <Form.Floating className="mb-3">
                                    <Form.Control type="text" placeholder="Etaj" required onChange={handleInputChange} name="floor"/>
                                    <label htmlFor="floatingInputCustom">Etaj</label>
                                </Form.Floating>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Descriere</Form.Label>
                            <Form.Control as="textarea" placeholder="Descrierea locuinței..." rows={5} required onChange={handleInputChange} name="description"/>
                        </Form.Group>    
                        <input type="file" className="form-control" id="photos"
                        onChange={handleInputChange} required name="photos" multiple accept="image/png, image/jpeg"/>
                        <Button type="submit" style={{marginTop:"20px"}} className="btn btn=success">
                            Adaugă
                        </Button>
                    </Form>
                </Container>
                )
            }
        </div>
    );
};

export default AddHouse;