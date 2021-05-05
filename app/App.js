import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Login from "./comps/Login";
import Register from "./comps/Register";
import Home from "./comps/Home";

const HeaderStyled = styled.header`
    width: 100%;
    padding: 1em 3em;
    background: #67758f;
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
    let token = useSelector((state) => state.auth.token);
    let history = useHistory();

    useEffect(() => {
        if (token !== "") {
            history.push("/home");
        } else {
            history.push("/");
        }
    }, [token]);

    return (
        <>
            <HeaderStyled>
                <h1>Title</h1>
                <Route path='/home'>
                    <nav>
                        <button>Logout</button>
                    </nav>
                </Route>
            </HeaderStyled>
            <Route path='/' exact>
                <Login />
            </Route>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/home'>
                <Home />
            </Route>
        </>
    );
};

export default App;
