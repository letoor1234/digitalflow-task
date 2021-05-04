import React, { useState } from "react";
import styled from "styled-components";

const RegisterFormStyled = styled.form`
    float: right;
    width: 45%;
    margin: 2em;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #abd1b8;
    border-radius: 4px;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <RegisterFormStyled>
            <div>
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
            </div>
        </RegisterFormStyled>
    );
};

export default Register;
