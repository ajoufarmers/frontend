import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import GreenButton from '../common/GreenButton';

const Step1 = ({ arr, nextSteps }) => {
    // 종류 : 버섯류,허브,열매,잎 및 줄기,뿌리 및 땅속줄기, 새싹류
    const [isChecked, setIsChecked] = useState(false);
    const [checkedValue, setCheckedValue] = useState('');
    const [checkList, setCheckList] = useState([false, false, false, false, false, false]);
    const TYPE = [
        { id: 0, name: 'plant', value: '버섯류' },
        { id: 1, name: 'plant', value: '허브' },
        { id: 2, name: 'plant', value: '열매' },
        { id: 3, name: 'plant', value: '잎 및 줄기' },
        { id: 4, name: 'plant', value: '뿌리 및 땅속줄기' },
        { id: 5, name: 'plant', value: '새싹류' },
    ];

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
        arr[0] = id.target.defaultValue;
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
                {'1. 종류'}
            </div>
            <div className='answer_box'>
            {/* <form>
                {
                    TYPE.map((element) => {
                        return (
                            <>
                            <input
                                type="checkbox"
                                style={{marginBottom:'0.8rem'}}
                                onChange={(e) => checkOnlyOne(e)}
                            />
                            <label htmlFor={element.id}>{element.value}</label>
                            </>
                        )
                    })
                }
            </form> */}
            <input
                type="checkbox"
                id="0"
                name="plant"
                value="버섯류"
                onChange={(e) => checkOnlyOne(e)}
                // defaultChecked={checkList[0]}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>버섯류</label> <br />
            <input
                type="checkbox"
                id="1"
                name="plant"
                value="허브"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>허브</label> <br />
            <input
                type="checkbox"
                id="2"
                name="plant"
                value="열매"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>열매</label> <br />
            <input
                type="checkbox"
                id="3"
                name="plant"
                value="잎 및 줄기"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>잎 및 줄기</label> <br />
            <input
                type="checkbox"
                id="4"
                name="plant"
                value="뿌리 및 땅속줄기"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>뿌리 및 땅속줄기</label> <br />
            <input
                type="checkbox"
                id="5"
                name="plant"
                value="새싹류"
                onChange={(e) => checkOnlyOne(e)}
                style={{marginBottom:'0.8rem'}}
            />
            <label htmlFor='0'>새싹류</label> <br />
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