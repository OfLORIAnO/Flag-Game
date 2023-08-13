import React from 'react';
import s from './InfoFlagItem.module.scss';
import { formatNumber } from '../utils/FormatNumber';

function InfoFlagItem({ item }) {
    return (
        <>
            <div className={s.items_container}>
                <div className={s.item}>
                    <div className={s.img_container}>
                        <img
                            src={'./flagsImg/' + item.imageName}
                            alt={item.name}
                        />
                    </div>

                    <div className={s.info}>
                        <h2>
                            Страна: <span>{item.name}</span>
                        </h2>
                        <h2>
                            Столица: <span>{item.capital}</span>
                        </h2>
                        <h2>
                            Население:{' '}
                            <span>{formatNumber(item.population)}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoFlagItem;
