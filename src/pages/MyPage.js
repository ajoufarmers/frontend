import Header from "../components/common/Header";
import PlantList from "../components/mypage/PlantList";
import React, { useState } from 'react';
import axios from 'axios';

const MyPage = () => {
    const [pid, setPid] = useState("");

    async function GetId () {
        const data = await axios.get("/checklogin");
        setPid(data.data[0].providerId);
    };
    GetId();
    console.log(pid);

    return (
        <>
            <Header />
            <PlantList />
        </>
    )
};

export default MyPage;