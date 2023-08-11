import React from 'react';
import Header from '../components/Header';

import FlagHeaderImg from '../assets/flagMain.png';
import PlayImg from '../assets/Play.png';
import FlagImg from '../assets/flag.png';
import StarImg from '../assets/Star.png';
import ProfileImg from '../assets/Profile.png';

import s from './Home.module.scss';
import HomeRouters from '../components/HomeRouters';
function Home() {
    return (
        <>
            <Header title='Флаги' imgSource={FlagHeaderImg} isActive={false} />
            <div className={s.wrapper}>
                <HomeRouters title='Начать игру' imageSrc={PlayImg} MoveTo={""}/>
                <HomeRouters title='Все флаги' imageSrc={FlagImg} MoveTo={"flagInfo"}/>
                <HomeRouters title='Система оценивания' imageSrc={StarImg} MoveTo={""}/>
                <HomeRouters title='Профиль' imageSrc={ProfileImg} MoveTo={""}/>
            </div>
        </>
    );
}

export default Home;
