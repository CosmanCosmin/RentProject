import React, {useState} from "react";
import {useNavigate } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import { Button, Form } from "react-bootstrap";
import "../css/home.css";
const Home = () => {
    const navigate = useNavigate();
    const navigateToSearch = () => {
        if (!search.county) {
            alert("Căutarea nu poate sa fie goală");
            return;
        }
        navigate(`/search?county=${search.county}&type=${search.type}&sellType=${search.sellType}`);
    };
    const initialSearchState = {
        county: "",
        type: "house",
        sellType: "rent"
    };

    const [search, setSearch] = useState(initialSearchState);
    const handleInputChange = event => {
        const {name, value} = event.target;
        setSearch({...search, [name]: value});
    };

    return (
        <div className="container h-100">
            <div className="row h-100 forms">
                <InputGroup className="col-6">
                    <Form.Control
                    placeholder="Orașul"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    name="county" onChange={handleInputChange}
                    />
                    <Form.Select onChange={handleInputChange} name="type">
                        <option value="house">Casă</option>
                        <option value="apartment">Apartament</option>
                    </Form.Select>
                    <Form.Select onChange={handleInputChange} name="sellType">
                        <option value="rent">Închiriere</option>
                        <option value="sell">Vânzare</option>
                    </Form.Select>
                    <Button variant="outline-secondary" id="button-addon2" onClick={navigateToSearch}>
                        Caută
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default Home;