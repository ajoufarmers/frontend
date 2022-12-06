import './MainPage.css';
import Header from "../components/common/Header";
import GreenButton from '../components/common/GreenButton';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(GreenButton)`
    height: 3rem;
    width: 12rem;
    margin-top: 0.5rem;
`;

const MainPage = () => {
    // document.body.style.cssText = `
    // position: fixed; 
    // top: -${window.scrollY}px;
    // overflow-y: scroll;
    // width: 100%;`;

    const navigate = useNavigate();

    const dictionaryButton = () => {
        navigate('/dictionary');
    }

    const diaryButton = () => {
        navigate('/diary');
    }

    const recommendButton = () => {
        navigate('/survey');
    }

    const mypageButton = () => {
        navigate('/mypage');
    }
    
    return (
        <>
            <Header />
            <div className='box_wrapper'>
                <div className='button_card'>
                    <img src='/assets/dictionary.png' alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 정보를 자세히 볼 수 있습니다.
                    </div>
                    <StyledButton onClick={dictionaryButton}>식물 도감</StyledButton>
                </div>
                <div className='button_card'>
                    <img src='/assets/pencil.png' alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 기록할 수 있습니다.
                    </div>
                    <StyledButton onClick={diaryButton}>성장 일기</StyledButton>
                </div>
                <div className='button_card'>
                    <img src='/assets/thumbsup.png' alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 추천받을 수 있습니다.
                    </div>
                    <StyledButton onClick={recommendButton}>식물 추천</StyledButton>
                </div>
                <div className='button_card'>
                    <img src='/assets/community.png' alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 커뮤니티 입니다.
                    </div>
                    <StyledButton>커뮤니티</StyledButton>
                </div>
                <div className='button_card'>
                    <img src='/assets/mypage.png' alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 마이페이지.
                    </div>
                    <StyledButton onClick={mypageButton}>마이페이지</StyledButton>
                </div>
            </div>
        </>
    )
};

export default MainPage;