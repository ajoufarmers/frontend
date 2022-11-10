import './LoginPage.css';
import TransparentButton from '../components/common/TransparentButton';
import NavyButton from '../components/common/NavyButton';
import logo from '../images/logo.png';
import lemontree from '../images/lemontree.jpg';
import basil from '../images/basil.jpg';
import herb from '../images/herb.jpg';
import styled from 'styled-components';
import '../lib/styles/fonts/font.css';

const LoginPage = () => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

    return (
        <div className='background'>
        <div className='mount'>
            <div className='header'>
                <img className='header_logo' src={logo} alt="logo" />
                <div className='header_text' style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.75rem", fontWeight:"bold"}}>맛있는 녀석들</div>
                <TransparentButton className='header_usbutton'>Contact Us</TransparentButton>
                <NavyButton className='header_loginbutton'>로그인</NavyButton>
            </div>
            <div className='explainbox'>
                <img className='lemonimage' src={lemontree} alt="lemon" />
                <img className='basilimage' src={basil} alt="basil" />
                <img className='herbimage' src={herb} alt="herb" />
                <div className='maintext' style={{fontFamily:'NeoDunggeunmo', fontSize:"3rem", fontWeight:"lighter"}}>식용 식물<br/>추천, 관리 웹서비스</div>
                <div className='explaintext'style={{fontFamily:"S-CoreDream-2Light", fontSize:"1.5rem", fontWeight:"bold"}}>식물 추천, 물 주기,,,<br/>등 일기 기록할 수 있습니다.</div>
            </div>
        </div>
        </div>
    )
};

export default LoginPage;