import classNames from 'classnames/bind';
import styles from './SystemLogin.module.scss';
import Title from '~/Components/Title/Title';
import Line from '~/Components/Line/Line';
import Input from '~/Components/Input/Input';
import Button from '~/Components/Button/Button';
const cx = classNames.bind(styles);

function SystemLogin() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form action="" method="" className={cx('inner')}>
                    <Title className={cx('title')}>Login</Title>
                    <div className={cx('notification-container')}>
                        {/* <div className={cx('notification')}>
                            <Title children={'Wrong username or password'}></Title>
                        </div> */}
                    </div>

                    <div className={cx('login-form')}>
                        <Input placeholder={'Username'}></Input>
                        <Line></Line>
                        <Input placeholder={'Password'} required type={'password'}></Input>
                        <Line></Line>
                    </div>
                    <Button type="submit" className={cx('btn')}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SystemLogin;
