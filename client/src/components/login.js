import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

const Login = () => {
    const initialUser = {
        username: "",
        password: ""
    }

    const navigate = useNavigate();

    const [user, setUser] = useState(initialUser)
    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };
    const login = async (event) => {
        event.preventDefault();
        
        if (userService.getCurrentUser()) {
            alert("Ești deja logat.")
            return;
        }

        await userService.login({username:user.username, password:user.password}).then(() => {
            navigate("/");
            window.location.reload();
        })
        .catch(err => {
            if (err.response.data === "Invalid credentials.") alert("Nu există vreun utilizator cu aceste date.")
            console.log(err)
        })
    }
    return (
        <div className="column h-100 login">
            <Form>
                <Form.Floating className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="username" placeholder="Introduceți numele de utilizator"  onChange={handleInputChange} name="username"/>
                    <label htmlFor="floatingInputCustom">Numele de utilizator</label>
                </Form.Floating>
                <Form.Floating className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Introduceți parola" onChange={handleInputChange} name="password" />
                    <label htmlFor="floatingInputCustom">Parola</label>
                </Form.Floating>
                <Button variant="primary" type="submit" onClick={login}>
                    Trimite
                </Button>
            </Form>
        </div>
    );
}

export default Login;