import './MainPage.css';
import Header from "../components/common/Header";
import dictionary from '../images/dictionary.png';
import pencil from '../images/pencil.png';
import thumbsup from '../images/thumbsup.png';
import community from '../images/community.png';
import mypage from '../images/mypage.png';
import GreenButton from '../components/common/GreenButton';
import styled from 'styled-components';

const StyledButton = styled(GreenButton)`
    height: 3rem;
    width: 12rem;
    margin-top: 0.5rem;
`;

const MainPage = () => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    
    return (
        <>
            <Header />
            <div className='box_wrapper'>
                <div className='button_card'>
                    <img src={dictionary} alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 정보를 자세히 볼 수 있습니다.
                    </div>
                    <StyledButton>식물 도감</StyledButton>
                </div>
                <div className='button_card'>
                    <img src={pencil} alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 기록할 수 있습니다.
                    </div>
                    <StyledButton>성장 일기</StyledButton>
                </div>
                <div className='button_card'>
                    <img src={thumbsup} alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 추천받을 수 있습니다.
                    </div>
                    <StyledButton>식물 추천</StyledButton>
                </div>
                <div className='button_card'>
                    <img src={community} alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 커뮤니티 입니다.
                    </div>
                    <StyledButton>커뮤니티</StyledButton>
                </div>
                <div className='button_card'>
                    <img src={mypage} alt='dictionary' />
                    <div className='text'>
                        식물 ~~~~~~ 마이페이지.
                    </div>
                    <StyledButton>마이페이지</StyledButton>
                </div>
            </div>
        </>
    )
};

export default MainPage;