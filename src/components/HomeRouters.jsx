import React from 'react';
import s from './HomeRouters.module.scss';
import GoToImg from '../assets/GoTo.png';
import { useDispatch } from 'react-redux';
import { changePage } from '../redux/Slices/PagesSlice';
export default function HomeRouters({ imageSrc, title, MoveTo }) {
    const displatch = useDispatch();
    return (
        <button className={s.route}
        onClick={() => displatch(changePage(MoveTo))}>
            <img src={imageSrc} alt='Play Image' className={s.img_Main} />
            <h2>{title}</h2>
            <div className={s.img_rigth}>
                <img src={GoToImg} alt='Image GoTo' className='' />
            </div>
        </button>
    );
}
