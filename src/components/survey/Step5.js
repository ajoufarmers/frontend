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

const Step5 = ({ arr, prevSteps, nextSteps }) => {
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
        arr[4] = id.target.defaultValue;
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
                {'5. 물 주는 빈도'}
            </div>
            <div className='answer_box'>
            <input
                type="checkbox"
                id="0"
                name="plant"
                value="낮음"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>{'낮음(열흘에 한 번)'}</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="보통"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>{'보통(주 1회)'}</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="자주"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>{'자주(주 2회 이상'}</label> <br />
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