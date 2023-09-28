import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';
import Input from '~/Components/Input/Input';
import Title from '~/Components/Title/Title';
import googleLogo from '~/Assets/image/Logo/Google.png';
import styles from '~/Pages/UserLogin/UserLogin.module.scss';
import Line from '~/Components/Line/Line';
import { useEffect, useState } from 'react';
import LoginAPI from '~/Api/LoginAPI';

const cx = classNames.bind(styles);

function UserLogin() {
    const [loginStatus, setLoginStatus] = useState(false);

    const handleLoginStatus = async () => {
        setLoginStatus(true);
        console.log('click');
    };

    useEffect(() => {
        const logins = async () => {
            try {
                const data = {
                    email: 'lehuucuong270603333331@gmail.com',
                    password: '123456',
                };
                const login = await LoginAPI.add(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (loginStatus) {
            logins();
        }
    }, [loginStatus]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('inner')}>
                    <div className={cx('login-title-container')}>
                        <Title className={cx('login-title')}>Login here.</Title>
                    </div>
                    <div className={cx('notification-container')}>
                        {/* <div className={cx('notification')}>
                            <Title children={'Wrong username or password'}></Title>
                        </div> */}
                    </div>

                    <div className={cx('inner-input')}>
                        <Input placeholder="Username"></Input>
                        <Line></Line>
                        <Input type={'password'} placeholder="Password"></Input>
                        <Line></Line>
                    </div>

                    <div className={cx('checkbox-section')}>
                        <div className={cx('section-remember')}>
                            <input type="checkbox"></input>
                            <div className={cx('remember')}>
                                <p>Remember me</p>
                            </div>
                        </div>

                        <Button className={cx('forgot')}>Forgot password</Button>
                    </div>

                    <Button classname={cx('login-btn')} loginSystemBtn onClick={() => handleLoginStatus()}>
                        Login
                    </Button>
                    <Title className={cx('google-title')}>Or use your account</Title>
                    <Button className={cx('google')}>
                        <img src={googleLogo} />
                    </Button>
                </div>

                <div className={cx('register')}>
                    <div className={cx('register-title-container')}>
                        <Title className={cx('register-title')}>Welcome to my bird farm shop</Title>
                    </div>
                    <Button loginSystemBtn className={cx('register-btn')}>
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
