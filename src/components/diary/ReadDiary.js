import './ReadDiary.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate  } from 'react-router-dom';
import styled from 'styled-components';
import TransparentButton from '../common/TransparentButton';
import AskModal from '../common/AskModal.js';

const StyledButton = styled(TransparentButton)`
    padding-left: 10px;
    padding-right: 10px;
    font-family: "S-CoreDream-3Light";
    font-size: 1rem;
    font-weight: bold;
`;

const SelectBox = styled.select`
	margin: 0 auto;
    margin-top: 1rem;
	min-width: 0;
	display: block;
	width: 80%;
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

const TextArea = styled.textarea`
    width: 90%;
    height: 10rem;
    resize: none;
    font-family: "S-CoreDream-3Light";
    font-size: 1.1rem;
    font-weight: normal;
    margin-top: 0.8rem;
`;

const STATE = [
    { value: '', name: '상태를 선택하세요'},
    { value: '0', name: '매우 나쁨'},
    { value: '1', name: '나쁨'},
    { value: '2', name: '보통'},
    { value: '3', name: '좋음'},
    { value: '4', name: '매우 좋음'},
];

const ReadDiary = () => {
    const [memberId, setMemberId] = useState(1);
    const [diarylist, setDiarylist] = useState([]);
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [editStateModal, setEditStateModal] = useState(false);
    const [editContentModal, setEditContentModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    const [changedState, setChangedState] = useState('');
    const [changedContent, setChangedContent] = useState('');
    let info = diarylist.map(diary => (diary.id));
    let path = location.pathname;
    let diaryid = path.substring(6);
    let theState = 0;

    const calendarButtonClick = () => {
        navigate('/diary');
    }

    const editStateButtonClick = () => {
        setEditStateModal(true);
    }

    const onEditStateCancel = () => {
        setEditStateModal(false);
        console.log(changedState);
    }

    const onEditStateConfirm = async() => {
        await axios
        .patch(`/diary/${diaryid}`, { state: state }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            setEditStateModal(false);
            Navigate('/diary');
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요");
        })
    }

    const editContentButtonClick = () => {
        setEditContentModal(true);
    }

    const onEditContentCancel = () => {
        setEditContentModal(false);
        console.log(changedContent);
    }

    const onEditContentConfirm = async() => {
        await axios
        .patch('http://3.39.17.18/diaries/content', { content: content }, { withCredentials: true })
        .then((response) => {
            console.log(response);
            setEditStateModal(false);
            Navigate('/diary');
        })
        .catch((error) => {
            console.log(error.response);
            alert("다시 시도해주세요");
        })
    }

    const removeButtonClick = () => {
        setRemoveModal(true);
    }

    const onRemoveCancel = () => {
        setRemoveModal(false);
    }

    const onRemoveConfirm = async() => {
        await axios
        .delete(`/diary/${diaryid}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
            navigate('/diary');
        })
        .catch((error) => {
            console.log(error.response);
        })
    }

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            // provider_Id.current = response.data[0].providerId;

            axios
            .get(`http://3.39.17.18/diaries`, { withCredentials: true })
            .then((response) => {
                setDiarylist(response.data.fetchResult);
            })
            .catch((error) => {
                console.log(error.response);
            })
            })
    }, [])

    useEffect(() => {
        axios
        .get(`/diary/list/${memberId}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
            setDiarylist(response.data);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }, [])

    function addDiaryList() {
        let diaryarr = [];
        for (var i=0; i<diarylist.length; i++) {
            diaryarr.push({
                id: diarylist[i].id,
                title: diarylist[i].state,
                date: diarylist[i].date,
                content: diarylist[i].content,
                color: '#ff000000',
                textColor: '#000000'
            })
        }
        // console.log(diaryarr[0].state);
        // console.log(diarylist[0].state);
        return diaryarr;
    }

    function theDiaryDate() {
        addDiaryList();
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/' + info[j]) {
                return diarylist[j].date;
            };
        };
    }

    function theDiaryContent() {
        addDiaryList();
        let info = diarylist.map(diary => (diary.id));
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/' + info[j]) {
                return diarylist[j].content;
            };
        };
    }

    function theDiaryState() {
        addDiaryList();
        for (var j=0; j<diarylist.length; j++) {
            if(path === '/read/' + info[j]) {
                if(diarylist[j].state === 0) {
                    return (
                        <>
                            <img src='/assets/state1.png' alt='state1' />
                            <div>매우 나쁨</div>
                        </>
                    )
                }
                else if(diarylist[j].state === 1) {
                    return (
                        <>
                            <img src='/assets/state2.png' alt='state2' />
                            <div>나쁨</div>
                        </>
                    )
                }
                else if(diarylist[j].state === 2) {
                    return (
                        <>  
                            <img src='/assets/state3.png' alt='state3' />
                            <div>보통</div>
                        </>
                    )
                }
                else if(diarylist[j].state === 3) {
                    return (
                        <>
                            <img src='/assets/state4.png' alt='state4' />
                            <div>좋음</div>
                        </>
                    )
                }
                else if(diarylist[j].state === 4) {
                    return (
                        <>
                            <img src='/assets/state5.png' alt='state5' />
                            <div>매우 좋음</div>
                        </>
                    )
                }
            };
        };
    }

    const handleSelectChange = (e) => {
        setChangedState(e.target.value);
    }

    const handleContentChange = (e) => {
        setChangedContent(e.target.value);
    }

    return (
        <>
            <div className='title'>
                일기 세부 내용
            </div>
            <div className='buttons'>
                <StyledButton onClick={calendarButtonClick} style={{float: 'left'}}>달력으로</StyledButton>
                <StyledButton onClick={removeButtonClick} style={{float: 'right'}}>삭제</StyledButton>
                <AskModal
                    visible={removeModal}
                    title=""
                    description={'일기를 삭제하시겠습니까?'}
                    onConfirm={onRemoveConfirm}
                    onCancel={onRemoveCancel}
                />
                <StyledButton onClick={editStateButtonClick} style={{float: 'right'}}>식물 상태 수정</StyledButton>
                <AskModal
                    visible={editStateModal}
                    title="식물 상태 수정"
                    description={
                        <>
                        <div>상태</div>
                        <SelectBox onChange={handleSelectChange}>
                            {STATE.map((option) => (
                                <option
                                key={option.value}
                                value={option.value}
                                >
                                {option.name}
                                </option>
                            ))}
                        </SelectBox>
                        </>
                    }
                    onConfirm={onEditStateConfirm}
                    onCancel={onEditStateCancel}
                />
                <StyledButton onClick={editContentButtonClick} style={{float: 'right'}}>내용 수정</StyledButton>
                <AskModal
                    visible={editContentModal}
                    title="내용 수정"
                    description={
                        <>
                            <div>수정할 내용을 입력하세요</div>
                            <TextArea onChange={handleContentChange} placeholder={content} />
                        </>
                    }
                    onConfirm={onEditContentConfirm}
                    onCancel={onEditContentCancel}
                />
            </div>
            <div className='diary_container'>
                <div className='date'>
                    {theDiaryDate()}
                </div>
                <div className='text'>
                    {theDiaryContent()}
                </div>
                <div className='state_image'>
                    {theDiaryState()}
                </div>
            </div>
        </>
    )
};

export default ReadDiary;