import React from 'react';
import s from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { changePage } from '../redux/Slices/PagesSlice';
import backImg from '../assets/back.png';
function Header({ title, imgSource, moveTo }) {
    const dispatch = useDispatch();
    return (
        <div className={s.container}>
            {moveTo && (
                <button
                    className={s.changePage}
                    onClick={() => dispatch(changePage(moveTo))}
                >
                    <img src={backImg} alt='Button Back' />
                </button>
            )}

            <div className={s.content}>
                {imgSource && <img src={imgSource} alt='FlagImg' />}
                <h1>{title}</h1>
            </div>
        </div>
    );
}

export default Header;
