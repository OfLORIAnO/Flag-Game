import React, { useEffect } from 'react';
import FlagImg from '../assets/flag.png';
import Header from '../components/Header';
import s from './FlagInfo.module.scss';
import Search from '../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
    filterData,
    selectAllData,
    selectFiltered,
} from '../redux/Slices/DataSlice';
import InfoFlagItem from '../components/InfoFlagItem';
function FlagInfo() {
    const data = useSelector(selectAllData);
    const filterValue = useSelector(selectFiltered);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filterData(''));
    }, []);
    const renderData = () => {
        if (filterValue) {
            return data
                .filter((item) => {
                    if (
                        item.name
                            .toLowerCase()
                            .includes(filterValue.toLowerCase()) ||
                        item.capital
                            .toLowerCase()
                            .includes(filterValue.toLowerCase())
                    ) {
                        return true;
                    }
                    return false;
                })
                .map((item) => <InfoFlagItem item={item} key={item.id} />);
        } else {
            return data.map((item) => (
                <InfoFlagItem item={item} key={item.id} />
            ));
        }
    };

    return (
        <>
            <Header title={'Все флаги'} imgSource={FlagImg} moveTo={'home'} />
            {/* {data.map((item) => (
                <span>
                    {item.id} - {item.name},
                </span>
            ))} */}
            <div className={s.wrapper}>
                <Search />
                <div className={s.items_wrapper}>{renderData()}</div>
            </div>
        </>
    );
}

export default FlagInfo;
