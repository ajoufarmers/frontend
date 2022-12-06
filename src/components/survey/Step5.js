import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Step.css';
import GreenButton from '../common/GreenButton';
import NavyButton from '../common/NavyButton';
import TransparentButton from '../common/TransparentButton';
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
    const [rec, setRec] = useState(0);
    const [recList, setRecList] = useState([]);
    // const [otherList, setOtherList] = useState([]);
    let otherList = [];
    const [plantId, setPlantId] = useState();
    const navigate = useNavigate();

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
        arr[4] = Number(id.target.id);
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

    const data = {
        category: arr[0],
        size: arr[1],
        difficulty: arr[2],
        brightness: arr[3],
        waterRate: arr[4],
    };

    function checkOne () {
        return (
            <div>
                {
                    isChecked === false
                    ? alert("선택지를 골라주세요!")
                    :
                    axios
                    .get('/recommend/list', { params: data }, { withCredentials: true })
                    // .get('/recommend/list', { params: {category: arr[0], size: arr[1], difficulty: arr[3], brightness: arr[4], waterRate: arr[5] }}, { withCredentials: true })
                    // .get('/recommend/list', {category: arr[0], size: arr[1], difficulty: arr[3], brightness: arr[4], waterRate: arr[5] }, { withCredentials: true })
                    .then((response) => {
                        console.log(response);
                        setRec(1);
                        setRecList(response.data);
                        setPlantId(response.data[0].id);
                        console.log(response.data[0].id);
                    })
                    .catch((error) => {
                        console.log(error.response);
                    })
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

    const backButtonClick = () => {
        setRec(0);
    }

    function viewSurvey () {
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
                    <div>
                        <StyledButton onClick={prevSteps}>이전</StyledButton>
                        <StyledButton onClick={checkOne}>완료</StyledButton>
                    </div>
                </div>
            
            </>
        )
    }

    const [otherplants, setOtherplants] = useState(false);

    function otherButtonClick() {
        setOtherplants(true);
        // for(var i=recList.length-1; i>0; i--) {
        //     otherList.push({
        //         id: recList[i].id,
        //         imgUri: recList[i].imgUri,
        //         name: recList[i].name,
        //     })
        // }
        console.log(otherList);
    }

    const goDetail = (id) => {
        navigate(`/detail/${id}`);
    }

    function viewOthers () {
        for(var i=recList.length-1; i>0; i--) {
            otherList.push({
                id: recList[i].id,
                imgUri: recList[i].imgUri,
                name: recList[i].name,
            })
        }
        const items = otherList.map((element) =>
            <>
            <div className='others'>
                <img className='others_image' src={(element).imgUri} alt='herb' style={{width: '150px;', height: '150px'}} onClick={()=>goDetail(element.id)} />
                <div className='others_info'>{(element).name}</div>
            </div>
            </>
        )
        console.log(otherList);
        return (
            <>
            <div>{items}</div>
            </>
        )
    }

    function viewResult () {
        return (
            <>
                <div className='title'>식물 추천 결과</div>
                <div className='recommend_box'>
                    <img className='plant_image' src={recList[0].imgUri} alt='herb' style={{width: '350px', height: '350px'}} onClick={()=>goDetail(plantId)}/>
                    <div className='plant_info'>{recList[0].name}</div>
                    <div className='buttons'>
                        <NavyButton onClick={otherButtonClick}>다른 추천 식물</NavyButton>
                        <TransparentButton onClick={backButtonClick}>이전으로</TransparentButton>
                    </div>
                </div>
                <div className='others_box'>
                    {
                        otherplants === true
                        ? <div className='others'>{viewOthers()}</div>
                        // <>
                        //     <div className='others'>
                        //         <img className='others_image' src='/assets/herb.jpg' alt='herb' />
                        //         <div className='others_info'>허브</div>
                        //     </div>
                        //     <div className='others'>
                        //         <img className='others_image' src='/assets/herb.jpg' alt='herb' />
                        //         <div className='others_info'>허브</div>
                        //     </div>
                        //     <div className='others'>
                        //         <img className='others_image' src='/assets/herb.jpg' alt='herb' />
                        //         <div className='others_info'>허브</div>
                        //     </div>
                        // </>
                        : null
                    }
                </div>
            </>
        )
    }

    /* return (
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
                <div>
                    <StyledButton onClick={prevSteps}>이전</StyledButton>
                    <StyledButton onClick={checkOne}>완료</StyledButton>
                </div>
                <div>
                    <StyledButton onClick={prevSteps}>이전</StyledButton>
                    <Link to={{
                        pathname: '/recommend',
                        state: arr[4],
                    }}>
                        <StyledButton onClick={checkOne}>완료</StyledButton>
                    </Link>
                </div>
            </div>
        
        </>
    ) */
    return (
        <>
        {rec === 0 && viewSurvey()}
        {rec === 1 && viewResult()}
        </>
    )
};

export default Step5;