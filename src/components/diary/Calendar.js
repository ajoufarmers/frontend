import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import './Calendar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CalendarBlock = styled.div`
    width: 100%;
    background: white;
    font-family: "S-CoreDream-3Light";
    font-size: 1rem;
    font-weight: normal;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top : 0.5rem;
    z-index: 1000;
`;

const Calendar = () => {
    const [memberId, setMemberId] = useState(1);
    const [diarylist, setDiarylist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`/diary/list/${memberId}`, { withCredentials: true })
        .then((response) => {
            console.log(response);
            setDiarylist(response.data);
            console.log(diarylist);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }, [])

    const handleDateClick = (arg) => {
        console.log(arg);
        console.log(arg.dateStr);
    }

    const handleEventClick = (info) => {
        window.location.href = `http://localhost:3000/read/${info.event.id}`;
    }

    function renderState(info) {
        if (info.event.title === '0') {
            return (
                <>
                    <div className='event'>
                        <img display='block' margin='0 auto' src='/assets/state1.png' alt='state1' />
                    </div>
                    <div className='event'>
                        매우 나쁨
                    </div>
                </>
            )
        }
        else if (info.event.title === '1') {
            return (
                <>
                    <div className='event'>
                        <img display='block' margin='0 auto' src='/assets/state2.png' alt='state2' />
                    </div>
                    <div className='event'>
                        나쁨
                    </div>
                </>
            )
        }
        else if (info.event.title === '2') {
            return (
                <>
                    <div className='event'>
                        <img display='block' margin='0 auto' src='/assets/state3.png' alt='state3' />
                    </div>
                    <div className='event'>
                        보통
                    </div>
                </>
            )
        }
        else if (info.event.title === '3') {
            return (
                <>
                    <div className='event'>
                        <img display='block' margin='0 auto' src='/assets/state4.png' alt='state4' />
                    </div>
                    <div className='event'>
                        좋음
                    </div>
                </>
            )
        }
        else if (info.event.title === '4') {
            return (
                <>
                    <div className='event'>
                        <img display='block' margin='0 auto' src='/assets/state5.png' alt='state5' />
                    </div>
                    <div className='event'>
                        매우 좋음
                    </div>
                </>
            )
        }
    }

    function addDiaryList() {
        let diaryarr = [];
        if(diarylist) {
            for (var i=0; i<diarylist.length; i++) {
                diaryarr.push({
                    id: diarylist[i].id,
                    title: diarylist[i].state,
                    // date: diarylist[i].written_date.substr(0, 10),
                    date: diarylist[i].date,
                    content: diarylist[i].content,
                    color: '#ff000000',
                    textColor: '#000000'
                })
            }
        }
        console.log(diaryarr);
        return (
            diaryarr
        )
    }

    const writeButtonClick = () => {
        navigate('/write');
    }

    const homeButtonClick = () => {
        navigate('/main');
    }

    return (
        <>
        <div className='calendar-wrapper'>
            <CalendarBlock>
                <FullCalendar
                initialView="dayGridMonth"
                plugins={[ dayGridPlugin, interactionPlugin ]}
                selectable={true}
                locale="ko"
                aspectRatio="1.8"
                dateClick={handleDateClick}
                eventContent={renderState}
                eventClick={handleEventClick}
                events={addDiaryList()}
                displayEventEnd={true}
                customButtons={{
                    myCustomButton: {
                        text: '일기 작성',
                        click: writeButtonClick
                    },
                    homeButton: {
                        text: '메인으로',
                        click: homeButtonClick
                    }
                }}
                headerToolbar={{
                    left: "prevYear,prev myCustomButton",
                    center: "title",
                    right: "homeButton today next,nextYear"
                }}
                />
            </CalendarBlock>
        </div>
        </>
    )
}

export default Calendar;