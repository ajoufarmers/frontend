import './PlantList.css';
import styled from 'styled-components';
import herb from '../../images/lemontree.jpg';
import waterdrop from '../../images/waterdrop.png';
import profile from '../../images/profile.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransparentButton from '../common/TransparentButton';
import GreenButton from '../common/GreenButton';
import NavyButton from '../common/NavyButton';
import AskModal from '../common/AskModal.js';
import { useNavigate } from 'react-router-dom';

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

const SelectBox = styled.select`
	margin: 0;
	min-width: 0;
	display: block;
	width: 50%;
    height: 2rem;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 4px;
	color: inherit;
	background-color: transparent;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
	&:focus {
		border-color: gray;
	}
`;

const PlantList = () => {
    // 이미지, 키우기시작한 날짜, 최근 물준날짜, 애칭, 학명, 자세히보기 버튼
    const [memberId, setMemberId] = useState(1);
    const [id, setId] = useState('');
    const [plantId, setPlantId] = useState();
    const [date, setDate] = useState('');
    const [waterDate, setWaterDate] = useState([]);
    const [nickname, setNickname] = useState([]);
    const [name, setName] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newWaterDate, setNewWaterDate] = useState('');
    const [newNickname, setNewNickname] = useState('');
    const [newName, setNewName] = useState('');
    const [nicknameModal, setNicknameModal] = useState(false);
    const [waterdatetModal, setWaterdateModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const today = new Date().toISOString().substring(0, 10);
    const [waterTiming, setWaterTiming] = useState([]);
    const fileInput = React.useRef(null);
    const [imgFile, setImgFile] = useState("");
    const [plantList, setPlantList] = useState([]);
    const navigate = useNavigate();
    let nicknamearr = [];

    const PLANTS = [
        { value: '', name: '종류를 선택하세요'},
        { value: '콩나물', name: '콩나물' },
        { value: '감자', name: '감자' },
        { value: '상추', name: '상추' },
        { value: '루콜라', name: '루콜라' },
        { value: '허브', name: '허브' },
        { value: '콩', name: '콩' },
    ];

    useEffect(() => {
        getPlantId();
        getPlantNickname();
        getPlantWaterdate();
        axios
        .get(`/mypage/list?memberId=${memberId}`, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setPlantList(response.data);
            console.log(plantList);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }, [memberId])

    function getPlantId () {
        let plantIdarr = [];
        for (var i=0; i<plantList.length; i++) {
            plantIdarr.push({
                id: plantList[i].plantId
            })
        }
        console.log(plantIdarr);
        return plantIdarr;
    }

    function getPlantNickname () {
        for (var i=0; i<plantList.length; i++) {
            nicknamearr.push({
                id: plantList[i].id,
                nickname: plantList[i].nickname
            })
        }
        console.log(nicknamearr);
        return nicknamearr;
    }

    function getPlantWaterdate () {
        let waterarr = [];
        for (var i=0; i<plantList.length; i++) {
            waterarr.push({
                id: plantList[i].id,
                waterDate: plantList[i].waterDate
            })
        }
        console.log(waterarr);
        return waterarr;
    }
    
    useEffect(() => {
        axios
        .get(`/mypage/watertiming?memberId=${memberId}`, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setWaterTiming(response.data);
        })
        .catch((error) => {
            // console.log(error.response);
        })
    }, [])
    
    const nicknameButton = (id) => {
        setNicknameModal(true);
        setId(plantList[id-1].id);
        setPlantId(plantList[id-1].plantId);
        setNickname(plantList[id-1].nickname);
        console.log(id);
        console.log(plantList[id-1].nickname);
        console.log(nickname);
        
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }

    const waterdateButton = (id) => {
        setWaterdateModal(true);
        setId(plantList[id-1].id);
        setPlantId(plantList[id-1].plantId);
        setWaterDate(plantList[id-1].waterDate);
        console.log(id);
        console.log(plantList[id-1].waterDate);
        console.log(waterDate);

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

    const nicknamemodalCancelButton = () => {
        setNicknameModal(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const waterdatemodalCancelButton = () => {
        setWaterdateModal(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const nicknamemodalConfirmButton = () => {
        axios
        .put(`/mypage/modify/nickname?id=${id}&nickname=${newNickname}`, { nickname: newNickname }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            console.log(plantId);
            console.log(nickname);
            console.log(newNickname);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error.response);
            console.log(plantId);
            console.log(nickname);
            console.log(newNickname);
            alert("다시 시도해주세요");
        })
    }

    const waterdatemodalConfirmButton = () => {
        axios
        .put(`/mypage/modify/waterdate?id=${id}&waterDate=${newWaterDate}`, { waterDate: newWaterDate }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            console.log(plantId);
            console.log(newWaterDate);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error.response);
            console.log(plantId);
            console.log(newWaterDate);
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
        setImgFile('');
    }

    const registermodalConfirmButton = async() => {
        await axios
        .post(`/mypage/new?memberId=${memberId}&plantId=${plantId}&imgUri=${imgFile}&waterDate=${newWaterDate}&nickname=${newNickname}`, { memberId: memberId, plantId: plantId, imgUri: imgFile, waterDate: newWaterDate, nickname: newNickname }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요");
        })
        // 빈칸일때 alert
    }

    const handleNickname = (e) => {
        setNewNickname(e.target.value);
        console.log(e.target.value);
    }

    const handleWaterdate = (e) => {
        setNewWaterDate(e.target.value);
        console.log(e.target.value);
    }

    const handleSelectChange = (e) => {
        setNewName(e.target.value);
        console.log(e.target.value);
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

    const imageButtonClick = e => {
        fileInput.current.click();
    };

    const handleImage = e => {
        console.log(e.target.files[0]);
        setImgFile(URL.createObjectURL(e.target.files[0]));
    };

    function viewPlantList () {
        const items = plantList.map((element) =>
            <>
            {/* <div className='preview_box'> */}
                {waterTiming ?
                    <div className='preview_water'>
                        <img src={waterdrop} alt='waterdrop' />
                    </div> : null
                }
                <div className='preview'>
                    <img className='preview_image' src={element.imgUri} alt='plantimg' />
                    <div className='preview_info'>
                        <div>{element.waterDate}</div>
                        <div>{element.nickname}</div>
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
                        <StyledTransparentButton onClick={()=>nicknameButton(element.id)}>애칭 수정</StyledTransparentButton>
                        <AskModal
                            visible={nicknameModal}
                            title="식물 정보 수정"
                            description={
                                <>
                                <img className='preview_image' src={herb} alt="herb" style={{marginBottom: '1rem'}}/>
                                {/* <GreenButton onClick={imageButtonClick} style={{marginTop: "1rem"}}>사진 수정</GreenButton>
                                <input
                                        type="file"
                                        accept="image/*"
                                        name="profile"
                                        ref={fileInput}
                                        onChange={handleImage}
                                        style={{ display: "none" }}
                                />
                                <br /> */}
                                <div style={{display: 'flex', marginTop: '1.5rem'}}>
                                    <div>애칭 :</div>&nbsp;
                                    <TextArea onChange={handleNickname} placeholder={nickname} />
                                </div>
                                </>
                            }
                            onConfirm={nicknamemodalConfirmButton}
                            onCancel={nicknamemodalCancelButton}
                        />
                        <StyledTransparentButton onClick={()=>waterdateButton(element.id)}>물 준 날짜 수정</StyledTransparentButton>
                        <AskModal
                            visible={waterdatetModal}
                            title="식물 정보 수정"
                            description={
                                <>
                                <div style={{display: 'flex', marginTop: '1.5rem'}}>
                                    <div>물 준 날짜 :</div>&nbsp;
                                    <TextArea onChange={handleWaterdate} placeholder={waterDate} />
                                </div>
                                </>
                            }
                            onConfirm={waterdatemodalConfirmButton}
                            onCancel={waterdatemodalCancelButton}
                        />
                    </div>
                    <div className='buttons_2'>
                        <div>
                        <StyledGreenButton className='preview_button'>자세히 보기</StyledGreenButton>
                        <StyledGreenButton onClick={waterButton} className='preview_button'>물 주기</StyledGreenButton>
                        </div>
                    </div>
                </div>
            {/* </div> */}
            </>
        );
        return (
            <div>{items}</div>
        )
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
                                <div className='profile'>
                                    {imgFile ?
                                        <img className='profile' src={imgFile} alt='profile' />
                                        : <img className='profile' src={profile} alt='profile' />
                                    }
                                </div>
                                <div style={{display: 'flex', marginTop: '1.5rem', justifyContent: 'center'}}>
                                    <GreenButton onClick={imageButtonClick}>파일 업로드</GreenButton>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="profile"
                                        ref={fileInput}
                                        onChange={handleImage}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                <div style={{display: 'flex', marginTop: '1.5rem'}}>
                                    <div>식물 이름 :</div>&nbsp;
                                    <SelectBox onChange={handleSelectChange}>
                                        {PLANTS.map((option) => (
                                            <option
                                            key={option.value}
                                            value={option.value}
                                            >
                                            {option.name}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </div>
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
                {viewPlantList()}
            </div>
        </>
    );
};

export default PlantList;