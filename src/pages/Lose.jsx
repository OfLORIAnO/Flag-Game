import React, { useEffect, useState } from 'react';

import s from './Lose.module.scss';

import MenuImg from '../assets/menuGameOver.png';
import ReloadImg from '../assets/reloadGameOver.png';
import LoseImg from '../assets/lose.png';

import { ImgMass } from '../utils/Src';

import { useDispatch, useSelector } from 'react-redux';
import {
    resetGame,
    selectCurrentLevel,
    selectLevelList,
    setCurrentLevel,
    setLevelList,
    setStartGame,
} from '../redux/Slices/GameSlice';
import { changePage } from '../redux/Slices/PagesSlice';
import { selectAllData } from '../redux/Slices/DataSlice';

import { getLevelList } from '../utils/GameFuncs';


function Lose() {
    const dispatch = useDispatch();

    const [currentImage, setCurrentImage] = useState();
    const level = useSelector(selectCurrentLevel);
    const allItems = useSelector(selectAllData); // весь массив данных
    const levelList = useSelector(selectLevelList);

    useEffect(() => {
        setCurrentImage(ImgMass[level - 1]);
    }, []);

    const onMenuClick = () => {
        dispatch(changePage('gamePrepare'));
        dispatch(resetGame());
    };
    const onReloadlick = () => {
        dispatch(setLevelList(getLevelList(allItems, level)));
        dispatch(setCurrentLevel(level));
        dispatch(setStartGame());
        dispatch(changePage('game'));
    };

    return (
        <div className={s.lose}>
            <div className={s.main}>
                {currentImage && <img src={currentImage} alt='Level Image' />}
                <div className={s.text}>
                    <h2>Провал</h2>
                    <img src={LoseImg} alt='Lose Image' />
                </div>
            </div>
            <div className={s.control_container}>
                <div className={s.control}>
                    <button className={s.menu} onClick={() => onMenuClick()}>
                        <img src={MenuImg} alt='Menu' />
                    </button>
                    <button className={s.reload} onClick={() => onReloadlick()}>
                        <img src={ReloadImg} alt='Again' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Lose;
