import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TransparentButton from '../common/TransparentButton';
import './Detail.css';

const Detail = () => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [imgUri, setImgUri] = useState('');
    const [des, setDes] = useState('');
    const [temp, setTemp] = useState('');
    const [hum, setHum] = useState('');
    const [water, setWater] = useState('');
    const [nutrition, setNutrition] = useState('');
    const [harvest, setHarvest] = useState('');
    const [mange, setMange] = useState('');
    const location = useLocation();
    let path = location.pathname;
    let plantId = path.substring(8);
    const navigate = useNavigate();

    useEffect(() => {
        // axios
        // .get('/checklogin', { withCredentials: true })
        // .then(response => {
            // provider_Id.current = response.data[0].providerId;
            console.log(plantId);
            axios
            .get(`/plant/id?id=${plantId}`, { withCredentials: true })
            .then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setImgUri(response.data.imgUri);
                setDes(response.data.description);
                setTemp(response.data.temperature);
                setHum(response.data.humidity);
                setWater(response.data.waterInfo);
                setNutrition(response.data.nutrition);
                setHarvest(response.data.harvestTime);
                setMange(response.data.mangeInfo);
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response);
            })
            // })
    }, [id])

    const onClick = () => {
        navigate('/dictionary');
    }


    return (
        <>
            <div className="title">
                식물 세부 정보
            </div>
            <div className='prevbutton'>
                <TransparentButton onClick={onClick} style={{float: 'right', marginRight: '6rem'}}>도감으로</TransparentButton>
            </div>
            <div className="detail_box">
                <div className="image_box">
                    <img className='image' src={imgUri} alt="lemon" />
                    <div>{name}</div>
                </div>
                <div className="detail">
                    {'소개 :'}&nbsp;{des}<br /><br />
                    {'온도 :'}&nbsp;{temp}<br /><br />
                    {'습도 :'}&nbsp;{hum}<br /><br />
                    {'물 :'}&nbsp;{water}<br /><br />
                    {'영양성분 :'}&nbsp;{nutrition}<br /><br />
                    {'수확시기 :'}&nbsp;{harvest}<br /><br />
                    {'관리 방법 :'}&nbsp;{mange}<br />
                </div>
            </div>
        </>
    )
};

export default Detail;