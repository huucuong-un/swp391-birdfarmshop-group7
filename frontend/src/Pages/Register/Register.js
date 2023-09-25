import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Inputs from '~/Components/Input/Input';
import Line from '~/Components/Line/Line';
import Title from '~/Components/Title/Title';
import Button from '~/Components/Button/Button';

import { Input } from '@chakra-ui/react';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* Form */}
                <form className={cx('inner')}>
                    {/* Container 2 */}
                    <div className={cx('input-container')}>
                        <div>
                            <Inputs placeholder="Username"></Inputs>
                            <Line></Line>
                        </div>
                        <div>
                            <Inputs placeholder="Email"></Inputs>
                            <Line></Line>
                        </div>
                        <div>
                            <Inputs placeholder="Phone number"></Inputs>
                            <Line></Line>
                        </div>

                        <div>
                            <Inputs placeholder="Address"></Inputs>
                            <Line></Line>
                        </div>

                        <div className={cx('dob-container')}>
                            <Title dob>Date of birth</Title>
                            {/* <Inputs dob type={'date'} placeholder="Date of birth"></Inputs> */}
                            <Input
                                placeholder="Select Date and Time"
                                className={cx('dob-date')}
                                type="datetime-local"
                            />
                        </div>
                    </div>
                    {/*End container 1  */}
                    {/* Container 2 */}
                    <div className={cx('input-container')}>
                        <div>
                            <Inputs placeholder="Firstname"></Inputs>
                            <Line></Line>
                        </div>

                        <div>
                            <Inputs placeholder="Lastname"></Inputs>
                            <Line></Line>
                        </div>

                        <div>
                            <Inputs placeholder="Password"></Inputs>
                            <Line></Line>
                        </div>

                        <div>
                            <Inputs placeholder="Confirm password"></Inputs>
                            <Line></Line>
                        </div>
                        {/* Gender Input */}
                        <div className={cx('gender-container')}>
                            <div className={cx('gender-title')}>
                                <Title>Gender</Title>
                            </div>
                            <div className={cx('gender')}>
                                <div className={cx('gender-input')}>
                                    <label className={cx('label-container')}>
                                        <Inputs
                                            className={cx('input-radio')}
                                            name="radio"
                                            gender
                                            type={'radio'}
                                        ></Inputs>
                                        <Title>Female</Title>
                                    </label>
                                </div>
                                <div className={cx('gender-input')}>
                                    <label className={cx('label-container')}>
                                        <Inputs
                                            className={cx('input-radio')}
                                            name="radio"
                                            gender
                                            type={'radio'}
                                        ></Inputs>
                                        <Title>Male</Title>
                                    </label>
                                </div>
                                <div className={cx('gender-input')}>
                                    <label className={cx('label-container')}>
                                        <Inputs
                                            gender
                                            type={'radio'}
                                            name="radio"
                                            className={cx('input-radio')}
                                        ></Inputs>
                                        <Title>Other</Title>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End container 2 */}
                    {/* Register buton */}
                    <div className={cx('register-container')}>
                        <Button className={cx('register-btn')} register>
                            Register
                        </Button>
                    </div>
                    {/*End register buton */}
                </form>
                {/* End form */}
            </div>
        </div>
    );
}

export default Register;
