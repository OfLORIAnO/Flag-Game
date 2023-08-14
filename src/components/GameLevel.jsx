import React from 'react';
import s from './GameLevel.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectLevelList, setCurrentLevel, setLevelList, setStartGame } from '../redux/Slices/GameSlice';
import { changePage } from '../redux/Slices/PagesSlice';
import { selectAllData } from '../redux/Slices/DataSlice';
import { getLevelList } from '../utils/GameFuncs';
function GameLevel({ imageSrc, level, title, disabledStatus }) {
    const dispatch = useDispatch();
    const allItems = useSelector(selectAllData); // весь массив данных
    const levelList = useSelector(selectLevelList);
    const startGame = () => {
        dispatch(setLevelList(getLevelList(allItems, level)));
        dispatch(setCurrentLevel(level));
        dispatch(setStartGame());
        dispatch(changePage('game'));
    };

    return (
        <button disabled={disabledStatus} className={s.gameLevel} onClick={() => startGame()}>
            <div className={s.image}>
                <img src={imageSrc} alt='Image' />
            </div>
            <div className={s.text}>
                <h3>{title}</h3>
                <span className={s.score}>512/680</span>
            </div>
        </button>
    );
}

export default GameLevel;
