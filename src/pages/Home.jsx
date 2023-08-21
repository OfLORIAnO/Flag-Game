import React    from 'react';
import Header from '../components/Header';

import FlagHeaderImg from '../assets/flagMain.png';
import PlayImg from '../assets/Play.png';
import FlagImg from '../assets/flag.png';
import ProfileImg from '../assets/Profile.png';

import s from './Home.module.scss';
import HomeRouters from '../components/HomeRouters';
function Home() {
    return (
        <>
            <Header title='Флаги' imgSource={FlagHeaderImg} />
            <div className={s.wrapper}>
                <HomeRouters title='Начать игру' imageSrc={PlayImg} MoveTo={'gamePrepare'} />
                <HomeRouters title='Все флаги' imageSrc={FlagImg} MoveTo={'flagInfo'} />
                <HomeRouters title='Профиль' imageSrc={ProfileImg} MoveTo={'profile'} />
            </div>
        </>
    );
}

export default Home;
