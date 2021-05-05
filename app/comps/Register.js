import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import successAuth from "../redux/actions/getAuth";
import validator from "validator";
import styled from "styled-components";

const RegisterFormStyled = styled.form`
    float: right;
    min-width: 45%;
    margin: 0.5em;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #abd1b8;
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
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let dispatch = useDispatch();
    let history = useHistory();

    const toLogin = () => {
        history.push("/");
    };

    const sendRegister = (e) => {
        e.preventDefault();
        if (username === "" || name === "" || address === "") {
            alert("Please, complete all the fields");
        } else {
            if (!validator.isEmail(email)) {
                alert("The email is not valide, try with other");
            } else {
                if (!validator.isMobilePhone(mobile)) {
                    alert(
                        "The mobile is invalid, please confirm your phone number"
                    );
                } else {
                    if (
                        !validator.isStrongPassword(password, {
                            minLength: 8,
                            minNumbers: 1,
                            minSymbols: 1,
                            minLowercase: 1,
                            minUppercase: 1,
                            returnScore: false,
                        })
                    ) {
                        alert(
                            "The password must have min 8 characters, with at least an uppercase and a lowercase alphabetic, a number and a non alphabetic character (! , - . @ #)"
                        );
                    } else {
                        if (confirmPassword !== password) {
                            alert(
                                "The passwords are different, please confirm your password"
                            );
                        } else {
                            postRegister();
                        }
                    }
                }
            }
        }
    };
    const postRegister = () => {
        const uri = "/api/register";
        const data = {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                username: username,
                email: email,
                name: name,
                password: password,
                address: address,
                mobile: mobile,
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
        <RegisterFormStyled onSubmit={(e) => sendRegister(e)}>
            <label htmlFor='username'>Username</label>
            <input
                type='text'
                id='username'
                className='username-input'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='email'>Email</label>
            <input
                type='text'
                id='email'
                className='email-input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='name'>Name</label>
            <input
                type='text'
                id='name'
                className='name-input'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor='address'>Address</label>
            <input
                type='text'
                id='address'
                className='address-input'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <label htmlFor='mobile'>Mobile Number</label>
            <input
                type='text'
                id='mobile'
                className='mobile-input'
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
            />

            <label htmlFor='password'>Password</label>
            <input
                type='password'
                id='password'
                className='password-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
                type='password'
                id='confirmPassword'
                className='confirm-password-input'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input className='submit-button' type='submit' value='Register' />
            <button onClick={toLogin}>Already have an account? Login!</button>
        </RegisterFormStyled>
    );
};

export default Register;
