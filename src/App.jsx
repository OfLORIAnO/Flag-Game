import './reset.css';
import './settings.scss';

import FlagInfo from './pages/FlagInfo';

import { useSelector } from 'react-redux';

import {
    selectFlagInfo,
    selectGame,
    selectGamePrepare,
    selectHome,
    selectLose,
    selectProfile,
} from './redux/Slices/PagesSlice';

import Home from './pages/Home';
import GamePrepare from './pages/GamePrepare';
import Profile from './pages/Profile';
import Game from './pages/Game';
import Lose from './pages/Lose';

function App() {
    const flagInfo = useSelector(selectFlagInfo);
    const home = useSelector(selectHome);
    const gamePrepare = useSelector(selectGamePrepare);
    const profile = useSelector(selectProfile);
    const game = useSelector(selectGame);
    const lose = useSelector(selectLose);
    return (
        <>
            {flagInfo && <FlagInfo />}
            {home && <Home />}
            {gamePrepare && <GamePrepare />}
            {profile && <Profile />}
            {game && <Game />}
            {lose && <Lose />}
        </>
    );
}

export default App;
