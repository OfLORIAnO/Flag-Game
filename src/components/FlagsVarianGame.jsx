import React, { useState } from 'react';
import { selectCurrentObject } from '../redux/Slices/GameSlice';
import s from './FlagsVarianGame.module.scss';
import { useSelector } from 'react-redux';
import '/node_modules/flag-icons/css/flag-icons.min.css';
function FlagsVarianGame({ item, correct, incorrect, allDisabled }) {
    const [isInCorrect, setIsInCorrect] = useState(false);
    const currentObject = useSelector(selectCurrentObject);
    let ImageLink = `fi fi-${item.imageName}`;

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
            <h2 className={s.title}>{item.name}</h2>
            {/* <img src={'./flagsImg/' + item.imageName} alt={'Flag Image'} /> */}
            <span className={ImageLink}></span>
        </button>
    );
}

export default FlagsVarianGame;
