import classNames from 'classnames/bind';
import styles from './ChangePasswordForm.module.scss';

import Input from '~/Components/Input/Input';
import Title from '~/Components/Title/Title';
import Button from '~/Components/Button/Button';

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
            <form method="" action="" className={cx('inner')}>
                <Title className={cx('title-login')}>Change password</Title>
                {/* <Title children={'Your password has been changed successfully'} className={cx('notification')}></Title> */}
                <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={'Enter current password'}
                    required
                ></Input>

                <Input
                    type={showPasswordNew ? 'text' : 'password'}
                    value={passwordnew}
                    onChange={(e) => setPasswordNew(e.target.value)}
                    placeholder={'Enter new password'}
                    required
                ></Input>
                <Input type={'password'} placeholder={'Confirm new password'} required></Input>

                <Button type="submit" className={cx('btn')}>
                    Change
                </Button>
                <Button to="/nest" className={cx('login')}>
                    Login
                </Button>
            </form>

            {showPassword ? (
                <FontAwesomeIcon onClick={togglePasswordVisibility} className={cx('check')} icon={faEyeLowVision} />
            ) : (
                <FontAwesomeIcon onClick={togglePasswordVisibility} className={cx('check')} icon={faEye} />
            )}

            {showPasswordNew ? (
                <FontAwesomeIcon
                    onClick={togglePasswordVisibilityNew}
                    className={cx('checknew')}
                    icon={faEyeLowVision}
                />
            ) : (
                <FontAwesomeIcon onClick={togglePasswordVisibilityNew} className={cx('checknew')} icon={faEye} />
            )}
        </div>
    );
}

export default ChangePasswordForm;
