import React, { useState, useEffect, useRef } from 'react';
import './Step.css';
import NavyButton from '../common/NavyButton';
import TransparentButton from '../common/TransparentButton';
import styled from 'styled-components';

const Recommend = ({ prevSteps }) => {
    const [otherplants, setOtherplants] = useState(false);

    function otherButtonClick() {
        setOtherplants(true);
    }

    return (
        <>
            <div className='title'>식물 추천 결과</div>
            <div className='recommend_box'>
                <img className='plant_image' src='/assets/herb.jpg' alt='herb' />
                <div className='plant_info'>콩나물</div>
                <div className='buttons'>
                    <NavyButton onClick={otherButtonClick}>다른 추천 식물</NavyButton>
                    <TransparentButton onClick={prevSteps}>이전으로</TransparentButton>
                </div>
            </div>
            <div className='others_box'>
                {
                    otherplants === true
                    ?
                    <>
                        <div className='others'>
                            <img className='others_image' src='/assets/herb.jpg' alt='herb' />
                            <div className='others_info'>허브</div>
                        </div>
                        <div className='others'>
                            <img className='others_image' src='/assets/herb.jpg' alt='herb' />
                            <div className='others_info'>허브</div>
                        </div>
                        <div className='others'>
                            <img className='others_image' src='/assets/herb.jpg' alt='herb' />
                            <div className='others_info'>허브</div>
                        </div>
                    </>
                    : null
                }
            </div>
        </>
    )
}

export default Recommend;