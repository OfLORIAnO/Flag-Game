import React from 'react';
import s from './GameLevel.module.scss';
function GameLevel({ imageSrc, level, title }) {
    return (
        <div className={s.gameLevel}>
            <div className={s.image}>
                <img src={imageSrc} alt='Image' />
            </div>
            <div className={s.text}>
                <h3>{title}</h3>
                <span className={s.score}>512/680</span>
            </div>
        </div>
    );
}

export default GameLevel;
