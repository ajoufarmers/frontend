import './WriteDiary.css';
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import * as diaryAPI from '../../lib/api/diary';
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import NavyButton from "../common/NavyButton";

const TextArea = styled.textarea`
    width: 80%;
    height: 10rem;
    resize: none;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
`;

const WriteDiary = () => {
    const [memberId, setMemberId] = useState(1);
    const [isChecked, setIsChecked] = useState(false);
    const [checkedValue, setCheckedValue] = useState();
    const [content, setContent] = useState('');
    //const today = new Date().toISOString().substring(0, 10);
    const date = new Date();
    const [today, setToday] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // today.current = new Date().toISOString().substring(0, 10);
        let offset = date.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
        let dateOffset = new Date(date.getTime() - offset);
        setToday(dateOffset.toISOString().substring(0, 10));
        console.log(today);
    }, [today])

    function checkOnlyOne(id) { //checkbox 하나만 선택
        console.log('id', id);
        let checkPick = document.getElementsByName('state');
        Array.prototype.forEach.call(checkPick, function(element) {
            // console.log('el', element);
            element.checked = false;
        });
        id.target.checked = true;
        setCheckedValue(Number(id.target.id));
        setIsChecked(true);
        console.log(today);
    }

    const onSubmit = () => {
        let a = 0;
        if (isChecked === false && content === '') {
            a = 1;
            console.log('체크안됨 내용작성안됨');
        }
        if (isChecked === true && content === '') {
            a = 2;
            console.log('체크됨 내용작성안됨');
        }
        if (isChecked === false && content !== '') {
            a = 3;
            console.log('체크안됨 내용작성됨');
        }
        if (isChecked === true && content !== '') {
            a = 4;
            console.log('체크됨 내용작성됨');
        }

        return (
            <div>
                {a === 1 ? alert("선택지를 골라주세요") : null}
                {a === 2 ? alert("일기 내용을 작성해주세요") : null}
                {a === 3 ? alert("선택지를 골라주세요") : null}
                {
                    a === 4
                    ? ( axios
                        .post('/diary', { memberId: memberId, date: today, state: checkedValue, content: content }, { withCredentials: true })
                        .then((response) => {
                            console.log(response);
                            alert('일기 등록 완료');
                            navigate('/diary');
                        })
                        .catch((error) => {
                            console.log(error.response);
                            console.log(today);
                            console.log(checkedValue);
                            console.log(content);
                        }) )
                    : null
                }
            </div>
        )
    }
    
    const handleTextarea = (e) => {
        setContent(e.target.value);
    }

    const onCancel = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="title">일기 작성</div>
            <div className="options">
                <input
                    type="checkbox"
                    id="0"
                    name="state"
                    value="매우 나쁨"
                    onChange={(e) => checkOnlyOne(e)}
                />
                <label className='option' htmlFor='0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src='/assets/state1.png' alt='state1' />
                    <div className='option_text'>매우 나쁨</div>
                </label>
                <input
                    type="checkbox"
                    id="1"
                    name="state"
                    value="나쁨"
                    onChange={(e) => checkOnlyOne(e)}
                />
                <label className='option' htmlFor='1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src='/assets/state2.png' alt='state2' />
                    <div className='option_text'>나쁨</div>
                </label>
                <input
                    type="checkbox"
                    id="2"
                    name="state"
                    value="보통"
                    onChange={(e) => checkOnlyOne(e)}
                />
                <label className='option' htmlFor='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src='/assets/state3.png' alt='state3' />
                    <div className='option_text'>보통</div>
                </label>
                <input
                    type="checkbox"
                    id="3"
                    name="state"
                    value="좋음"
                    onChange={(e) => checkOnlyOne(e)}
                />
                <label className='option' htmlFor='3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src='/assets/state4.png' alt='state4' />
                    <div className='option_text'>좋음</div>
                </label>
                <input
                    type="checkbox"
                    id="4"
                    name="state"
                    value="매우 좋음"
                    onChange={(e) => checkOnlyOne(e)}
                />
                <label className='option' htmlFor='4'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <img src='/assets/state5.png' alt='state5' />
                    <div className='option_text'>매우 좋음</div>
                </label>
            </div>
            <div className='content'>
                <TextArea onChange={handleTextarea} placeholder='일기 내용을 입력하세요' />
            </div>
            <div className='post_buttons'>
                <NavyButton className='button' onClick={onSubmit}>일기 등록</NavyButton>
                <NavyButton className='button' onClick={onCancel}>취소</NavyButton>
            </div>
        </>
    );
};

export default WriteDiary;