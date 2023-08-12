import React from 'react';
import Header from '../components/Header';
import GameLevel from '../components/GameLevel';

import FlagImg from '../assets/flag.png';
import ChildImg from '../assets/child.png';
import StudentImg from '../assets/student.png'

import s from './GamePrepare.module.scss';
export default function GamePrepare() {
    return (
        <>
            <Header title={'Игра'} imgSource={FlagImg} moveTo={'home'} />
            <h2 className={s.title}>Выберите сложность</h2>
            <div className={s.wrapper}>
                <GameLevel imageSrc={ChildImg} title={'Ребёнок'} level={0} />
                <GameLevel imageSrc={StudentImg} title={'Студент'} level={1} />
            </div>
        </>
    );
}
