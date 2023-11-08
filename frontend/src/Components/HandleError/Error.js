import React from 'react';
import classNames from 'classnames/bind';

import styles from './Error.module.scss';
const cx = classNames.bind(styles);
const ErrorPage = () => {
    return (
        <div className={cx('not-found-container')}>
            <h1 className={'glitch'}>404</h1>
            <p>Page Not Found</p>
        </div>
    );
};

export default ErrorPage;
