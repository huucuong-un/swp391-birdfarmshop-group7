import classNames from 'classnames/bind';
import styles from './ChangePasswordForm.module.scss';

import Input from '~/Components/Input/Input';
import Title from '~/Components/Title/Title';
import Button from '~/Components/Button/Button';
import Line from '~/Components/Line/Line';

//hook
import { useState } from 'react';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeLowVision, faEye } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ChangePasswordForm() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [passwordnew, setPasswordNew] = useState('');
    const [showPasswordNew, setShowPasswordNew] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibilityNew = () => {
        setShowPasswordNew(!showPasswordNew);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form method="" action="" className={cx('inner')}>
                    <Title className={cx('title-login')}>Change password</Title>
                    <div className={cx('notification-container')}>
                        <div className={cx('notification')}>
                            <Title children={'Your password has been changed successfully'}></Title>
                        </div>
                    </div>

                    <div className={cx('password-container')}>
                        <div className={cx('input-line')}>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={'Enter current password'}
                                required
                            ></Input>
                            <Line></Line>
                        </div>
                        <i className={cx('check')}>
                            {showPassword ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibility} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibility} icon={faEye} />
                            )}
                        </i>
                    </div>

                    <div className={cx('password-container')}>
                        <div className={cx('input-line')}>
                            <Input
                                type={showPasswordNew ? 'text' : 'password'}
                                value={passwordnew}
                                onChange={(e) => setPasswordNew(e.target.value)}
                                placeholder={'Enter new password'}
                                required
                            ></Input>
                            <Line></Line>
                        </div>
                        <i className={cx('check')}>
                            {showPasswordNew ? (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityNew} icon={faEyeLowVision} />
                            ) : (
                                <FontAwesomeIcon onClick={togglePasswordVisibilityNew} icon={faEye} />
                            )}
                        </i>
                    </div>
                    <div className={cx('password-container')}>
                        <div className={cx('input-line')}>
                            <Input type={'password'} placeholder={'Confirm new password'} required></Input>
                            <Line></Line>
                        </div>
                    </div>

                    <div className={cx('change-btn')}>
                        <Button type="submit" loginSystemBtn>
                            Change
                        </Button>
                    </div>

                    <Button to="/nest" className={cx('login-btn')}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordForm;
