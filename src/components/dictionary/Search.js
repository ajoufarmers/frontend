import './Search.css';
import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GreenButton from '../common/GreenButton';
import TransparentButton from '../common/TransparentButton';

const TextArea = styled.textarea`
    width: 50%;
    height: 2rem;
    resize: none;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
`;

const Search = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [searchList, setSearchList] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState('');

    const handleinputChange = (e) => {
        setSearchValue(e.target.value);
    }

    const searchButtonClick = async() => {
        await axios
        .get(`/plant/name?name=${searchValue}`, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setId(response.data.id);
            setName(response.data.name);
            setImg(response.data.imgUri);
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해 주세요");
        })
    }

    const backButtonClick = () => {
        navigate(-1);
    }

    const goDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    function viewSearchList () {
        const items = searchList.map((element) =>
            <>
                <div className='preview_box'>
                    <div className='preview' onClick={()=>goDetail(element.id)}>
                        <div className='preview_image' key={element.imgUri}>{element.imgUri}</div>
                        <div className='preview_name' key={element.name}>{element.name}</div>
                    </div>
                </div>
            </>
        );

        return (
            <div>{items}</div>
        )
    }

    return (
        <>
            <div className='title'>식물 검색</div>
            <div className='search_box'>
                <TextArea onChange={handleinputChange} placeholder='검색 내용을 입력해주세요' />
                <GreenButton onClick={searchButtonClick} style={{marginLeft:'1rem'}}>검색</GreenButton>
                <TransparentButton onClick={backButtonClick}>돌아가기</TransparentButton>
            </div>
            <div className='search_result'>
                {
                    id ? 
                    <div className='search_result'>
                        <div className='preview' onClick={()=>goDetail(id)}>
                            <img className='preview_image' src={img} alt='img'></img>
                            <div className='preview_name'>{name}</div>
                        </div>
                    </div> : null
                }
            </div>
        </>
    )
};

export default Search;