import React, { useEffect } from 'react';
import s from './Search.module.scss';
import imgSearch from '../assets/search.png';
import imgCross from '../assets/cross.png';
import { useDispatch, useSelector } from 'react-redux';
import { filterData, selectFiltered } from '../redux/Slices/DataSlice';

function Search() {
    const [searchInputValue, setsearchInputValue] = React.useState('');
    const filterValue = useSelector(selectFiltered);
    const SetSearchValue = (text) => {
        dispatch(filterData(text));
        setsearchInputValue(text);
    };

    const cleanSearchValue = () => {
        dispatch(filterData(''));
        setsearchInputValue('');
    };

    const dispatch = useDispatch();
    return (
        <div className={s.container}>
            <button>
                <img src={imgSearch} alt='SearchImg' />
            </button>
            <input type='text' value={searchInputValue} placeholder='Поиск по стране или столице' onChange={(e) => SetSearchValue(e.target.value)} />
            {filterValue.length > 0 && (
                <button onClick={() => cleanSearchValue()}>
                    <img src={imgCross} alt='Clear search' />
                </button>
            )}
        </div>
    );
}

export default Search;
