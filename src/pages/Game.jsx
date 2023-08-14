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

import backImg from '../assets/back.png';
import FlagImg from '../assets/flag.png';
import LifeImg from '../assets/life.png';
import SoundImg from '../assets/sound.png';
import CapitalImg from '../assets/capital.png';
import PopulationImg from '../assets/population.png';

import s from './Game.module.scss';
import { formatNumber } from '../utils/FormatNumber';
import { GetVariants } from '../utils/GameFuncs';
import { selectAllData } from '../redux/Slices/DataSlice';
import VarianGame from '../components/VarianGame';

function Game() {
    const [variants, setVariants] = useState([]);
    const [wasCorrect, setWasCorrect] = useState(false);
    const dispatch = useDispatch();

    const goToPrepareGame = () => {
        dispatch(resetGame());
        dispatch(changePage('gamePrepare'));
    };
    const doCorrect = () => {
        dispatch(correctAns());
        setWasCorrect(false);
        console.log(wasCorrect);
    };
    const correct = () => {
        setWasCorrect(true);
        console.log(wasCorrect);
        setTimeout(doCorrect, 1000);
    };
    const incorrect = () => {
        dispatch(incorrectAns());
    };

    const allData = useSelector(selectAllData);
    const levelList = useSelector(selectLevelList);
    const level = useSelector(selectCurrentLevel);
    const currentObject = useSelector(selectCurrentObject);
    const step = useSelector(selectCurrentStep);
    const lives = useSelector(selectLives);

    useEffect(() => {
        currentObject && setVariants(GetVariants(allData, currentObject));
    }, [step]);
    useEffect(() => {
        lives === 0 && goToPrepareGame();
    }, [lives]);

    const renderLivs = () => {
        const livesArray = [];
        for (let i = 0; i < lives; i++) {
            livesArray.push(
                <img key={i} src={LifeImg} alt={`${lives} Life`} />
            );
        }
        return livesArray;
    };
    const timerOut = () => {
        dispatch(timeOut());
    };

    if (currentObject) {
        return (
            <div className={s.game}>
                <div className={s.header__container}>
                    <header className={s.header}>
                        <div className={s.header_left}>
                            <button
                                className={s.changePage}
                                onClick={() => goToPrepareGame()}
                            >
                                <img src={backImg} alt='Button Back' />
                            </button>
                            <div className={s.lives}>{renderLivs()}</div>
                        </div>
                        <h1>Уровень {level}</h1>
                        <div className={s.header_right}>
                            <button className={s.sound}>
                                <img src={SoundImg} alt='' />
                            </button>
                            <CountdownCircleTimer
                                key={step}
                                isPlaying={true}
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
                        <div
                            className={s.bar}
                            style={{ width: `${(step / 20) * 100}%` }}
                        ></div>
                    </div>
                </div>
                <div className={s.content}>
                    <h2
                        className={s.title}
                        style={{ color: wasCorrect ? '#229D01' : '#6252c5' }}
                    >
                        {currentObject.name}
                    </h2>
                    <div className={s.flags}>
                        {variants &&
                            variants.map((item) => {
                                return (
                                    <VarianGame
                                        key={item.id}
                                        item={item}
                                        correct={correct}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        );
    } else {
        goToPrepareGame();
    }
}

export default Game;
