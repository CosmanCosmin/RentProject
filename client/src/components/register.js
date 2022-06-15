import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

const Register = () => {
    const initialUser = {
        username: "",
        password: "",
        confirmPassword: ""
    }
    const navigate = useNavigate();

    const [user, setUser] = useState(initialUser)
    const handleInputChange = event => {
        const {name, value} = event.target;
        setUser({...user, [name]: value});
    };
    const register = async (event) => {
        event.preventDefault();

        if (userService.getCurrentUser()) {
            alert("Ești deja logat.")
            return;
        }
        if (user.password.length < 6) {
            alert("Parola trebuie sa aibă cel puțin 6 caractere.")
            return;
        }
        if (user.password != user.confirmPassword) {
            alert("Parolele nu sunt aceleași.");
            return;
        }
        await userService.register({username:user.username, password:user.password}).then(() => {
            navigate("/");  
            window.location.reload();
        }).catch(err => {
            if (err.code === "ERR_BAD_REQUEST") {
                alert("Acest utilizator deja există.")
            }
            console.log(err)
        })
    }
    return (
        <div className="column h-100 login">
            <Form>
                <Form.Floating className="mb-3" controlId="formBasicUsername">
                    <Form.Control type="username" placeholder="Introduceți numele de utilizator" onChange={handleInputChange} name="username"/>
                    <label htmlFor="floatingInputCustom">Numele de utilizator</label>
                </Form.Floating>
                <Form.Floating className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Introduceți parola" onChange={handleInputChange} name="password" />
                    <label htmlFor="floatingInputCustom">Parola</label>
                </Form.Floating>
                <Form.Floating className="mb-3" controlId="formBasicVerifyPassword">
                    <Form.Control type="password" placeholder="Reintroduceți parola" onChange={handleInputChange} name="confirmPassword"/>
                    <label htmlFor="floatingInputCustom">Reintroduceți parola</label>
                </Form.Floating>
                <Button variant="primary" type="submit" onClick={register}>
                    Trimite
                </Button>
            </Form>
        </div>
    );
}

export default Register;