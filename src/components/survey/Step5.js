import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';
import styled from 'styled-components';
import axios from 'axios';
import * as recommendAPI from '../../lib/api/recommend';

const StyledButton = styled(GreenButton)`
    & + & {
        margin-left: 0.5rem;
    }
`;

// const submitContent = async() => {
//     await axios
//     .get('/checklogin', { withCredentials: true })
//     .then(response => {
//         provider_Id.current = response.data[0].providerId;

//         axios
//         .post(`http://3.39.17.18/diaries/${provider_Id.current}`, { content: diaryContent.content }, { withCredentials: true })
//         .then((response) => {
//             console.log(response);
//             alert('등록 완료');
//             console.log(diaryContent.content);
//             navigate('/main');
//         })
//         .catch((error) => {
//             console.log(error.response);
//         })
//     })
// };

const Step5 = ({ checkList, arr, prevSteps, nextSteps }) => {
    // 물 주는 빈도 : 낮음, 보통, 자주
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
        arr[4] = id.target.id;
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
        if (arr.length !== 4)
        {
            setIsChecked(true);
        }
    }, [checkedValue]);

    return (
        <>
            <div className='title'>식물 추천 받기</div>
            <div className='question_box'>
                {'5. 물 주는 빈도'}
            </div>
            <div className='answer_box'>
            <input
                type="checkbox"
                id="0"
                name="plant"
                value="낮음"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[0]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'낮음(열흘에 한 번)'}</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="보통"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[1]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'보통(주 1회)'}</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="자주"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[2]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'자주(주 2회 이상'}</label> <br />
            </div>
            <div className='buttons'>
                {
                    isChecked === true
                    ?
                        <div>
                        <StyledButton onClick={prevSteps}>이전</StyledButton>
                        <StyledButton onClick={nextSteps}>완료</StyledButton>
                        </div>
                    : <div>
                        <StyledButton onClick={prevSteps}>이전</StyledButton>
                        <StyledButton onClick={checkOne}>완료</StyledButton>
                    </div>
                }
            </div>
        </>
    )
};

export default Step5;