import './PlantList.css';
import styled from 'styled-components';
import herb from '../../images/lemontree.jpg';
import React, { useState } from 'react';
import axios from 'axios';
import TransparentButton from '../common/TransparentButton';
import GreenButton from '../common/GreenButton';
import NavyButton from '../common/NavyButton';
import AskModal from '../common/AskModal';

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

const TextArea = styled.textarea`
    width: 70%;
    height: 2rem;
    resize: none;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
`;

const PlantList = () => {
    // 이미지, 키우기시작한 날짜, 최근 물준날짜, 애칭, 학명, 자세히보기 버튼
    const [plantId, setPlantId] = useState('');
    const [date, setDate] = useState('2022-11-12');
    const [waterDate, setWaterDate] = useState('2022-11-12');
    const [nickname, setNickname] = useState('모다피');
    const [name, setName] = useState('콩나물');
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const today = new Date().toISOString().substring(0, 10);

    const editButton = () => {
        setEditModal(true);
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }

    const removeButton = () => {
        setRemoveModal(true);
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }

    const registerButton = () => {
        setRegisterModal(true);
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }

    const editmodalCancelButton = () => {
        setEditModal(false);
    }

    const editmodalConfirmButton = async() => {
        await axios
        .patch(`http://3.39.17.18/mypage/modify/nickname`, { nickname: nickname }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            setNickname(nickname);
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요");
        })
    }

    const removemodalCancelButton = () => {
        setRemoveModal(false);
    }

    const removemodalConfirmButton = async() => {
        await axios
        .delete(`http://3.39.17.18/diaries/details/${plantId}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }

    const registermodalCancelButton = () => {
        setRegisterModal(false);
    }

    const registermodalConfirmButton = async() => {
        await axios
        .post(`http://3.39.17.18/mypage/new`, { withCredentials: true })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }

    const handleNickname = (e) => {
        setNickname(e.target.value);
    }

    const handleWaterdate = (e) => {
        setWaterDate(e.target.value);
    }

    const waterButton = async() => {
        await axios
        .patch(`http://3.39.17.18/mypage/modify/waterdate`, { waterDate: today }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            alert("물 주기 완료")
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요")
            console.log(today);
        })
    }

    return (
        <>
            <div className='title'>마이페이지</div>
            <div className='register_box'>
                <NavyButton onClick={registerButton} className='register_button'>식물 등록</NavyButton>
                <AskModal
                    visible={registerModal}
                    title="식물 등록"
                    description={
                        <>
                            <div>
                                <div style={{display: 'flex', marginTop: '1.5rem'}}>
                                    <div>애칭 :</div>&nbsp;
                                    <TextArea onChange={handleNickname} placeholder={'식물 애칭을 입력해주세요'} />
                                </div>
                                <div style={{display: 'flex', marginTop: '1rem'}}>
                                    <div>물 준 날짜 :</div>&nbsp;
                                    <TextArea onChange={handleWaterdate} placeholder={'최근 물 준 날짜를 입력해주세요'} />
                                </div>
                            </div>
                        </>
                    }
                    onConfirm={registermodalConfirmButton}
                    onCancel={registermodalCancelButton}
                />
            </div>
            <div className='preview_box'>
                <div className='preview'>
                    <img className='preview_image' src={herb} alt='herb' />
                    <div className='preview_info'>
                        <div>{date}</div>
                        <div>{waterDate}</div>
                        <div>{nickname} {'('} {name} {')'}</div>
                    </div>
                    <div className='buttons_1'>
                        <StyledTransparentButton onClick={removeButton}>삭제</StyledTransparentButton>
                        <AskModal
                            visible={removeModal}
                            title=""
                            description={'식물을 삭제하시겠습니까?'}
                            onConfirm={removemodalConfirmButton}
                            onCancel={removemodalCancelButton}
                        />
                        <StyledTransparentButton onClick={editButton}>수정</StyledTransparentButton>
                        <AskModal
                            visible={editModal}
                            title="식물 정보 수정"
                            description={
                                <>
                                <img className='preview_image' src={herb} alt="herb" style={{marginBottom: '1rem'}}/>
                                <GreenButton style={{marginTop: "1rem"}}>사진 수정</GreenButton>
                                <br />
                                <div style={{display: 'flex', marginTop: '1.5rem'}}>
                                    <div>애칭 :</div>&nbsp;
                                    <TextArea onChange={handleNickname} placeholder={nickname} />
                                </div>
                                <div style={{display: 'flex', marginTop: '1rem'}}>
                                    <div>물 준 날짜 :</div>&nbsp;
                                    <TextArea onChange={handleWaterdate} placeholder={waterDate} />
                                </div>
                                </>
                            }
                            onConfirm={editmodalConfirmButton}
                            onCancel={editmodalCancelButton}
                        />
                    </div>
                    <div className='buttons_2'>
                        <div>
                        <StyledGreenButton className='preview_button'>자세히 보기</StyledGreenButton>
                        <StyledGreenButton onClick={waterButton} className='preview_button'>물 주기</StyledGreenButton>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlantList;