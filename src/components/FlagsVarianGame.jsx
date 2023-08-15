import React, { useState } from 'react';
import { selectCurrentObject } from '../redux/Slices/GameSlice';
import s from './FlagsVarianGame.module.scss';
import { useSelector } from 'react-redux';
function FlagsVarianGame({ item, correct, incorrect, allDisabled }) {
    const [isInCorrect, setIsInCorrect] = useState(false);
    const currentObject = useSelector(selectCurrentObject);

    const isCorrect = (ansId) => {
        if (currentObject.id === ansId) {
            correct();
        } else {
            setIsInCorrect(true);
            incorrect();
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
