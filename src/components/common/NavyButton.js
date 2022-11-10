import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import '../../lib/styles/fonts/font.css';

const StyledButton = styled.button`
    border: none;
    border-radius: 6px;
    font-family: NeoDunggeunmo;
    font-size: 1.1rem;
    font-weight: normal;
    padding: 0.75rem 1.25rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.navy[0]};
    &:hover {
        background: ${palette.navy[2]};
    }
`;

const NavyButton = props => <StyledButton {...props} />;

export default NavyButton;