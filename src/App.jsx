import './reset.css';
import './settings.scss';

import FlagInfo from './pages/FlagInfo';
import { useSelector } from 'react-redux';
import {
    selectFlagInfo,
    selectGamePrepare,
    selectHome,
    selectProfile,
} from './redux/Slices/PagesSlice';

import Home from './pages/Home';
import GamePrepare from './pages/GamePrepare';
import Profile from './pages/Profile';

function App() {
    const flagInfo = useSelector(selectFlagInfo);
    const home = useSelector(selectHome);
    const gamePrepare = useSelector(selectGamePrepare);
    const profile = useSelector(selectProfile);
    return (
        <>
            {flagInfo && <FlagInfo />}
            {home && <Home />}
            {gamePrepare && <GamePrepare />}
            {profile && <Profile />}
        </>
    );
}

export default App;
