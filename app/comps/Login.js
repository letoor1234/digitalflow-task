import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import successAuth from "../redux/actions/getAuth";
const LoginFormStyled = styled.form`
    float: left;
    min-width: 45%;
    margin: 0.5em;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #bcc3d1;
    border-radius: 4px;
    label {
        font-size: 90%;
    }
    input {
        padding: 0.4em 0.6em;
    }
    .submit-button {
    }
    button {
        border: none;
        background: none;
        color: blue;
        text-decoration: underline;
    }
    label,
    input {
        margin-bottom: 0.3em;
    }
`;
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let history = useHistory();
    let dispatch = useDispatch();

    const toRegister = () => {
        history.push("/register");
    };

    const sendLogin = (e) => {
        e.preventDefault();
        const uri = "/api/login";
        const data = {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        };
        fetch(uri, data)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.alert) {
                    alert(json.alert);
                } else {
                    //save the token into redux
                    dispatch(successAuth(json));
                }
            });
    };
    return (
        <LoginFormStyled onSubmit={(e) => sendLogin(e)}>
            <label htmlFor='username'>Username / Email</label>
            <input
                type='text'
                id='username'
                className='username-input'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                id='password'
                className='password-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input className='submit-button' type='submit' value='Login' />
            <button onClick={toRegister}>Not account yet? Register!</button>
        </LoginFormStyled>
    );
};

export default Login;
