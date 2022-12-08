import './Dictionary.css';
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenButton from '../common/GreenButton';
import TransparentButton from '../common/TransparentButton';

const Dictonary = () => {
    const [plantList, setPlantList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('/plant/list', { withCredentials: true })
        .then((response) => {
            console.log(response);
            setPlantList(response.data);
            console.log(plantList[0].name);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }, []);

    const goDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    function viewPlantList () {
        const items = plantList.map((element) =>
            <>
                <div className='preview_box'>
                    <div className='preview' onClick={()=>goDetail(element.id)}>
                        <div className='preview_image' key={element.imgUri}>
                            <img className='img' src={element.imgUri} alt='img' />
                        </div>
                        <div className='preview_name' key={element.name}>{element.name}</div>
                    </div>
                </div>
            </>
        );
        return (
            <div>{items}</div>
        )
    }

    const searchButtonClick = () => {
        navigate('/search');
    }

    const homeButtonClick = () => {
        navigate('/main');
    }

    return (
        <>
            <div className="title">식물 도감</div>
            <div className="search_button">
                <GreenButton onClick={searchButtonClick} style={{height: '2.5rem'}}>식물 검색</GreenButton>
                <TransparentButton onClick={homeButtonClick}>메인으로</TransparentButton>
            </div>
            <div className="preview_box">
                {viewPlantList()}
            </div>
        </>
    )
};

export default Dictonary;