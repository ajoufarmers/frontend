import './Dictionary.css';
import styled from 'styled-components';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GreenButton from '../common/GreenButton';
import AskModal from '../common/AskModal.js';
import lemon from '../../images/lemontree.jpg';

const TextArea = styled.textarea`
    width: 70%;
    height: 2rem;
    resize: none;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
`;

const Dictonary = () => {
    const [plantList, setPlantList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then((response) => {
            axios
            .get('http://localhost:8080', { withCredentials: true })
            .then((response) => {
                setPlantList(response.data);
            })
            .catch((error) => {
                console.log(error.response);
            })
        })
    }, []);

    const goDetail = (id) => {
        navigate(`/detail:${id}`);
    }

    function viewPlantList () {
        const items = plantList.map((element) => {
            <>
                <div className='preview_box'>
                    <div className='preview' onClick={()=>goDetail(element.id)}>
                        <div className='preview_image' key={element.img}>
                            {/* <img src={img} alt='img' /> */}
                        </div>
                        <div className='preview_name' key={element.name}>{element.name}</div>
                    </div>
                </div>
            </>
        });
        return (
            <div>{items}</div>
        )
    }

    const searchButtonClick = () => {
        navigate('/search');
    }

    return (
        <>
            <div className="title">식물 도감</div>
            {/* <div className="preview_box">
                {viewPlantList()}
            </div> */}
            <div className="search_button">
                <GreenButton onClick={searchButtonClick}>식물 검색</GreenButton>
            </div>
            <div className='preview_box'>
            <div className='preview' onClick={goDetail}>
                <img className='preview_image' src={lemon} alt='lemon' />
                <div className='preview_name'>
                    콩나물
                </div>
            </div>
            <div className='preview'>
                <img className='preview_image' src={lemon} alt='lemon' />
                <div className='preview_name'>
                    콩나물
                </div>
            </div>
            <div className='preview'>
                <img className='preview_image' src={lemon} alt='lemon' />
                <div className='preview_name'>
                    콩나물
                </div>
            </div>
            <div className='preview'>
                <img className='preview_image' src={lemon} alt='lemon' />
                <div className='preview_name'>
                    콩나물
                </div>
            </div>
            <div className='preview'>
                <img className='preview_image' src={lemon} alt='lemon' />
                <div className='preview_name'>
                    콩나물
                </div>
            </div>
            <div className='preview'>
                <img className='preview_image' src={lemon} alt='lemon' />
                <div className='preview_name'>
                    콩나물
                </div>
            </div>
            <div className='preview'>
                <img className='preview_image' src={lemon} alt='lemon' />
                <div className='preview_name'>
                    콩나물
                </div>
            </div>
            </div>

        </>
    )
};

export default Dictonary;