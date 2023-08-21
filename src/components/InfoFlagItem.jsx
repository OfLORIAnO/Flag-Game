import React from 'react';
import s from './InfoFlagItem.module.scss';
import { formatNumber } from '../utils/FormatNumber';
import '/node_modules/flag-icons/css/flag-icons.min.css';

function InfoFlagItem({ item }) {
    let ImageLink = `fi fi-${item.imageName}`;
    return (
        <>
            <div className={s.items_container}>
                <div className={s.item}>
                    <div className={s.img_container}>
                        {/* <img
                            src={'./flagsImg/' + item.imageName}
                            alt={item.name}
                        /> */}
                        <span className={ImageLink}></span>
                    </div>

                    <div className={s.info}>
                        <h2>
                            Страна: <span>{item.name}</span>
                        </h2>
                        <h2>
                            Столица: <span>{item.capital}</span>
                        </h2>
                        <h2>
                            Население: <span>{formatNumber(item.population)}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoFlagItem;
