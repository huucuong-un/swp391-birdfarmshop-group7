import styles from '~/Parts/Footer/Footer.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('footer-part')}>
                    <p>11-twell Vietnam</p>
                    <Button href="https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#">
                        About us
                    </Button>
                    <Button href="https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#">
                        Contact
                    </Button>
                </div>

                <div className={cx('footer-part')}>
                    <p>Terms and Conditions</p>
                    <Button href="https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#">
                        11-twell rule
                    </Button>
                    <Button href="https://huucuong-un.github.io/htmlcss-1112studio/?fbclid=IwAR177w5Ref1WUBg432KBNieE9wKll9rdKw70B_YpFL8V1vJNGZZWgOlBfLE#">
                        Term of use
                    </Button>
                </div>

                <div className={cx('footer-part')}>
                    <p>Follow us</p>
                    <Button href="https://www.facebook.com/profile.php?id=100088252377959">Facebook</Button>
                    <Button href="https://www.youtube.com/channel/UC7uz-Ctf31f1QWZrNl0c56Q">Youtube</Button>
                </div>
            </div>
        </div>
    );
}

export default Footer;
