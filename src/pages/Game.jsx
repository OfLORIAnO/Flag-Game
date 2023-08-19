import React, { useEffect, useState } from 'react';
import {
    correctAns,
    incorrectAns,
    resetGame,
    selectCurrentLevel,
    selectCurrentObject,
    selectCurrentScore,
    selectCurrentStep,
    selectLevelList,
    selectLives,
    selectMaxCurrentScore,
    setCurrentScore,
    timeOut,
} from '../redux/Slices/GameSlice';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../redux/Slices/PagesSlice';

import Header from '../components/Header';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import CapitalImg from '../assets/capital.png';
import PopulationImg from '../assets/population.png';
import backImg from '../assets/back.png';
import FlagImg from '../assets/flag.png';
import LifeImg from '../assets/life.png';
import SoundImg from '../assets/sound.png';
import { ImgMass } from '../utils/ImageSrc';
import s from './Game.module.scss';
import { formatNumber } from '../utils/FormatNumber';
import { GetVariants } from '../utils/GameFuncs';
import { selectAllData } from '../redux/Slices/DataSlice';
import FlagsVarianGame from '../components/FlagsVarianGame';

function Game() {
    const dispatch = useDispatch();
    const [variants, setVariants] = useState([]);
    const [wasCorrect, setWasCorrect] = useState(false);
    const [showGreen, setShowGreen] = useState(false);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [isTimerPlaying, setIsTimerPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState();

    const allData = useSelector(selectAllData);
    const levelList = useSelector(selectLevelList);
    const level = useSelector(selectCurrentLevel);
    const currentObject = useSelector(selectCurrentObject);
    const step = useSelector(selectCurrentStep);
    const lives = useSelector(selectLives);
    const maxCurrentScore = useSelector(selectMaxCurrentScore);
    const currentScore = useSelector(selectCurrentScore);

    const goToPrepareGame = () => {
        dispatch(resetGame());
        dispatch(changePage('gamePrepare'));
    };

    useEffect(() => {
        console.log(`${currentScore}/${maxCurrentScore}`);
    }, [maxCurrentScore, currentScore]);

    const correct = () => {
        dispatch(setCurrentScore(currentTime));
        setIsTimerPlaying(false);
        if (isLastQuestion) {
            GameWin();
            return;
        }
        const doCorrect = () => {
            dispatch(correctAns());
            !isLastQuestion && setWasCorrect(false);
            setIsTimerPlaying(true);
            setShowGreen(false);
        };
        setWasCorrect(true);
        setShowGreen(true);

        setTimeout(doCorrect, 1000);
    };
    const incorrect = () => {
        const lastLive = () => {
            setWasCorrect(true);
            setIsTimerPlaying(false);
        };
        const doIncorrect = () => {
            dispatch(incorrectAns());
        };
        lives == 1 && lastLive();
        setTimeout(doIncorrect, 1000);
    };
    const timerOut = () => {
        isLastQuestion && GameOver();
        dispatch(timeOut());
    };

    useEffect(() => {
        currentObject && setVariants(GetVariants(allData, currentObject, variants));
    }, [step]);
    useEffect(() => {
        step === levelList.length - 1 && setIsLastQuestion(true);
        isLastQuestion && GameWin();
    }, [step]);
    useEffect(() => {}, [step]);

    useEffect(() => {
        isLastQuestion && console.log('Last question');
    }, [isLastQuestion]);

    useEffect(() => {
        lives === 0 && GameOver();
    }, [lives]);

    const GameOver = () => {
        goToLosePage();
    };
    const goToLosePage = () => {
        dispatch(changePage('lose'));
    };
    const GameWin = () => {
        dispatch(changePage('win'));
    };

    const renderLivs = () => {
        const livesArray = [];
        for (let i = 0; i < lives; i++) {
            livesArray.push(<img key={i} src={LifeImg} alt={`${lives} Life`} />);
        }
        return livesArray;
    };
    const renderVariants = () => {
        return (
            variants &&
            variants.map((item) => {
                return <FlagsVarianGame allDisabled={wasCorrect} key={item.id} item={item} correct={correct} incorrect={incorrect} />;
            })
        );
    };
    return (
        <div className={s.game}>
            <div className={s.header__container}>
                <header className={s.header}>
                    <div className={s.header_left}>
                        <button className={s.changePage} onClick={() => goToPrepareGame()}>
                            <img src={backImg} alt='Button Back' />
                        </button>
                        <div className={s.lives}>{renderLivs()}</div>
                    </div>
                    <div className={s.header_center}>
                        <img src={ImgMass[level - 1]} alt='Level Icon Image' />
                        <h1>Уровень {level}</h1>
                    </div>
                    <div className={s.header_right}>
                        <button className={s.sound}>
                            {/* <img src={SoundImg} alt='' /> */}
                            {`${step} / ${levelList.length}`}
                        </button>
                        <CountdownCircleTimer
                            isPlaying={isTimerPlaying}
                            key={step}
                            size={40}
                            strokeWidth={3}
                            colors={'#fff'}
                            trailColor={'#fff'}
                            trailStrokeWidth={1}
                            duration={20}
                            onComplete={() => timerOut()}
                            onUpdate={(remainingTime) => setCurrentTime(remainingTime)}
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                </header>
            </div>

            <div className={s.info}>
                <div className={s.capital}>
                    <img src={CapitalImg} alt='Capital Icon' />
                    <span>{currentObject.capital}</span>
                </div>
                <div className={s.population}>
                    <span>{formatNumber(currentObject.population)}</span>
                    <img src={PopulationImg} alt='Population Icon' />
                </div>
            </div>
            <div className={s.progress}>
                <div className={s.out}>
                    <div className={s.bar} style={{ width: `${(step / 20) * 100}%` }}></div>
                </div>
            </div>
            <div className={s.content}>
                <h2 className={s.title} style={{ color: showGreen ? '#229D01' : '#6252c5' }}>
                    {currentObject.name}
                </h2>
                <div className={s.flags}>{renderVariants()}</div>
            </div>
        </div>
    );
}

export default Game;
