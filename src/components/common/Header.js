import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Responsive from './Responsive';
import NavyButton from './NavyButton';
import '../../lib/styles/fonts/font.css';
import * as googleAPI from '../../lib/api/auth';

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    height: 5rem;
    background: white;
    box-shadow: 1px 1px 5px lightgray;
    z-index: 1010;
`;

const Wrapper = styled(Responsive)`
    margin-top: 0.5rem;
    height: 4rem;
    display: flex;
    align-items: center;
    .logoimage {
        width: 45px;
    }
    .logotext {
        font-size: 1.5rem;
        font-weight: 800;
        font-family: NeoDunggeunmo;
        font-weight: normal;
        padding-left: 0.5rem;
    }
    .right {
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        margin-right: 1rem;
    }
`;

const Spacer = styled.div`
    height: 7.5rem;
`;

const Header = () => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link to="/main" className="logo">
                        <img className='logoimage' src='/assets/logo.png' alt="logo" />
                    </Link>
                    <div className='logotext'>맛있는 녀석들</div>
                    <div className='right'>
                        <NavyButton onClick={googleAPI.logout}>로그아웃</NavyButton>
                    </div>
                </Wrapper>
            </HeaderBlock>
            <Spacer />
        </>
    );
};

export default Header;