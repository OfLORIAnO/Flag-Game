import './reset.css';
import './settings.scss';

import FlagInfo from './pages/FlagInfo';

import { useDispatch, useSelector } from 'react-redux';

import {
    changePage,
    selectFlagInfo,
    selectGame,
    selectGamePrepare,
    selectHome,
    selectLose,
    selectProfile,
    selectWin,
} from './redux/Slices/PagesSlice';

import Home from './pages/Home';
import GamePrepare from './pages/GamePrepare';
import Profile from './pages/Profile';
import Game from './pages/Game';
import Lose from './pages/Lose';
import Win from './pages/Win';
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();

    const flagInfo = useSelector(selectFlagInfo);
    const home = useSelector(selectHome);
    const gamePrepare = useSelector(selectGamePrepare);
    const profile = useSelector(selectProfile);
    const game = useSelector(selectGame);
    const lose = useSelector(selectLose);
    const win = useSelector(selectWin);

    useEffect(() => {
        dispatch(changePage('home'));
    }, []);

    return (
        <>
            {flagInfo && <FlagInfo />}
            {home && <Home />}
            {gamePrepare && <GamePrepare />}
            {profile && <Profile />}
            {game && <Game />}
            {lose && <Lose />}
            {win && <Win />}
        </>
    );
}

export default App;
