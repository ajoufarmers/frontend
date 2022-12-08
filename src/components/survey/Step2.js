import React, { useState, useEffect } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';
import TransparentButton from '../common/TransparentButton';
import styled from 'styled-components';

const StyledButton = styled(GreenButton)`
    & + & {
        margin-left: 0.5rem;
    }
`;

const Step2 = ({ checkList, arr, prevSteps, nextSteps, home }) => {
    // 사이즈 : 작은 식물, 중간 크기의 식물, 큰 식물
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
        arr[1] = Number(id.target.id);
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
        console.log("list", checkList);
        if (arr.length !== 1)
        {
            setIsChecked(true);
        }
    }, [checkedValue]);

    return (
        <>
            <div className='title'>식물 추천 받기</div>
            <TransparentButton onClick={home} style={{float: 'right', marginRight: '5rem'}}>메인으로</TransparentButton>
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
                defaultChecked={checkList[0]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;작은 식물</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="중간 크기의 식물"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[1]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;중간 크기의 식물</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="큰 식물"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[2]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;큰 식물</label> <br />
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

export default Step2;