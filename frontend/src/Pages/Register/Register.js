import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Input from '~/Components/Input/Input';
import Line from '~/Components/Line/Line';
import Title from '~/Components/Title/Title';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <form className={cx('inner')}>
                    <div className={cx('input-container')}>
                        <Input placeholder="Username"></Input>
                        <Line></Line>
                        <Input placeholder="Email"></Input>
                        <Line></Line>
                        <Input placeholder="Phone number"></Input>
                        <Line></Line>
                        <Input placeholder="Address"></Input>
                        <Line></Line>
                        <Title>Date of birth</Title>
                        <Input dob type={'date'} placeholder="Date of birth"></Input>
                    </div>

                    <div className={cx('input-container')}>
                        <Input placeholder="Firstname"></Input>
                        <Line></Line>
                        <Input placeholder="Lastname"></Input>
                        <Line></Line>

                        <div className={cx('gender-container')}>
                            <div className={cx('gender-input')}>
                                <Input type={'radio'}></Input>
                                <Title>Female</Title>
                            </div>
                            <div className={cx('gender-input')}>
                                <Input type={'radio'}></Input>
                                <Title>Female</Title>
                            </div>
                            <div className={cx('gender-input')}>
                                <Input type={'radio'}></Input>
                                <Title>Female</Title>
                            </div>
                        </div>

                        <Line></Line>
                        <Input placeholder="Address"></Input>
                        <Line></Line>
                        <Title>Date of birth</Title>
                        <Input dob type={'date'} placeholder="Date of birth"></Input>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
