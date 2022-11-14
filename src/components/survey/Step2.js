import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';
import styled from 'styled-components';

const StyledButton = styled(GreenButton)`
    & + & {
        margin-left: 0.5rem;
    }
`;

const Step2 = ({ prevSteps, nextSteps }) => {
    // 사이즈 : 작은 식물, 중간 크기의 식물, 큰 식물
    const [checkedValue, setCheckedValue] = useState('');

    function checkOnlyOne(id) {
        console.log('id', id);
        let checkPick = document.getElementsByName('plant');
        Array.prototype.forEach.call(checkPick, function(element) {
            console.log('el', element);
            element.checked = false;
        });
        id.target.checked = true;
        setCheckedValue(id.target.defaultValue);
    }

    useEffect(() => {
        console.log("checkbox value", checkedValue);
    }, [checkedValue]);

    return (
        <>
            <div className='title'>식물 추천 받기</div>
            <div className='question_box'>
                {'2. 사이즈'}
            </div>
            <div className='answer_box'>
            <input
                type="checkbox"
                id="0"
                name="plant"
                value="작은 식물"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>작은 식물</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="중간 크기의 식물"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>중간 크기의 식물</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="큰 식물"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>큰 식물</label> <br />
            </div>
            <div className='buttons'>
                <StyledButton onClick={prevSteps}>이전</StyledButton>
                <StyledButton onClick={nextSteps}>다음</StyledButton>
            </div>
        </>
    )
};

export default Step2;