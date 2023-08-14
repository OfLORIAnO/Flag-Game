import React, { useState } from 'react';
import {
    correctAns,
    incorrectAns,
    selectCurrentObject,
} from '../redux/Slices/GameSlice';
import { useDispatch, useSelector } from 'react-redux';
import s from './VarianGame.module.scss';
function VarianGame({ item, correct }) {
    const dispatch = useDispatch();

    const [isInCorrect, setIsInCorrect] = useState(false);
    const currentObject = useSelector(selectCurrentObject);

    const incorrect = () => {
        dispatch(incorrectAns());
    };

    const isCorrect = (ansId) => {
        if (currentObject.id === ansId) {
            correct();
        } else {
            setIsInCorrect(true);
            setTimeout(incorrect, 1000);
            // incorrect();
        }
    };

    return (
        <button
            disabled={isInCorrect}
            className={s.flag_container}
            onClick={() => isCorrect(item.id)}
        >
            <span>{item.name}</span>
            <img src={'./flagsImg/' + item.imageName} alt={'Flag Image'} />
        </button>
    );
}

export default VarianGame;
