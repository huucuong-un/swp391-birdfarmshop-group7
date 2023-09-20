import classNames from 'classnames/bind';
import styles from './SystemLogin.module.scss';
import Title from '~/Components/Title/Title';
import Input from '~/Components/Input/Input';
import Button from '~/Components/Button/Button';
const cx = classNames.bind(styles);

function SystemLogin() {
    return (
        <div className={cx('wrapper')}>
            <form action="" method="" className={cx('inner')}>
                <Title className={cx('title')}>Login</Title>
                <div className={cx('login-form')}>
                    <Input placeholder={'Username'}></Input>
                    <Input placeholder={'Password'} required type={'password'}></Input>
                </div>
                <Button type="submit" className={cx('btn')}>
                    Login
                </Button>
            </form>
        </div>
    );
}

export default SystemLogin;
