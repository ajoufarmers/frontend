import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';

const Step1 = ({ checkList, arr, nextSteps }) => {
    // 종류 : 버섯류,허브,열매,잎 및 줄기,뿌리 및 땅속줄기, 새싹류
    const [isChecked, setIsChecked] = useState(false);
    const [checkedValue, setCheckedValue] = useState('');

    function checkOnlyOne(id) { //checkbox 하나만 선택
        console.log('id', id);
        let checkPick = document.getElementsByName('plant');
        Array.prototype.forEach.call(checkPick, function(element) {
            // console.log('el', element);
            element.checked = false;
        });
        id.target.checked = true;
        setCheckedValue(id.target.defaultValue);
        setIsChecked(true);
        arr[0] = id.target.id;
        console.log(arr);

        // checkList에서 현재 선택된 옵션만 true로 설정
        for(let i=0; i < checkList.length; i++) {
            if(arr !== 0) { //arr에 값이 있으면
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
        console.log("ischecked", isChecked);
        console.log("arr", arr);
        // 다음페이지로 갔다가 다시 돌아갔다가 다음 버튼 눌렀을 때 선택 안 되어있다는 오류
        // if (checkedValue !== 0) //check된 값이 있으면
        if (arr.length !== 0)
        {
            setIsChecked(true);
        }
    }, [checkedValue]);

    return (
        <>
            <div className='title'>식물 추천 받기</div>
            <div className='question_box'>
                {'1. 종류'}
            </div>
            <div className='answer_box'>
            <input
                type="checkbox"
                id="0"
                name="plant"
                value="버섯류"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[0]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;버섯류</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="허브"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[1]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;허브</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="열매"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[2]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;열매</label> <br />
            <input
                type="checkbox"
                id="3"
                name="plant"
                value="잎 및 줄기"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[3]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;잎 및 줄기</label> <br />
            <input
                type="checkbox"
                id="4"
                name="plant"
                value="뿌리 및 땅속줄기"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[4]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='4'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;뿌리 및 땅속줄기</label> <br />
            <input
                type="checkbox"
                id="5"
                name="plant"
                value="새싹류"
                onChange={(e) => checkOnlyOne(e)}
                defaultChecked={checkList[5]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;새싹류</label> <br />
            </div>
            <div className='buttons'>
                {
                    isChecked === true
                    ?
                        <GreenButton onClick={nextSteps}>다음</GreenButton>
                    : <div>
                        <GreenButton onClick={checkOne}>다음</GreenButton>
                    </div>
                }
            </div>
        </>
    )
};

export default Step1;