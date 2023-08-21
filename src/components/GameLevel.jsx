import React, { useState } from 'react';
import s from './GameLevel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectLevelList, setCurrentLevel, setLevelList, setMaxCurrentScore, setStartGame } from '../redux/Slices/GameSlice';
import { changePage } from '../redux/Slices/PagesSlice';
import { selectAllData } from '../redux/Slices/DataSlice';
import { getLevelList } from '../utils/GameFuncs';
import { selectFlagMaxLevel, selectFlagScores } from '../redux/Slices/PlayerSlice';
import { ImgMass } from '../utils/Sources';
import { levelName } from '../utils/Sources';
function GameLevel({ value }) {
    const dispatch = useDispatch();
    const dataCurrentLevel = useSelector(selectFlagMaxLevel);
    const allItems = useSelector(selectAllData); // весь массив данных
    const FlagScores = useSelector(selectFlagScores)[value - 1];

    const disabledStatus = dataCurrentLevel < value;
    const Image = ImgMass[value - 1];
    const title = levelName[value - 1];

    const startGame = () => {
        dispatch(setLevelList(getLevelList(allItems, value)));
        dispatch(setCurrentLevel(value));
        dispatch(setMaxCurrentScore(FlagScores.max));
        dispatch(setStartGame());
        dispatch(changePage('game'));
    };

    return (
        <button disabled={disabledStatus} className={s.gameLevel} onClick={() => startGame()}>
            <div className={s.image}>
                <img src={Image} alt='Image' />
            </div>
            <div className={s.text}>
                <h3>{title}</h3>
                {!disabledStatus && <span className={s.score}>{FlagScores && `${FlagScores.current}/${FlagScores.max}`}</span>}
            </div>
        </button>
    );
}

export default GameLevel;
