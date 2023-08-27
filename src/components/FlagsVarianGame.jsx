import React, { useEffect, useState } from 'react';
import {
    selectCurrentObject,
    selectLastLevel,
    setLastLevel,
} from '../redux/Slices/GameSlice';
import s from './FlagsVarianGame.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import '/node_modules/flag-icons/css/flag-icons.min.css';
function FlagsVarianGame({ item, correct, incorrect, allDisabled }) {
    const dispatch = useDispatch();
    const lastLevel = useSelector(selectLastLevel);
    const [isInCorrect, setIsInCorrect] = useState(false);
    const [disabledState, setDisabledState] = useState(false);
    const currentObject = useSelector(selectCurrentObject);
    const step = useSelector((state) => state.gameStore.currentStep);
    let ImageLink = `fi fi-${item.imageName}`;

    const isCorrect = (ansId) => {
        if (currentObject.id === ansId) {
            dispatch(setLastLevel(currentObject));
            correct();
            setIsInCorrect(false);
        } else {
            setIsInCorrect(true);
            incorrect();
        }
    };
    useEffect(() => {
        if (lastLevel) {
            if (currentObject.id == lastLevel.id) {
                setIsInCorrect(false);
            }
        }
    }, [lastLevel]);
    useEffect(() => {
        if (allDisabled === true) {
            if (item.id !== currentObject.id) {
                setDisabledState(true);
            } else {
                setDisabledState(false);
            }
        } else {
            setDisabledState(isInCorrect);
        }
    }, [isInCorrect, allDisabled, item]);
    return (
        <button
            disabled={disabledState}
            className={s.flag_container}
            onClick={() => isCorrect(item.id)}
        >
            <h2 className={s.title}>{item.name}</h2>
            <span className={ImageLink}></span>
        </button>
    );
}

export default FlagsVarianGame;
