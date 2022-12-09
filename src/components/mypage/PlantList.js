import './PlantList.css';
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
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
    const [id, setId] = useState();
    const [plantId, setPlantId] = useState('');
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
    const fileInput = React.useRef(null);
    const [imgFile, setImgFile] = useState("");
    const [plantList, setPlantList] = useState([]);
    const navigate = useNavigate();
    let nicknamearr = [];
    const plant_Id = useRef(null);
    const ID = useRef(null);
    const [newPlantId, setNewPlantId] = useState();

    const [arr, SetArr] = useState([
        { value: '', name: '종류를 선택하세요'},
        { value: 1, name: '팽이버섯' },
        { value: 2, name: '양송이버섯' },
        { value: 3, name: '표고버섯' },
        { value: 4, name: '새송이버섯' },
        { value: 5, name: '느타리버섯' },
        { value: 6, name: '레몬밤' },
        { value: 7, name: '애플민트' },
        { value: 8, name: '스위트바질' },
        { value: 9, name: '오레가노' },
        { value: 10, name: '파슬리' },
        { value: 11, name: '딸기' },
        { value: 12, name: '올리브' },
        { value: 13, name: '방울토마토' },
        { value: 14, name: '골든베리' },
        { value: 15, name: '오크라' },
        { value: 16, name: '마늘' },
        { value: 17, name: '아스파라거스' },
        { value: 18, name: '대파' },
        { value: 19, name: '샐러리' },
        { value: 20, name: '양파줄기' },
        { value: 21, name: '무' },
        { value: 22, name: '당근' },
        { value: 23, name: '고구마' },
        { value: 24, name: '감자' },
        { value: 25, name: '콩나물' },
        { value: 26, name: '숙주' },
        { value: 27, name: '메밀싹' },
        { value: 28, name: '브로콜리싹' },
        { value: 29, name: '무싹' },
        { value: 30, name: '양배추싹' },
    ]);

    const PLANTS = [
        { value: '', name: '종류를 선택하세요'},
        { value: 1, name: '배추' },
        { value: 2, name: '부추' },
        { value: 3, name: '레몬' },
    ];

    useEffect(() => {
        axios
        .get(`/mypage/list?memberId=${memberId}`, { withCredentials: true })
        .then((response) => {
            console.log(response.data);
            setPlantList(response.data);
            console.log(plantList[2].id);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }, [memberId])
    
    const nicknameButton = (id) => {
        setNicknameModal(true);
        setId(plantList[id-1].id); // []안에 id가 undefined로 뜸
        ID.current = plantList[id-1].id;
        setPlantId(plantList[id-1].plantId);
        setNickname(plantList[id-1].nickname);
        console.log(id);
        console.log(ID.current);
        console.log(plantList[id-1].id);
        console.log(plantList[id-1].plantId);
        console.log(plantList[id-1].nickname);
        console.log(nickname);
        console.log(plantId);
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    }

    const waterdateButton = (id) => {
        setWaterdateModal(true);
        setId(plantList[id-1].id);
        ID.current = plantList[id-1].id;
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

    const removeButton = (id) => {
        setRemoveModal(true);
        setId(plantList[id-1].id);
        console.log(id);
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
        if (newNickname) {
            axios
            .put(`/mypage/modify/nickname?id=${id}&nickname=${newNickname}`, { nickname: newNickname }, { withCredentials: true })
            .then((response) => {
                console.log(response);
                console.log(id);
                console.log(plantId);
                console.log(nickname);
                console.log(newNickname);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.response);
                console.log(id);
                console.log(plantId);
                console.log(nickname);
                console.log(newNickname);
                alert("다시 시도해주세요");
            })
        }
        else {
            alert('애칭을 입력해주세요');
        }
    }

    const waterdatemodalConfirmButton = async() => {
        if(newWaterDate) {
            await axios
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
        else {
            alert('물 준 날짜를 입력해주세요');
        }
    }

    const removemodalCancelButton = () => {
        setRemoveModal(false);
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }

    const removemodalConfirmButton = async() => {
        await axios
        .post(`/mypage/delete?id=${id}`, { memberId: memberId }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            console.log(id);
            window.location.reload();
        })
        .catch((error) => {
            console.log(error.response);
            console.log(id);
            alert('다시 시도해주세요');
        })
    }

    const registermodalCancelButton = () => {
        setRegisterModal(false);
        setImgFile('');
    }

    const registermodalConfirmButton = async() => {
        // 빈칸일때 alert
        if (newPlantId) {
            if (newNickname) {
                if (newWaterDate) {
                    await axios
                    .post(`/mypage/new?memberId=${memberId}&plantId=${newPlantId}&imgUri=${imgFile}&waterDate=${newWaterDate}&nickname=${newNickname}`, { memberId: memberId, plantId: plantId, imgUri: imgFile, waterDate: newWaterDate, nickname: newNickname }, { withCredentials: true })
                    .then((response) => {
                        console.log(response);
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error.response);
                        alert("다시 시도해주세요");
                    })
                }
                else {
                    alert('최근 물 준 날짜를 입력하세요');
                }
            }
            else {
                alert('식물 애칭을 입력하세요');
            }
        }
        else {
            alert('식물을 선택해주세요')
        }
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
        setNewPlantId(e.target.value);
        setId(e.target.value);
    }

    const waterButton = async(id) => {
        setId(plantList[id-1].id);
        ID.current= plantList[id-1].id;
        await axios
        .put(`/mypage/modify/waterdate?id=${ID.current}&waterDate=${today}`, { waterDate: today }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            console.log(today);
            alert("물 주기 완료");
            window.location.reload();
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요");
            console.log(today);
            console.log(id);
        })
    }

    const detailButton = (id) => {
        plant_Id.current = plantList[id-1].plantId;
        console.log(plant_Id);
        navigate(`/detail/${plant_Id.current}`);
    }

    const imageButtonClick = e => {
        fileInput.current.click();
    };

    const handleImage = e => {
        console.log(e.target.files[0]);
        setImgFile(URL.createObjectURL(e.target.files[0]));
    };

    function viewPlantList () {
        const items = plantList.map((element, id) =>
            <>
            <div className='preview_box'>
                <div className='preview'>
                    { (element.isWater) ?
                        <div className='preview_water'>
                            <img src='/assets/waterdrop.png' alt='watedrop' />
                        </div> : null
                    }
                    {/* <img className='preview_image' src={element.imgUri} alt='plantimg' /> */}
                    <div className='preview_imageBox'>
                    { element.imgUri ?
                        <img className='preview_image' src={element.imgUri} alt='plantimg' />
                        : <img className='preview_image' src='/assets/profile.png' alt='plantimg' />
                    }
                    </div>
                    <div className='preview_info'>
                        <div>{element.waterDate}</div>
                        <div>{element.nickname}</div>
                    </div>
                    <div className='buttons_1'>
                        <StyledTransparentButton onClick={()=>removeButton(id+1)}>삭제</StyledTransparentButton>
                        <AskModal
                            visible={removeModal}
                            title=""
                            description={'식물을 삭제하시겠습니까?'}
                            onConfirm={removemodalConfirmButton}
                            onCancel={removemodalCancelButton}
                        />
                        <StyledTransparentButton onClick={()=>nicknameButton(id+1)}>애칭 수정</StyledTransparentButton>
                        <AskModal
                            visible={nicknameModal}
                            title="식물 정보 수정"
                            description={
                                <div style={{display: 'flex', marginTop: '1.5rem'}}>
                                    <div>애칭 :</div>&nbsp;
                                    <TextArea onChange={handleNickname} placeholder={nickname} />
                                </div>
                            }
                            onConfirm={nicknamemodalConfirmButton}
                            onCancel={nicknamemodalCancelButton}
                        />
                        <StyledTransparentButton onClick={()=>waterdateButton(id+1)}>물 준 날짜 수정</StyledTransparentButton>
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
                        <StyledGreenButton onClick={()=>detailButton(id+1)} className='preview_button'>자세히 보기</StyledGreenButton>
                        <StyledGreenButton onClick={()=>waterButton(id+1)} className='preview_button'>물 주기</StyledGreenButton>
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
        return (
            <div>{items}</div>
        )
    }

    const homeButtonClick = () => {
        navigate('/main');
    }

    return (
        <>
            <div className='title'>마이페이지</div>
            <div className='register_box'>
                <div className='register_button'>
                    <NavyButton onClick={registerButton}>식물 등록</NavyButton>
                    <TransparentButton onClick={homeButtonClick}>메인으로</TransparentButton>
                </div>
                <AskModal
                    visible={registerModal}
                    title="식물 등록"
                    description={
                        <>
                            <div>
                                <div className='profile'>
                                    {imgFile ?
                                        <img className='profile' src={imgFile} alt='profile' />
                                        : <img className='profile' src='/assets/profile.png' alt='profile' />
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
                                        {arr.map((option) => (
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
            <div className='preview_box_myp'>
                {viewPlantList()}
            </div>
        </>
    );
};

export default PlantList;