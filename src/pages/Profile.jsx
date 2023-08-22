import React from 'react';
import Header from '../components/Header';
import s from './Profile.module.scss';
import ProfileImg from '../assets/Profile.png';
import StarImg from '../assets/Star.png';
import RewardImg from '../assets/reward.png';
import { useSelector } from 'react-redux';
import { selectTotalProgress, selectTotalScore, selectTotalScoreOf } from '../redux/Slices/PlayerSlice';
function Profile() {
    const totalScore = useSelector(selectTotalScore);
    const totalScoreMax = useSelector(selectTotalScoreOf);
    const totalProgress = useSelector(selectTotalProgress);
    return (
        <>
            <Header title={'Профиль'} imgSource={ProfileImg} moveTo={'home'} />
            <div className={s.wrapper}>
                <div className={s.content}>
                    <div>
                        <img src={StarImg} alt='Star Image' />
                        <div className={s.text}>
                            <h2>Всего очков заработано</h2>
                            <span>
                                {totalScore}/{totalScoreMax}
                            </span>
                        </div>
                    </div>
                    <div className={s.progress}>
                        <img src={RewardImg} alt='Progress Image' />
                        <div className={s.text}>
                            <h2>Уровней пройдено</h2>
                            <span>{totalProgress}/12</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
