import React, { useState } from 'react';
import { correctAns, incorrectAns, selectCurrentObject, selectLives } from '../redux/Slices/GameSlice';
import { useDispatch, useSelector } from 'react-redux';
import s from './FlagsVarianGame.module.scss';
function FlagsVarianGame({ item, correct, allDisabled, setWasCorrect, isTimerPlaying, setIsTimerPlaying }) {
    const dispatch = useDispatch();

    const [isInCorrect, setIsInCorrect] = useState(false);
    const currentObject = useSelector(selectCurrentObject);
    const lives = useSelector(selectLives);

    const incorrect = () => {
        dispatch(incorrectAns());
    };

    const isCorrect = (ansId) => {
        if (currentObject.id === ansId) {
            correct();
        } else {
            const lastLive = () => {
                setWasCorrect(true);
                setIsTimerPlaying(false);
            };
            setIsInCorrect(true);
            lives == 1 && lastLive();
            setTimeout(incorrect, 1000);
            // incorrect();
        }
    };

    return (
        <button
            disabled={allDisabled && item.id != currentObject.id ? true : isInCorrect}
            className={s.flag_container}
            onClick={() => isCorrect(item.id)}
        >
            <span>{item.name}</span>
            <img src={'./flagsImg/' + item.imageName} alt={'Flag Image'} />
        </button>
    );
}

export default FlagsVarianGame;
