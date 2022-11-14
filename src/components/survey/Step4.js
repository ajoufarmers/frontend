import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';
import styled from 'styled-components';

const StyledButton = styled(GreenButton)`
    & + & {
        margin-left: 0.5rem;
    }
`;

const Step4 = ({ prevSteps, nextSteps }) => {
    // 햇빛 : lv0~3
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
                {'4. 햇빛'}
            </div>
            <div className='answer_box'>
            <input
                type="checkbox"
                id="0"
                name="plant"
                value="0"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>햇빛 LV.0</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="1"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>햇빛 LV.1</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="2"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>햇빛 LV.2</label> <br />
            <input
                type="checkbox"
                id="3"
                name="plant"
                value="3"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>햇빛 LV.3</label> <br />
            </div>
            <div className='buttons'>
                <StyledButton onClick={prevSteps}>이전</StyledButton>
                <StyledButton onClick={nextSteps}>다음</StyledButton>
            </div>
        </>
    )
};

export default Step4;