import styled from 'styled-components'
import { panelBackground } from '../themeVars';

const StyledPanel = styled.div`
    background: ${panelBackground};
    /* Shadow / 100 */
    box-shadow: 0px 2px 4px rgba(24, 39, 75, 0.12), 0px 4px 4px rgba(24, 39, 75, 0.08);
    border-radius: 8px;
    margin: 12px;
    width: 80vw;
    height: 60vh;
    padding: 30px;
`;

export default StyledPanel