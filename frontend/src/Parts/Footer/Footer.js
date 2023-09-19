import styles from '~/Parts/Footer/Footer.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footer-part')}>
                    <h3>11-twell Vietnam</h3>
                    <Button href="https://fullstack.edu.vn/">About us</Button>
                    <Button href="https://fullstack.edu.vn/">Contact</Button>
                </div>

                <div className={cx('footer-part')}>
                    <h3>Terms and Conditions</h3>
                    <Button href="https://fullstack.edu.vn/">11-twell rule</Button>
                    <Button href="https://fullstack.edu.vn/">Term of use</Button>
                </div>

                <div className={cx('footer-part')}>
                    <h3>Follow us</h3>
                    <Button href="https://fullstack.edu.vn/">Facebook</Button>
                    <Button href="https://fullstack.edu.vn/">Youtube</Button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
