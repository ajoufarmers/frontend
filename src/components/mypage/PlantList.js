import './PlantList.css';
import styled from 'styled-components';
import herb from '../../images/lemontree.jpg';
import React, { useState } from 'react';
import TransparentButton from '../common/TransparentButton';
import GreenButton from '../common/GreenButton';

const StyledTransparentButton = styled(TransparentButton)`
    font-family: "S-CoreDream-2Light";
    font-size: 0.9rem;
    font-weight: bold;
    float: right;
    padding: 5px 5px 5px 5px;
    & + & {
        margin-left: 0.5rem;
    }
`;

const StyledGreenButton = styled(GreenButton)`
    font-family: "S-CoreDream-2Light";
    font-size: 0.9rem;
    font-weight: bold;  
    & + & {
        margin-left: 0.5rem;
    }
`;

const PlantList = () => {
    // 이미지, 키우기시작한 날짜, 최근 물준날짜, 애칭, 학명, 자세히보기 버튼
    const [date, setDate] = useState('2022-11-12');
    const [waterDate, setWaterDate] = useState('2022-11-12');
    const [nickname, setNickname] = useState('모다피');
    const [name, setName] = useState('콩나물');

    return (
        <>
            <div className='title'>마이페이지</div>
            <div className='preview_box'>
                <div className='preview'>
                    <img className='preview_image' src={herb} alt='herb' />
                    <div className='preview_info'>
                        <div>{date}</div>
                        <div>{waterDate}</div>
                        <div>{nickname} {'('} {name} {')'}</div>
                    </div>
                    <div className='buttons_1'>
                        <StyledTransparentButton>삭제</StyledTransparentButton>
                        <StyledTransparentButton>수정</StyledTransparentButton>
                    </div>
                    <div className='buttons_2'>
                        <div>
                        <StyledGreenButton className='preview_button'>자세히 보기</StyledGreenButton>
                        <StyledGreenButton className='preview_button'>물 주기</StyledGreenButton>
                        </div>
                    </div>
                </div>
                <div className='preview'>
                    <img className='preview_image' src={herb} alt='herb' />
                    <div className='preview_info'>
                        <div>{date}</div>
                        <div>{waterDate}</div>
                        <div>{nickname} {'('} {name} {')'}</div>
                    </div>
                    <div className='buttons_1'>
                        <StyledTransparentButton>삭제</StyledTransparentButton>
                        <StyledTransparentButton>수정</StyledTransparentButton>
                    </div>
                    <div className='buttons_2'>
                        <div>
                        <StyledGreenButton className='preview_button'>자세히 보기</StyledGreenButton>
                        <StyledGreenButton className='preview_button'>물 주기</StyledGreenButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlantList;