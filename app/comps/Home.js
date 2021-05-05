import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import successAuth from "../redux/actions/getAuth";

const UserCard = styled.div`
    float: center;
    min-width: 45%;
    margin: 0.5em;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ccc5f0;
    border-radius: 4px;
    h3 {
        font-size: 95%;
        margin-bottom: 0.3em;
    }
    h4 {
        color: #3d3d3d;
        font-size: 90%;
        margin-bottom: 1.2em;
    }
`;

const Home = () => {
    const [userData, setUserData] = useState({});
    let token = useSelector((state) => state.auth.token);
    let dispatch = useDispatch();

    useEffect(() => {
        let uri = "/api/get-user";
        const data = {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "access-token": token,
            },
            method: "GET",
            credentials: "include",
        };
        fetch(uri, data)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                if (json.alert) {
                    dispatch(successAuth(""));
                } else {
                    setUserData({
                        ...json,
                    });
                }
            });
    }, []);

    return (
        <UserCard>
            <h3>User Name</h3>
            <h4> {userData.username} </h4>
            <h3>Email</h3>
            <h4> {userData.email} </h4>
            <h3>Name</h3>
            <h4> {userData.name} </h4>
            <h3>Mobile</h3>
            <h4> {userData.mobile} </h4>
            <h3>Address</h3>
            <h4> {userData.address} </h4>
            <h3>Hashed Password</h3>
            <h4> {userData.password} </h4>
        </UserCard>
    );
};

export default Home;
