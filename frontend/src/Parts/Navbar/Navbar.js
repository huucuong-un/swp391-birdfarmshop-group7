import styles from '~/Parts/Navbar/Navbar.module.scss';
import classNames from 'classnames/bind';

//tippy
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/Components/Popper';

//assets
import logo from '~/Assets/image/Logo/2(5).png';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Button from '~/Components/Button/Button';

const cx = classNames.bind(styles);

function Navbar() {
    const activeNavs = [
        {
            title: 'PRODUCT',
        },
        {
            title: 'SERVICE',
        },
        {
            title: 'ABOUT',
        },
        {
            title: 'FAQS',
        },
    ];

    const MENU_ITEMS_PRODUCT = [
        {
            title: 'Parrot',
            to: '/parrotProduct',
        },
        {
            title: 'Nest',
            to: '/nest',
        },
    ];

    const MENU_ITEMS_SERVICE = [
        {
            title: 'Haching',
            to: '/haching',
        },
        {
            title: 'Bird Care',
            to: '/birdCare',
        },
    ];

    /* {activeNavs.map((activeNav, index) => {
                                return (
                                    <Button className={cx('nav-bottom-item')} text key={index}>
                                        {activeNav.title}
                                    </Button>
                                );
                            })} */

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('nav-top')}>
                    <div className={cx('nav-top-btn-left')}>
                        <Button className={cx('nav-top-btn-left-register')} to="/register">
                            Register
                        </Button>
                        <Button className={cx('nav-top-btn-left-login')} text>
                            Login
                        </Button>
                    </div>
                    <img className={cx('logo')} src={logo} alt="Logo" />
                    <div className={cx('active-right')}>
                        <Button
                            text
                            className={cx('language-anf-cart')}
                            leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faGlobe} />}
                        >
                            Language
                        </Button>
                        <Button
                            text
                            className={cx('language-anf-cart')}
                            leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faCartShopping} />}
                        >
                            Cart
                        </Button>
                    </div>
                </div>
                <div className={cx('nav-bottom')}>
                    <Tippy
                        interactive
                        // visible
                        // delay={[0, 700]}
                        placement="bottom"
                        render={(attrs) => (
                            <div className={cx('mini-nav-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    {MENU_ITEMS_PRODUCT.map((item, index) => {
                                        return (
                                            <Button className={cx('mini-nav-result-item')} to={item.to}>
                                                {item.title}
                                            </Button>
                                        );
                                    })}
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div>
                            {/* {activeNavs.map((activeNav, index) => {
                                return (
                                    <Button className={cx('nav-bottom-item')} text key={index}>
                                        {activeNav.title}
                                    </Button>
                                );
                            })} */}

                            <Button className={cx('nav-bottom-item')} text>
                                PRODUCT
                            </Button>
                        </div>
                    </Tippy>

                    <Tippy
                        interactive
                        // visible
                        placement="bottom"
                        render={(attrs) => (
                            <div className={cx('mini-nav-result')} tabIndex="-1" {...attrs}>
                                <PopperWrapper>
                                    {MENU_ITEMS_SERVICE.map((item, index) => {
                                        return (
                                            <Button className={cx('mini-nav-result-item')} to={item.to}>
                                                {item.title}
                                            </Button>
                                        );
                                    })}
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <div>
                            {/* {activeNavs.map((activeNav, index) => {
                                return (
                                    <Button className={cx('nav-bottom-item')} text key={index}>
                                        {activeNav.title}
                                    </Button>
                                );
                            })} */}

                            <Button className={cx('nav-bottom-item')} text>
                                SERVICE
                            </Button>
                        </div>
                    </Tippy>

                    <Button className={cx('nav-bottom-item')} text>
                        ABOUT
                    </Button>

                    <Button to="/faq" className={cx('nav-bottom-item')} text>
                        FAQS
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
