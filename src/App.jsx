import { useEffect, useState } from 'react';
import './reset.css';
import './App.css';
import './settings.scss';
// import Game from './pages/Game';
import FlagInfo from './pages/FlagInfo';
import { useSelector } from 'react-redux';
import { selectFlagInfo, selectHome } from './redux/Slices/PagesSlice';
import Home from './pages/Home';
function App() {
    const flagInfo = useSelector(selectFlagInfo);
    const home = useSelector(selectHome);
    return <>
        {flagInfo && <FlagInfo />}
        {home && <Home />}
    </>;
}

export default App;
