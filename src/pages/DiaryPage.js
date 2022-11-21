import Header from "../components/common/Header";
import Calendar from "../components/diary/Calendar";
import React, { useState } from 'react';
import axios from 'axios';

const DiaryPage = () => {
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
            <Calendar />
        </>
    )
};

export default DiaryPage;