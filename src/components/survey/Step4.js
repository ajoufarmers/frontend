import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';
import styled from 'styled-components';

const StyledButton = styled(GreenButton)`
    & + & {
        margin-left: 0.5rem;
    }
`;

const Step4 = ({ checkList, arr, prevSteps, nextSteps }) => {
    // 햇빛 : lv0~3
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
        arr[3] = Number(id.target.id);
        console.log(arr);

        console.log(id.target.id);
        checkList[id.target.id] = true;

        for(let i=0; i < checkList.length; i++) {
            if(arr !== 0) {
                checkList[i] = false;
            }
            checkList[id.target.id] = true;
        }
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
        if (arr.length !== 3)
        {
            setIsChecked(true);
        }
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
                defaultChecked={checkList[0]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;햇빛 LV.0</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="1"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[1]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;햇빛 LV.1</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="2"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[2]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;햇빛 LV.2</label> <br />
            <input
                type="checkbox"
                id="3"
                name="plant"
                value="3"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[3]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;햇빛 LV.3</label> <br />
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

export default Step4;