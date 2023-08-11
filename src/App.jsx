import { useEffect, useState } from 'react';
import './reset.css';
import './App.css';
import './settings.scss';
// import Game from './pages/Game';
import FlagInfo from './pages/FlagInfo';
import { useSelector } from 'react-redux';
import {
    selectFlagInfo,
    selectGamePrepare,
    selectHome,
} from './redux/Slices/PagesSlice';
import Home from './pages/Home';
import GamePrepare from './pages/GamePrepare';
function App() {
    const flagInfo = useSelector(selectFlagInfo);
    const home = useSelector(selectHome);
    const gamePrepare = useSelector(selectGamePrepare);
    return (
        <>
            {flagInfo && <FlagInfo />}
            {home && <Home />}
            {gamePrepare && <GamePrepare />}
        </>
    );
}

export default App;
