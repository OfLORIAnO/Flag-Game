import { useEffect, useRef, useState } from 'react';

import { ImgMass } from '../utils/Sources';
import WinImg from '../assets/Star.png';
import LifeImg from '../assets/lifeWin.png';
import LostLifeImg from '../assets/lifeLost.png';
import MenuImg from '../assets/menuNextLevel.png';
import ReloadImg from '../assets/reloadNextLevel.png';
import NextLevel from '../assets/NextLevel.png';

import s from './Win.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
    resetGame,
    selectCurrentLevel,
    selectCurrentScore,
    selectLives,
    selectMaxCurrentScore,
    setCurrentLevel,
    setCurrentScore,
    setLevelList,
    setMaxCurrentScore,
    setNextLevel,
    setStartGame,
    updateScore,
} from '../redux/Slices/GameSlice';
import { changePage } from '../redux/Slices/PagesSlice';
import { selectAllData } from '../redux/Slices/DataSlice';
import { getLevelList } from '../utils/GameFuncs';
import { levelComplite, selectFlagMaxLevel, selectFlagScores, selectPlayerData, selectPlayerSdk, setScore } from '../redux/Slices/PlayerSlice';
import { selectCanShowAdv, selectYsdk, setCanShow } from '../redux/Slices/AdvertSlice';
function Win() {
    const dispatch = useDispatch();
    const isRerendered = useRef(false);
    const [currentImage, setCurrentImage] = useState();
    const allItems = useSelector(selectAllData); // весь массив данных
    const level = useSelector(selectCurrentLevel);
    const maxScore = useSelector(selectMaxCurrentScore);
    const score = useSelector(selectCurrentScore);
    const lives = useSelector(selectLives);
    const PlayerStats = useSelector(selectPlayerData);
    const dataCurrentLevel = useSelector(selectFlagMaxLevel);
    const PlayerScores = useSelector(selectFlagScores);
    // Показ рекламы
    const ysdk = useSelector(selectYsdk);
    const canShow = useSelector(selectCanShowAdv);
    useEffect(() => {
        canShow &&
            ysdk &&
            ysdk.adv.showFullscreenAdv({
                callbacks: {
                    onClose: function (wasShown) {
                        if (wasShown) {
                            dispatch(setCanShow());
                            const turnOnAdv = () => {
                                dispatch(setCanShow());
                            };
                            setTimeout(turnOnAdv, 60_000);
                            console.log('adv was shown');
                        } else {
                            console.log('adv no was shown. Just error');
                        }
                    },
                    onError: function (error) {
                        console.log('adv error', error);
                    },
                },
            });
    }, []);

    const onMenuClick = () => {
        dispatch(changePage('gamePrepare'));
        dispatch(resetGame());
    };
    const onReloadСlick = () => {
        dispatch(setCurrentLevel(level));
        dispatch(setLevelList(getLevelList(allItems, level)));
        dispatch(setStartGame());
        dispatch(changePage('game'));
    };
    const OnNextLevel = () => {
        dispatch(setNextLevel());
        dispatch(setLevelList(getLevelList(allItems, level + 1)));
        dispatch(setMaxCurrentScore(PlayerStats.score[level - 1].max));
        dispatch(setStartGame());
        dispatch(changePage('game'));
    };
    const calcTotalScore = () => {
        const index = level - 1;
        let minusLives = 0;
        if (lives !== 3) {
            minusLives = Math.floor(PlayerScores[index].max * 0.3) * (3 - lives);
        }
        let scoreUpdeted = score - minusLives;
        dispatch(updateScore(scoreUpdeted));
        return scoreUpdeted;
    };
    const PlayerSdk = useSelector(selectPlayerSdk);
    useEffect(() => {
        setCurrentImage(ImgMass[level - 1]);
        const scoreUpdeted = calcTotalScore();
        if (dataCurrentLevel === level && isRerendered.current == false) {
            dispatch(levelComplite());
        }
        if (scoreUpdeted >= PlayerScores[level - 1].current) {
            const index = level - 1;

            dispatch(setScore({ index, scoreUpdeted }));
        }
        isRerendered.current = true;
    }, []);
    useEffect(() => {
        PlayerSdk &&
            PlayerSdk.setData({
                score: PlayerScores,
                currentLevel: dataCurrentLevel,
            }).then(() => {
                console.log('PlayerScores: ', PlayerScores, 'was set in data');
                console.log('dataCurrentLevel: ', dataCurrentLevel, 'was set in data');
            });
    }, [PlayerScores]);
    const renderLivs = () => {
        const livesArray = [];
        for (let i = 0; i < lives; i++) {
            livesArray.push(<img key={'live_' + i} src={LifeImg} alt={`${lives} Life`} />);
        }
        for (let j = 0; j < 3 - lives; j++) {
            livesArray.push(<img key={+'live_' + j + 50} src={LostLifeImg} alt={`${lives} Life`} />);
        }
        return livesArray;
    };

    return (
        <div className={s.win}>
            <div className={s.main}>
                <div className={s.header_info}>
                    <div className={s.text}>
                        <h2>Уровень пройдён</h2>
                        <img src={WinImg} alt='Lose Image' />
                    </div>
                    {currentImage && <img src={currentImage} alt='Level Image' />}
                </div>
                <div className={s.info}>
                    <div className={s.score}>
                        {score}
                        <span>/{maxScore}</span>
                    </div>
                    <div className={s.lives}>{renderLivs()}</div>
                </div>
            </div>
            <div className={s.control_container}>
                <div className={s.control}>
                    <button className={s.menu} onClick={() => onMenuClick()}>
                        <img src={MenuImg} alt='Menu' />
                    </button>
                    <button className={s.reload} onClick={() => onReloadСlick()}>
                        <img src={ReloadImg} alt='Again' />
                    </button>
                    <button className={s.next} onClick={() => OnNextLevel()}>
                        <img src={NextLevel} alt='Next Level' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Win;
