import client from "./client";
import axios from 'axios';
import { useEffect, useState } from 'react';

export const login = async() => {
    window.location.href = 'http://localhost:5000/auth/google';
}

export const check = async() => {
    await axios
    .get("/checklogin", { withCredentials:true })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response);
    });
};

export const logout = async() => {
    await axios
    .get("/logout", { withCredentials:true })
    .then((response) => {
        console.log(response);
        window.location.href = 'http://localhost:3000';
    })
    .catch((error) => console.log(error.response));
};