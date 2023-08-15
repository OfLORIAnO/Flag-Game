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

import { selectPlayerData } from '../redux/Slices/PlayerSlice';
import { useSelector } from 'react-redux';

export default function GamePrepare() {
    const PlayerData = useSelector(selectPlayerData);
    const [allScore, setAllScore] = useState([]);
    const [flagLevel, setFlagLevel] = useState(0);
    useEffect(() => {
        setAllScore(PlayerData.flag.score);
        setFlagLevel(PlayerData.flag.currentLevel);
    }, [PlayerData]);
    useEffect(() => {
        console.log(allScore);
    }, [allScore]);
    return (
        <>
            <Header title={'Игра'} imgSource={FlagImg} moveTo={'home'} />
            <h2 className={s.title}>Выберите сложность</h2>
            <div className={s.wrapper}>
                <GameLevel disabledStatus={flagLevel < 1} imageSrc={ChildImg} title={'Ребёнок'} level={1} maxScore={allScore[0]} />
                <GameLevel disabledStatus={flagLevel < 2} imageSrc={StudentImg} title={'Студент'} level={2} maxScore={allScore[1]} />
                <GameLevel disabledStatus={flagLevel < 3} imageSrc={TeacherImg} title={'Учитель'} level={3} maxScore={allScore[2]} />
                <GameLevel disabledStatus={flagLevel < 4} imageSrc={JournalistImg} title={'Журналист'} level={4} maxScore={allScore[3]} />
                <GameLevel disabledStatus={flagLevel < 5} imageSrc={AdventureImg} title={'Авантюрист'} level={5} maxScore={allScore[4]} />
                <GameLevel disabledStatus={flagLevel < 6} imageSrc={TravelerImg} title={'Путешественник'} level={6} maxScore={allScore[5]} />
                <GameLevel disabledStatus={flagLevel < 7} imageSrc={AmbassadorImg} title={'Посол'} level={7} maxScore={allScore[6]} />
                <GameLevel disabledStatus={flagLevel < 8} imageSrc={GeographerImg} title={'Географ'} level={8} maxScore={allScore[7]} />
                <GameLevel disabledStatus={flagLevel < 9} imageSrc={StudentImg} title={'Посол'} level={9} maxScore={allScore[8]} />
                <GameLevel disabledStatus={flagLevel < 10} imageSrc={CaptainImg} title={'Капитан'} level={10} maxScore={allScore[9]} />
                <GameLevel disabledStatus={flagLevel < 11} imageSrc={PresidentImg} title={'Президент'} level={11} maxScore={allScore[10]} />
                <GameLevel disabledStatus={flagLevel < 12} imageSrc={AlienImg} title={'Инопланетянин'} level={12} maxScore={allScore[11]} />
            </div>
        </>
    );
}
