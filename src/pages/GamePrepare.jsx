import React from 'react';
import Header from '../components/Header';
import GameLevel from '../components/GameLevel';

import FlagImg from '../assets/flag.png';

import s from './GamePrepare.module.scss';

export default function GamePrepare() {
    return (
        <>
            <Header title={'Игра'} imgSource={FlagImg} moveTo={'home'} />
            <h2 className={s.title}>Выберите сложность</h2>
            <div className={s.wrapper}>
                <GameLevel key={1} value={1} />
                <GameLevel key={2} value={2} />
                <GameLevel key={3} value={3} />
                <GameLevel key={4} value={4} />
                <GameLevel key={5} value={5} />
                <GameLevel key={6} value={6} />
                <GameLevel key={7} value={7} />
                <GameLevel key={8} value={8} />
                <GameLevel key={9} value={9} />
                <GameLevel key={10} value={10} />
                <GameLevel key={11} value={11} />
                <GameLevel key={12} value={12} />
            </div>
        </>
    );
}
