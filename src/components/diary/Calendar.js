import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import './Calendar.css';
import axios from 'axios';
import state1 from '../../images/state1.png';
import state2 from '../../images/state2.png';
import state3 from '../../images/state3.png';
import state4 from '../../images/state4.png';
import state5 from '../../images/state5.png';

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
    const [diarylist, setDiarylist] = useState([]);
    const [state, setState] = useState('');
    const provider_Id = useRef(null);

    useEffect(() => {
        axios
        .get('/checklogin', { withCredentials: true })
        .then(response => {
            setState(response.status);
            provider_Id.current = response.data[0].providerId;
            axios
            .get(`http://3.39.17.18/diaries/${provider_Id.current}`, { withCredentials: true })
            .then((response) => {
                console.log(response.data.fetchResult);
                setDiarylist(response.data.fetchResult);
            })
            .catch((error) => {
                console.log(error.response);
            })
            })
    }, [])

    const handleDateClick = (arg) => {
        console.log(arg);
        console.log(arg.dateStr);
    }

    const handleEventClick = (info) => {
        window.location.href = `http://localhost:3000/diaryread/:${info.event.id}`;
    }

    function renderState(info) {
        if (info.event.plantstate === '0') {
            return (
                <div className='event'>
                    <img display='block' margin='0 auto' src={state1} alt='state1' />
                </div>
            )
        }
    }

    function addDiaryList() {
        let diaryarr = [];
        if(diarylist) {
            for (var i=0; i<diarylist.length; i++) {
                diaryarr.push({
                    id: diarylist[i].id,
                    plantstate: diarylist[i].state,
                    date: diarylist[i].written_date.substr(0, 10),
                    content: diarylist[i].content,
                    color: '#ff000000',
                    textColor: '#000000'
                })
            }
        }
        return (
            diaryarr
        )
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
                eventClick={handleEventClick}
                events={addDiaryList()}
                displayEventEnd={true}
                headerToolbar={{
                    left: "prevYear,prev",
                    center: "title",
                    right: "today next,nextYear"
                }}
                />
            </CalendarBlock>
        </div>
        </>
    )
}

export default Calendar;