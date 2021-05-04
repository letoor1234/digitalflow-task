import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import { useHistory } from "react-router";
import styled from "styled-components";
import Login from "./comps/Login";
import Register from "./comps/Register";

const HeaderStyled = styled.header`
    width: 100%;
    padding: 1em 3em;
    background: linear-gradient(to right, #1e1f21 10%, #67758f 90%);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h1 {
        color: white;
    }
    nav {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
`;

const App = () => {
    return (
        <Router>
            <HeaderStyled>
                <h1>Title</h1>
                <Route path='/' exact>
                    <nav>
                        <h5>Don't have an account yet? </h5>
                        <Link to='/register'>Register</Link>
                    </nav>
                </Route>
                <Route path='/register'>
                    <nav>
                        <h5>Already have an account? </h5>
                        <Link to='/'>Login</Link>
                    </nav>
                </Route>
            </HeaderStyled>
            <Route path='/' exact>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
        </Router>
    );
};

export default App;
