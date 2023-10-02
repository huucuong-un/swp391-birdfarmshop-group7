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
import { useEffect, useState } from 'react';
import { ShopState } from '~/context/ShopProvider';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const cx = classNames.bind(styles);

function Navbar() {
    const [loggedUser, setLoggedUser] = useState();
    const { user } = ShopState();

    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        navigate('/login-user');
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    }, []);

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
            title: 'Hatching',
            to: '/hatching',
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
                        {user ? (
                            <>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    w="50%"
                                    p="5px 10px 5px 10px"
                                >
                                    <Menu>
                                        <MenuButton as={Button}>
                                            <Avatar size="lg" cursor="pointer" name={user.name} />
                                        </MenuButton>
                                        <MenuList mt={20} ml={20} className={cx('profile-list')}>
                                            <MenuItem padding={5}>My Profile</MenuItem>
                                            <MenuDivider color={'#ccc'} />
                                            <MenuItem onClick={logoutHandler} padding={5}>
                                                Logout
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Box>

                                {/* <Button className={cx('nav-top-btn-left-register')} to="/register">
                                    View Profile
                                </Button>
                                <Button className={cx('nav-top-btn-left-login')} text to="/loginUser">
                                    Logout
                                </Button> */}
                            </>
                        ) : (
                            <>
                                <Button className={cx('nav-top-btn-left-register')} to="/register">
                                    Register
                                </Button>
                                <Button className={cx('nav-top-btn-left-login')} text to="/login-user">
                                    Login
                                </Button>
                            </>
                        )}
                    </div>
                    <img className={cx('logo')} src={logo} alt="Logo" />
                    <div className={cx('active-right')}>
                        <Button
                            text
                            className={cx('language-and-cart')}
                            leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faGlobe} />}
                        >
                            Language
                        </Button>
                        <Button
                            text
                            className={cx('language-and-cart')}
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
