import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import GameLevel from '../components/GameLevel';

import FlagImg from '../assets/flag.png';
import ChildImg from '../assets/child.png';
import StudentImg from '../assets/student.png';
import TeacherImg from '../assets/teacher.png';
import JournalistImg from '../assets/journalist.png';
import AdventureImg from '../assets/adventure.png';
import TravelerImg from '../assets/traveler.png';
import AmbassadorImg from '../assets/businessman.png';
import GeographerImg from '../assets/geographer.png';
import CaptainImg from '../assets/captain.png';
import PresidentImg from '../assets/president.png';
import AlienImg from '../assets/alien.png';

import s from './GamePrepare.module.scss';

import { selectFlagMaxLevel, selectFlagScores, selectPlayerData } from '../redux/Slices/PlayerSlice';
import { useSelector } from 'react-redux';

export default function GamePrepare() {
    const PlayerData = useSelector(selectPlayerData);
    const [allScore, setAllScore] = useState([]);
    const dataCurrentLevel = useSelector(selectFlagMaxLevel);
    const FlagScores = useSelector(selectFlagScores);
    useEffect(() => {
        setAllScore(PlayerData.flag.score);
    }, [PlayerData]);
    return (
        <>
            <Header title={'Игра'} imgSource={FlagImg} moveTo={'home'} />
            <h2 className={s.title}>Выберите сложность</h2>
            <div className={s.wrapper}>
                <GameLevel disabledStatus={dataCurrentLevel < 1} imageSrc={ChildImg} title={'Ребёнок'} level={1} maxScore={FlagScores[0]} />
                <GameLevel disabledStatus={dataCurrentLevel < 2} imageSrc={StudentImg} title={'Студент'} level={2} maxScore={FlagScores[1]} />
                <GameLevel disabledStatus={dataCurrentLevel < 3} imageSrc={TeacherImg} title={'Учитель'} level={3} maxScore={FlagScores[2]} />
                <GameLevel disabledStatus={dataCurrentLevel < 4} imageSrc={JournalistImg} title={'Журналист'} level={4} maxScore={FlagScores[3]} />
                <GameLevel disabledStatus={dataCurrentLevel < 5} imageSrc={AdventureImg} title={'Авантюрист'} level={5} maxScore={FlagScores[4]} />
                <GameLevel disabledStatus={dataCurrentLevel < 6} imageSrc={TravelerImg} title={'Путешественник'} level={6} maxScore={FlagScores[5]} />
                <GameLevel disabledStatus={dataCurrentLevel < 7} imageSrc={AmbassadorImg} title={'Посол'} level={7} maxScore={FlagScores[6]} />
                <GameLevel disabledStatus={dataCurrentLevel < 8} imageSrc={GeographerImg} title={'Географ'} level={8} maxScore={FlagScores[7]} />
                <GameLevel disabledStatus={dataCurrentLevel < 9} imageSrc={StudentImg} title={'Посол'} level={9} maxScore={FlagScores[8]} />
                <GameLevel disabledStatus={dataCurrentLevel < 10} imageSrc={CaptainImg} title={'Капитан'} level={10} maxScore={FlagScores[9]} />
                <GameLevel disabledStatus={dataCurrentLevel < 11} imageSrc={PresidentImg} title={'Президент'} level={11} maxScore={FlagScores[10]} />
                <GameLevel disabledStatus={dataCurrentLevel < 12} imageSrc={AlienImg} title={'Инопланетянин'} level={12} maxScore={FlagScores[11]} />
            </div>
        </>
    );
}
