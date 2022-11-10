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
    color: black;
    outline: none;
    cursor: pointer;

    background: rgba( 255, 255, 255, 0 );
    &:hover {
        color: ${palette.gray[2]};
    }
`;

const TransparentButton = props => <StyledButton {...props} />;

export default TransparentButton;