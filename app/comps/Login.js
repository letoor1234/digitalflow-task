import React, { useState } from "react";
import styled from "styled-components";

const LoginFormStyled = styled.form`
    float: left;
    width: 45%;
    margin: 2em;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #bcc3d1;
    border-radius: 4px;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`;
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <LoginFormStyled>
            <div>
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
            </div>
        </LoginFormStyled>
    );
};

export default Login;
