import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';
import lemon from '../../images/lemontree.jpg';

const Detail = () => {
    return (
        <>
            <div className="title">
                식물 세부 정보
            </div>
            <div className="detail_box">
                <div className="image_box">
                    <img className='image' src={lemon} alt="lemon" />
                    <div>콩나물</div>
                </div>
                <div className="detail">
                    {'소개 :'}&nbsp;{'콩나물은 콩이에요'}<br />
                    {'키우기 난이도 :'}&nbsp;{'하'}<br />
                </div>
            </div>
        </>
    )
};

export default Detail;