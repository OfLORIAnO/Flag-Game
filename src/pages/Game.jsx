import React, { useEffect } from 'react';
import {
    correctAns,
    resetGame,
    selectCurrentLevel,
    selectCurrentObject,
    selectCurrentStep,
    selectLevelList,
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
import { current } from '@reduxjs/toolkit';

function Game() {
    const dispatch = useDispatch();
    const goToPrepareGame = () => {
        dispatch(resetGame());
        dispatch(changePage('gamePrepare'));
    };
    const correct = () => {
        dispatch(correctAns());
    };

    const levelList = useSelector(selectLevelList);
    const level = useSelector(selectCurrentLevel);
    const currentObject = useSelector(selectCurrentObject);
    const step = useSelector(selectCurrentStep);

    const itilsItems = () => {
        return (
            <>
                <img
                    src={'./flagsImg/' + currentObject.imageName}
                    alt='Flag Image'
                />
                <h1>
                    {levelList.length && levelList.indexOf(currentObject) + 1}
                    /20
                </h1>
                <button>Следующий вопрос</button>
            </>
        );
    };

    if (currentObject) {
        return (
            <div className={s.game}>
                <header className={s.header}>
                    <div className={s.header_left}>
                        <button
                            className={s.changePage}
                            onClick={() => goToPrepareGame()}
                        >
                            <img src={backImg} alt='Button Back' />
                        </button>
                        <div className={s.lives}>
                            <img src={LifeImg} alt='1 life' />
                            <img src={LifeImg} alt='2 life' />
                            <img src={LifeImg} alt='3 life' />
                        </div>
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
                            onComplete={() => console.log('Время вышло')}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                </header>
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
                <div className={s.content}>
                    <h2 className={s.title}>{currentObject.name}</h2>
                    <div className={s.flags}>
                        <button
                            className={s.flag_container}
                            onClick={() => correct()}
                        >
                            <img
                                src={'./flagsImg/' + currentObject.imageName}
                                alt={'Flag Image'}
                            />
                        </button>
                        <button
                            className={s.flag_container}
                            onClick={() => correct()}
                        >
                            <img
                                src={'./flagsImg/' + currentObject.imageName}
                                alt={'Flag Image'}
                            />
                        </button>
                        <button
                            className={s.flag_container}
                            onClick={() => correct()}
                        >
                            <img
                                src={'./flagsImg/' + currentObject.imageName}
                                alt={'Flag Image'}
                            />
                        </button>
                        <button
                            className={s.flag_container}
                            onClick={() => correct()}
                        >
                            <img
                                src={'./flagsImg/' + currentObject.imageName}
                                alt={'Flag Image'}
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;
