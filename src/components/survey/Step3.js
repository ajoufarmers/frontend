import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';
import styled from 'styled-components';

const StyledButton = styled(GreenButton)`
    & + & {
        margin-left: 0.5rem;
    }
`;

const Step3 = ({ arr, prevSteps, nextSteps }) => {
    // 난이도 : 상,중,하
    const [checkedValue, setCheckedValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    function checkOnlyOne(id) {
        console.log('id', id);
        let checkPick = document.getElementsByName('plant');
        Array.prototype.forEach.call(checkPick, function(element) {
            // console.log('el', element);
            element.checked = false;
        });
        id.target.checked = true;
        setCheckedValue(id.target.defaultValue);
        setIsChecked(true);
        arr[2] = id.target.defaultValue;
        console.log(arr);
    }

    function checkOne() {
        return (
            <div>
                {
                    isChecked === false
                    ? alert("선택지를 골라주세요!")
                    : null
                }
            </div>
        )
    }

    useEffect(() => {
        console.log("checkbox value", checkedValue);
    }, [checkedValue]);

    return (
        <>
            <div className='title'>식물 추천 받기</div>
            <div className='question_box'>
                {'3. 난이도'}
            </div>
            <div className='answer_box'>
            <input
                type="checkbox"
                id="0"
                name="plant"
                value="상"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>상</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="중"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>중</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="하"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>하</label> <br />
            </div>
            <div className='buttons'>
                {
                    isChecked === true
                    ?
                        <div>
                        <StyledButton onClick={prevSteps}>이전</StyledButton>
                        <StyledButton onClick={nextSteps}>다음</StyledButton>
                        </div>
                    : <div>
                        <StyledButton onClick={prevSteps}>이전</StyledButton>
                        <StyledButton onClick={checkOne}>다음</StyledButton>
                    </div>
                }
            </div>
        </>
    )
};

export default Step3;