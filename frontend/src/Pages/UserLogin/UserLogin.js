import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';
import Input from '~/Components/Input/Input';
import Title from '~/Components/Title/Title';
import googleLogo from '~/Assets/image/Logo/Google.png';
import styles from '~/Pages/UserLogin/UserLogin.module.scss';
import Line from '~/Components/Line/Line';

const cx = classNames.bind(styles);

function UserLogin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form className={cx('inner')}>
                    <Title className={cx('login-title')}>Login here.</Title>

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

                    <Button classname={cx('login-btn')} loginSystemBtn>
                        Login
                    </Button>
                    <Title className={cx('google-title')}>Or use your account</Title>
                    <Button className={cx('google')}>
                        <img src={googleLogo} />
                    </Button>
                </form>

                <div className={cx('register')}>
                    <Title className={cx('register-title')}>Welcome to my bird farm shop</Title>
                    <Button loginSystemBtn>Register</Button>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
