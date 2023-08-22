import './reset.css';
import './settings.scss';
import './App.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';
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
import { selectCanShowAdv, selectYsdk, setCanShow, setYsdk } from './redux/Slices/AdvertSlice';
import {
    selectFlagMaxLevel,
    selectFlagScores,
    selectPlayerSdk,
    setDefault,
    setPlayerSdk,
    setTotalLevel,
    setTotalScore,
} from './redux/Slices/PlayerSlice';

function App() {
    const canShow = useSelector(selectCanShowAdv);
    const ysdk = useSelector(selectYsdk);

    const PlayerScores = useSelector(selectFlagScores);
    const dataCurrentLevel = useSelector(selectFlagMaxLevel);

    const PlayerSdk = useSelector(selectPlayerSdk);
    const dispatch = useDispatch();

    useEffect(() => {
        YaGames.init().then((ysdk) => {
            dispatch(setYsdk(ysdk));
            window.ysdk = ysdk;
        });
    }, []);

    useEffect(() => {
        if (PlayerSdk) {
            PlayerSdk.getData().then((data) => {
                if (data.achievements?.length > 0) {
                    console.log('Тут лежит', data.achievements);
                }
            });
            PlayerSdk.getData().then((data) => {
                if (data?.score && data?.currentLevel) {
                    dispatch(setTotalScore(data.score));
                    dispatch(setTotalLevel(data.currentLevel));
                    console.log('currentLevel:', data.currentLevel, 'Было принято из данных');
                    console.log('score:', data.score, 'Было принято из данных');
                } else {
                    console.log('По дефолту всё');
                    dispatch(setDefault());
                }
            });
        }
    }, [PlayerSdk]);

    useEffect(() => {
        var player;
        function initPlayer() {
            return ysdk.getPlayer().then((_player) => {
                player = _player;
                dispatch(setPlayerSdk(player));
                return player;
            });
        }
        ysdk &&
            initPlayer()
                .then((_player) => {
                    if (_player.getMode() === 'lite') {
                        // Игрок не авторизован.
                        console.log('Игрок не авторизован.');
                        ysdk.auth
                            .openAuthDialog()
                            .then(() => {
                                console.log('Игрок успешно авторизован.');

                                initPlayer().catch((err) => {
                                    console.log('2 Ошибка при инициализации объекта Player.');
                                });
                            })
                            .catch(() => {
                                console.log('Игрок не авторизован');
                            });
                    }
                })
                .catch((err) => {
                    console.log('1 Ошибка при инициализации объекта Player.', err);
                });
    }, [ysdk]);

    useEffect(() => {
        dispatch(setCanShow());
        const turnOnAdv = () => {
            dispatch(setCanShow());
        };
        setTimeout(turnOnAdv, 60_000);
    }, []);

    useEffect(() => {
        console.log('canShow: ', canShow);
    }, [canShow]);

    const flagInfo = useSelector(selectFlagInfo);
    const home = useSelector(selectHome);
    const gamePrepare = useSelector(selectGamePrepare);
    const profile = useSelector(selectProfile);
    const game = useSelector(selectGame);
    const lose = useSelector(selectLose);
    const win = useSelector(selectWin);

    useEffect(() => {
        dispatch(changePage('win'));
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
