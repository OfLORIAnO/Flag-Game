import React from 'react';
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

export default function GamePrepare() {
    return (
        <>
            <Header title={'Игра'} imgSource={FlagImg} moveTo={'home'} />
            <h2 className={s.title}>Выберите сложность</h2>
            <div className={s.wrapper}>
                <GameLevel disabledStatus={false} imageSrc={ChildImg} title={'Ребёнок'} level={1} />
                <GameLevel disabledStatus={true} imageSrc={StudentImg} title={'Студент'} level={2} />
                <GameLevel disabledStatus={true} imageSrc={TeacherImg} title={'Учитель'} level={3} />
                <GameLevel disabledStatus={true} imageSrc={JournalistImg} title={'Журналист'} level={4} />
                <GameLevel disabledStatus={true} imageSrc={AdventureImg} title={'Авантюрист'} level={5} />
                <GameLevel disabledStatus={true} imageSrc={TravelerImg} title={'Путешественник'} level={6} />
                <GameLevel disabledStatus={true} imageSrc={AmbassadorImg} title={'Посол'} level={7} />
                <GameLevel disabledStatus={true} imageSrc={GeographerImg} title={'Географ'} level={8} />
                <GameLevel disabledStatus={true} imageSrc={StudentImg} title={'Посол'} level={9} />
                <GameLevel disabledStatus={true} imageSrc={CaptainImg} title={'Капитан'} level={10} />
                <GameLevel disabledStatus={true} imageSrc={PresidentImg} title={'Президент'} level={11} />
                <GameLevel disabledStatus={true} imageSrc={AlienImg} title={'Инопланетянин'} level={12} />
            </div>
        </>
    );
}
