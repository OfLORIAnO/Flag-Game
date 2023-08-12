import React from 'react';
import Header from '../components/Header';
import s from './Profile.module.scss';
import ProfileImg from '../assets/profile.png';
import starImg from '../assets/Star.png';
function Profile() {
    return (
        <>
            <Header title={'Профиль'} imgSource={ProfileImg} moveTo={'home'} />
            <div className={s.wrapper}>
                <div className={s.content}>
                    <div className={s.score}>
                        <img src={starImg} alt='Star Image' />
                        <div className={s.text}>
                            <h2>Всего очков заработано</h2>
                            <span>432</span>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Profile;
