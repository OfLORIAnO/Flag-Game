import React from 'react';
import {
    correctAns,
    resetGame,
    selectCurrentLevel,
    selectCurrentObject,
    selectLevelList,
} from '../redux/Slices/GameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../redux/Slices/PagesSlice';

import Header from '../components/Header';

import s from './Game.module.scss';

import backImg from '../assets/back.png';
import FlagImg from '../assets/flag.png';

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
    if (currentObject) {
        return (
            <div className={s.game}>
                <header>
                    <div className={s.container}>
                        <button
                            className={s.changePage}
                            onClick={() => goToPrepareGame()}
                        >
                            <img src={backImg} alt='Button Back' />
                        </button>
                        <div className={s.content}>
                            <img src={FlagImg} alt='FlagImg' />
                            <h1>{'Игра'}</h1>
                        </div>
                    </div>
                </header>
                <h1>level: {level}</h1>
                <h1>
                    <img
                        src={'./flagsImg/' + currentObject.imageName}
                        alt='Flag Image'
                    />
                </h1>
                <h1>{currentObject && currentObject.name}</h1>
                <h1>
                    {levelList.length && levelList.indexOf(currentObject) + 1}
                    /20
                </h1>
                <button onClick={() => correct()}>Следующий вопрос</button>
            </div>
        );
    }
}

export default Game;
