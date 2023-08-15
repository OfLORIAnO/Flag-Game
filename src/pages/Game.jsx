import React, { useEffect, useState } from 'react';
import {
    correctAns,
    incorrectAns,
    resetGame,
    selectCurrentLevel,
    selectCurrentObject,
    selectCurrentStep,
    selectLevelList,
    selectLives,
    timeOut,
} from '../redux/Slices/GameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../redux/Slices/PagesSlice';

import Header from '../components/Header';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CapitalImg from '../assets/capital.png';
import PopulationImg from '../assets/population.png';
import backImg from '../assets/back.png';
import FlagImg from '../assets/flag.png';
import LifeImg from '../assets/life.png';
import SoundImg from '../assets/sound.png';
import { ImgMass } from '../utils/Src';
import s from './Game.module.scss';
import { formatNumber } from '../utils/FormatNumber';
import { GetVariants } from '../utils/GameFuncs';
import { selectAllData } from '../redux/Slices/DataSlice';
import FlagsVarianGame from '../components/FlagsVarianGame';

function Game() {
    const dispatch = useDispatch();
    const [variants, setVariants] = useState([]);
    const [wasCorrect, setWasCorrect] = useState(false);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [isTimerPlaying, setIsTimerPlaying] = useState(true);

    const allData = useSelector(selectAllData);
    const levelList = useSelector(selectLevelList);
    const level = useSelector(selectCurrentLevel);
    const currentObject = useSelector(selectCurrentObject);
    const step = useSelector(selectCurrentStep);
    const lives = useSelector(selectLives);

    const goToPrepareGame = () => {
        // dispatch(resetGame());
        dispatch(changePage('gamePrepare'));
    };

    const correct = () => {
        setIsTimerPlaying(false);
        const doCorrect = () => {
            dispatch(correctAns());
            setWasCorrect(false);
            setIsTimerPlaying(true);
        };
        setWasCorrect(true);
        if (isLastQuestion) {
            //! тут что-то сделать короче чтоб победа была в этом как там его аааа в редуксе добавь "win" там
        }
        setTimeout(doCorrect, 1000);
    };
    const incorrect = () => {
        dispatch(incorrectAns());
    };
    useEffect(() => {
        step === levelList.length - 1 && setIsLastQuestion(true);
    }, [step]);
    useEffect(() => {
        isLastQuestion && GameWin();
    }, [step]);
    useEffect(() => {
        currentObject && setVariants(GetVariants(allData, currentObject));
    }, [step]);
    useEffect(() => {
        lives === 0 && GameOver();
    }, [lives]);

    const GameOver = () => {
        goToLosePage();
    };
    const goToLosePage = () => {
        dispatch(changePage('lose'));
    };
    const GameWin = () => {
        dispatch(changePage('win'));
    };

    const renderLivs = () => {
        const livesArray = [];
        for (let i = 0; i < lives; i++) {
            livesArray.push(<img key={i} src={LifeImg} alt={`${lives} Life`} />);
        }
        return livesArray;
    };
    const timerOut = () => {
        dispatch(timeOut());
    };
    const renderVariants = () => {
        return (
            variants &&
            variants.map((item) => {
                return (
                    <FlagsVarianGame
                        isTimerPlaying={isTimerPlaying}
                        setIsTimerPlaying={setIsTimerPlaying}
                        setWasCorrect={setWasCorrect}
                        allDisabled={wasCorrect}
                        key={item.id}
                        item={item}
                        correct={correct}
                    />
                );
            })
        );
    };
    if (currentObject) {
        return (
            <div className={s.game}>
                <div className={s.header__container}>
                    <header className={s.header}>
                        <div className={s.header_left}>
                            <button className={s.changePage} onClick={() => goToPrepareGame()}>
                                <img src={backImg} alt='Button Back' />
                            </button>
                            <div className={s.lives}>{renderLivs()}</div>
                        </div>
                        <div className={s.header_center}>
                            <img src={ImgMass[level - 1]} alt='Level Icon Image' />
                            <h1>Уровень {level}</h1>
                        </div>
                        <div className={s.header_right}>
                            <button className={s.sound}>
                                <img src={SoundImg} alt='' />
                            </button>
                            <CountdownCircleTimer
                                isPlaying={isTimerPlaying}
                                key={step}
                                size={40}
                                strokeWidth={3}
                                colors={'#fff'}
                                trailColor={'#fff'}
                                trailStrokeWidth={1}
                                duration={20}
                                // onComplete={() => timerOut()}
                            >
                                {({ remainingTime }) => remainingTime}
                            </CountdownCircleTimer>
                        </div>
                    </header>
                </div>

                <div className={s.info}>
                    <div className={s.capital}>
                        <img src={CapitalImg} alt='Capital Icon' />
                        <span>{currentObject.capital}</span>
                    </div>
                    <div className={s.population}>
                        <span>{formatNumber(currentObject.population)}</span>
                        <img src={PopulationImg} alt='Population Icon' />
                    </div>
                </div>
                <div className={s.progress}>
                    <div className={s.out}>
                        <div className={s.bar} style={{ width: `${(step / 20) * 100}%` }}></div>
                    </div>
                </div>
                <div className={s.content}>
                    <h2 className={s.title} style={{ color: wasCorrect ? '#229D01' : '#6252c5' }}>
                        {currentObject.name}
                    </h2>
                    <div className={s.flags}>{renderVariants()}</div>
                </div>
            </div>
        );
    } else {
        goToPrepareGame();
    }
}

export default Game;
