// import 'bootstrap/dist/css/bootstrap.min.css

import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faMagnifyingGlass,
    faCircleXmark,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import ParrotSpeciesAPI from '~/Api/ParrotSpeciesAPI';
import ParrotAPI from '~/Api/ParrotAPI';
import { useCartStatus } from '~/Components/CartStatusContext/CartStatusContext';
import FeedbackAPI from '~/Api/FeedbackAPI';

import SortSpace from '../SortSpace/SortSpace';

import { useState, useEffect } from 'react';

import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useToast,
} from '@chakra-ui/react';

import styles from '~/Components/ParrotList/ParrotList.module.scss';
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import number1 from '~/Assets/image/NumberComparison/number-v4-1.png';
import number2 from '~/Assets/image/NumberComparison/number-2.png';
import number3 from '~/Assets/image/NumberComparison/number-3.png';
import OrderAPI from '~/Api/OrderAPI';

import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const parrotSpeciesURL = 'http://localhost:8086/api/parrot-species';

// Make an HTTP GET request to the API endpoint
const datas = () => {
    fetch(parrotSpeciesURL)
        .then((response) => {
            // Check if the response status is OK (200)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse the JSON response
            return response.json();
        })
        .then((data) => {
            // Store the fetched data in a constant variable
            const parrotSpeciesData = data;
        })
        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error('Fetch error:', error);
        });
};

console.log(datas);

function ParrotList(props) {
    const toast = useToast();
    const [parrotSpecies, setParrotSpecies] = useState([]);
    const [totalSpecies, setTotalSpecies] = useState(0);
    const [combineData, setCombineData] = useState([]);
    const [combineDataWithCountReview, setcombineDataWithCountReview] = useState([]);
    const [selectedColor, setSelectedColor] = useState({});
    const [quantities, setQuantities] = useState({});
    const [countParrot, setCountParrot] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState({});
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 8,
    });
    const [isLogoShaking, setIsLogoShaking] = useState(false);

    const [sortWithPagination, setSortWithPagination] = useState({
        page: 1,
        limit: 12,
        name: null,
        sortName: null,
        sortPrice: null,
        sortDate: null,
        sortParrotAverageRating: null,
    });

    const [searchWithPagination, setSearchWithPagination] = useState({
        page: 1,
        limit: 12,
        name: '',
    });
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);
    const [parrotId, setParrotId] = useState();
    const dataToPass = {
        selectedColor,
        combineData,
        selectedColorId,
        parrotId,
    };
    const { addToCartStatus, setAddToCartStatus } = useCartStatus();

    const notifyTotalSpecies = (totalSpecies) => {
        props.onTotalSpeciesChange(totalSpecies);
    };

    useEffect(() => {
        setSortWithPagination({
            page: 1,
            limit: 12,
            name: props.sortWay.searchName,
            sortName: props.sortWay.sortName,
            sortPrice: props.sortWay.sortPrice,
            sortDate: props.sortWay.sortDate,
            sortParrotAverageRating: props.sortWay.sortRating,
        });
    }, [props.sortWay]);

    const [selectedComparisonProduct, setSelectedComparisonProduct] = useState([]);

    const handleColorSelection = async (parrotId, color, price, colorId) => {
        setSelectedColor({
            ...selectedColor,
            [parrotId]: {
                color: color,
                price: price,
                colorId: colorId,
            },
        });
        setSelectedColorId(colorId);
    };

    const handleAddToCompareProducts = (parrot) => {
        setSelectedComparisonProduct((prevProducts) => {
            if (prevProducts.length >= 0) {
                let compareSection = document.getElementById('compare-section-id');
                compareSection.style.display = 'block';
            }

            const isParrotAlreadySelected = prevProducts.some((p) => p.id === parrot.id);

            if (isParrotAlreadySelected) {
                return prevProducts.filter((p) => p.id !== parrot.id);
            } else {
                if (prevProducts.length === 3) {
                    return prevProducts;
                }
                return [...prevProducts, parrot];
            }
        });
    };

    const handleRemoveComparisonProduct = (parrot) => {
        setSelectedComparisonProduct((prevProducts) => {
            return prevProducts.filter((p) => p.id !== parrot.id);
        });
    };

    const handleCancelComparison = () => {
        let compareSection = document.getElementById('compare-section-id');
        compareSection.style.display = 'none';
        setSelectedComparisonProduct([]);
    };

    useEffect(() => {
        if (selectedComparisonProduct.length === 0) {
            let compareSection = document.getElementById('compare-section-id');
            compareSection.style.display = 'none';
        }
    }, [selectedComparisonProduct]);

    const handleQuantityIncrease = (parrotId) => {
        if (quantities[parrotId] < countParrot) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [parrotId]: (prevQuantities[parrotId] || 0) + 1, // Tăng quantity cho parrot cụ thể
            }));
        }
    };

    const handleQuantityDecrease = (parrotId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [parrotId]: Math.max((prevQuantities[parrotId] || 0) - 1, 1), // Giới hạn số lượng tối thiểu là 1
        }));
    };
    useEffect(() => {
        const getParrotsSpecies = async () => {
            try {
                const parrotSpeciesList = await ParrotSpeciesAPI.searchSortParrotSpeciesPublic(sortWithPagination);

                const totalSpeciesNumber = await ParrotSpeciesAPI.count();
                setTotalSpecies(totalSpeciesNumber);
                setParrotSpecies(parrotSpeciesList.listResult);

                setTotalPage(parrotSpeciesList.totalPage);

                notifyTotalSpecies(totalSpeciesNumber);
            } catch (error) {
                console.error(error);
            }
        };
        getParrotsSpecies();
    }, [sortWithPagination, pagination]);

    useEffect(() => {
        const getCountAvailableParrotId = async () => {
            try {
                const availableParrot = await ParrotAPI.countAvailableParrotId(selectedColorId);
                setCountParrot(availableParrot);
            } catch (error) {
                console.error(error);
            }
        };
        getCountAvailableParrotId();
    }, [selectedColorId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = [];
                for (const item of parrotSpecies) {
                    const parrot = { ...item };

                    const params = {
                        id: item.id,
                    };

                    parrot.colors = await ParrotSpeciesAPI.getListBySpeciesId(item.id);
                    parrot.countReview = await FeedbackAPI.countReview2(params);
                    parrot.countSoldProduct = await OrderAPI.countSoldProduct(params.id);

                    data.push(parrot);
                }

                const initialSelectedColor = {};
                data.forEach((parrot) => {
                    if (parrot.colors.length > 0) {
                        let maxColorId = parrot.colors[0].id;
                        parrot.colors.forEach((color) => {
                            if (color.id > maxColorId) {
                                maxColorId = color.id;
                            }
                        });
                        initialSelectedColor[parrot.id] = {
                            color: parrot.colors[0].color,
                            price: parrot.colors[0].price,
                            colorId: maxColorId,
                        };
                    }
                });

                setSelectedColor(initialSelectedColor);

                const initialQuantities = {};
                data.forEach((parrot) => {
                    initialQuantities[parrot.id] = 1;
                });
                setQuantities(initialQuantities);
                setCombineData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [parrotSpecies]);

    const handleAddToCart = ({ name, img, quantity, price, color, colorID, id }) => {
        setAddToCartStatus((prev) => prev + 1);
        const existingCart = JSON.parse(localStorage.getItem('parrot')) || [];
        const existingItem = existingCart.find((item) => item.name === name && item.color === color);
        let maxId = 0;
        if (existingCart.length != 0) {
            existingCart.forEach((item) => {
                if (item.id > maxId) {
                    maxId = item.id;
                }
            });
        }
        if (existingItem) {
            // Nếu mục đã tồn tại, tăng số lượng lên 1
            existingItem.quantity += 1;
        } else {
            // Nếu mục chưa tồn tại, thêm nó vào danh sách
            existingCart.push({
                id: existingCart.length == 0 ? 0 : maxId + 1,
                name,
                img,
                quantity: 1,
                price,
                color,
                colorID,
            });

            // setTotalParrotsInCart((prevTotal) => prevTotal + 1);
        }
        const newCart = [...existingCart];
        localStorage.setItem('parrot', JSON.stringify(newCart));
        // localStorage.clear();
        const deleteAfterMilliseconds = 365 * 24 * 60 * 60 * 1000; // 1 năm
        // const deleteAfterMilliseconds = 1 * 60 * 1000; // 1 phút
        setTimeout(() => {
            localStorage.removeItem('parrot'); // Xóa dữ liệu sau khoảng thời gian đã đặt
        }, deleteAfterMilliseconds);
        toast({
            title: 'Check your cart !!!.',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
    };

    const handlePageChange = (newPage) => {
        setPagination({
            page: newPage,
            limit: 12,
        });

        setSortWithPagination({
            page: newPage,
            limit: 12,
            name: sortWithPagination.name,
            sortName: sortWithPagination.sortName,
            sortPrice: sortWithPagination.sortPrice,
            sortDate: searchWithPagination.sortDate,
            sortParrotAverageRating: sortWithPagination.sortParrotAverageRating,
        });

        setPage(newPage);
    };

    const dataCompareToPass = {
        selectedComparisonProduct,
    };

    const handleSaveParrotId = (id) => {
        navigate('/parrot-product/parrot-detail', {
            state: {
                selectedColor,
                combineData,
                selectedColorId,
                parrotId: id,
            },
        });
    };

    const StarRating = ({ rating }) => {
        const stars = [];
        if (rating === null || rating === 0) {
            return <div>There are no reviews yet</div>;
        }
        const number = rating;
        const integerPart = Math.floor(number);
        const decimalPart = (number - integerPart).toFixed(1);
        var count = 0;
        for (let i = 0; i < integerPart; i++) {
            stars.push(<FontAwesomeIcon icon={solidStar} key={count} />);
            count = count + 1;
        }
        if (decimalPart > 0) {
            stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={count} />);
            count = count + 1;
            if (integerPart < 5) {
                for (let i = 0; i < 5 - integerPart - 1; i++) {
                    stars.push(<FontAwesomeIcon icon={regularStar} key={count} />);
                    count = count + 1;
                }
            }
        }

        if (decimalPart == 0) {
            if (integerPart < 5) {
                for (let i = 0; i < 5 - integerPart; i++) {
                    stars.push(<FontAwesomeIcon icon={regularStar} key={count} />);
                    count = count + 1;
                }
            }
        }

        if (rating !== null) {
            stars.push(<div key={count}> ( {rating} / 5 )</div>);
        }

        return stars;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner', 'row')}>
                {combineData.map((parrot, index) => {
                    return (
                        <div className={cx('parrot-card', 'col-lg-3')} key={index}>
                            <div className={cx('parrot-img')}>
                                <Tooltip
                                    label="Hit me to see my detail <3"
                                    aria-label="A tooltip"
                                    fontSize="lg"
                                    placement="left"
                                >
                                    <div
                                        // to={`/parrot-product/parrot-detail/${parrot.id}`}
                                        // state={dataToPass}
                                        // to={`/parrot-product/parrot-detail`}
                                        // state={dataToPass}
                                        onClick={() => handleSaveParrotId(parrot.id)}
                                    >
                                        <img className={cx('img')} src={parrot.img} alt="parrot" />
                                    </div>
                                </Tooltip>

                                <Link to="">
                                    <Tooltip
                                        label="Check to compare"
                                        aria-label="A tooltip"
                                        fontSize="lg"
                                        placement="auto"
                                    >
                                        <button
                                            className={cx('buy-btn')}
                                            onClick={() => {
                                                handleAddToCompareProducts(parrot);
                                            }}
                                        >
                                            {selectedComparisonProduct.some((p) => p.id === parrot.id) ? (
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            ) : (
                                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                                            )}
                                        </button>
                                    </Tooltip>
                                </Link>
                                <Link to="">
                                    <Tooltip label="Add to cart" aria-label="A tooltip" fontSize="lg" placement="auto">
                                        {/* <FontAwesomeIcon className={cx('cart-btn')} icon={faBagShopping} /> */}

                                        <button
                                            className={cx('cart-btn')}
                                            onClick={() =>
                                                handleAddToCart({
                                                    id: count,
                                                    name: parrot.name,
                                                    img: parrot.img,
                                                    quantity: 1,
                                                    price: selectedColor[parrot.id]?.price,
                                                    color: selectedColor[parrot.id]?.color,
                                                    colorID: selectedColor[parrot.id]?.colorId,
                                                })
                                            }
                                        >
                                            +
                                        </button>
                                    </Tooltip>
                                </Link>
                            </div>

                            <div className={cx('parrot-info')}>
                                <p className={cx('parrot-name')}>{parrot.name}</p>

                                <div className={cx('parrot-color')}>
                                    {parrot.colors.map((color, colorIndex) => (
                                        <div className={cx('cuong')}>
                                            <Tooltip label={color.color} placement="bottom" fontSize="xl">
                                                <button
                                                    key={colorIndex}
                                                    className={cx('parrot-color-item', {
                                                        selected: color.color === selectedColor[parrot.id]?.color,
                                                    })}
                                                    onClick={() =>
                                                        handleColorSelection(
                                                            parrot.id,
                                                            color.color,
                                                            color.price,
                                                            color.id,
                                                        )
                                                    }
                                                    style={{ backgroundColor: color.color }}
                                                ></button>
                                            </Tooltip>
                                        </div>
                                    ))}
                                </div>

                                <div className={cx('parrot-price')}>
                                    <p>$ {selectedColor[parrot.id]?.price}</p>
                                </div>
                                <div className={cx('parrot-like')}>
                                    <StarRating rating={parrot.parrotAverageRating}> </StarRating>
                                </div>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                    className={cx('parrot-review-orders')}
                                >
                                    <div>
                                        {parrot.countReview === 0 || parrot.countReview === 1
                                            ? parrot.countReview + ' review'
                                            : parrot.countReview + ' reviews'}{' '}
                                    </div>
                                    <div>{parrot.countSoldProduct} sold</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={cx('compare-section')} id="compare-section-id">
                <Container className={cx('compare-container')}>
                    <Row className={cx('compare-row')}>
                        <Col className={cx('compare-col')}>
                            <Text fontSize="4xl" as="b" textAlign={'left'}>
                                COMPARE UP TO 3 PRODUCTS
                            </Text>
                        </Col>
                        <Col xs={7} className={cx('compare-col', 'compare-col-product')}>
                            <Menu>
                                <Box className={cx('product-item')}>
                                    {selectedComparisonProduct.length === 0 ? (
                                        <Avatar size="2xl" src={number1} />
                                    ) : (
                                        <>
                                            <button
                                                className={cx('product-item-cancel-button')}
                                                onClick={() =>
                                                    handleRemoveComparisonProduct(selectedComparisonProduct[0])
                                                }
                                            >
                                                x
                                            </button>
                                            <Avatar size="2xl" src={selectedComparisonProduct[0].img} />
                                        </>
                                    )}
                                </Box>
                                <Box className={cx('product-item')}>
                                    {selectedComparisonProduct.length < 2 ? (
                                        <Avatar size="2xl" src={number2} />
                                    ) : (
                                        <>
                                            <button
                                                className={cx('product-item-cancel-button')}
                                                onClick={() =>
                                                    handleRemoveComparisonProduct(selectedComparisonProduct[1])
                                                }
                                            >
                                                x
                                            </button>
                                            <Avatar size="2xl" src={selectedComparisonProduct[1].img} />
                                        </>
                                    )}
                                </Box>
                                <Box className={cx('product-item')}>
                                    {selectedComparisonProduct.length < 3 ? (
                                        <Avatar size="2xl" src={number3} />
                                    ) : (
                                        <>
                                            <button
                                                className={cx('product-item-cancel-button')}
                                                onClick={() =>
                                                    handleRemoveComparisonProduct(selectedComparisonProduct[2])
                                                }
                                            >
                                                x
                                            </button>
                                            <Avatar size="2xl" src={selectedComparisonProduct[2].img} />
                                        </>
                                    )}
                                </Box>
                            </Menu>
                        </Col>
                        <Col className={cx('compare-col', 'compare-col-confirm')}>
                            {selectedComparisonProduct.length > 1 ? (
                                <Link
                                    to={`/compare-products`}
                                    state={dataCompareToPass}
                                    className={cx('compare-button-confirm')}
                                >
                                    COMPARE SELECTION
                                </Link>
                            ) : (
                                <Link
                                    size="lg"
                                    className={cx('compare-button-confirm')}
                                    disabled={selectedComparisonProduct.length <= 1}
                                    style={{
                                        opacity: selectedComparisonProduct.length <= 1 ? '0.5' : '1',
                                    }}
                                >
                                    COMPARE SELECTION
                                </Link>
                            )}

                            <Link
                                size="lg"
                                className={cx('compare-button-cancel')}
                                onClick={() => handleCancelComparison()}
                            >
                                CANCEL
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div className={cx('button-pagination')}>
                <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                {Array.from({ length: totalPage }, (_, index) => (
                    <p
                        key={index}
                        className={cx('number-page')}
                        onClick={() => handlePageChange(index + 1)}
                        style={{
                            fontSize: page === index + 1 ? '2.2rem' : '1.6rem', // Change background color when on the current page
                            fontWeight: page === index + 1 ? '600' : '500',
                        }}
                    >
                        {index + 1}
                    </p>
                ))}
                <button disabled={page === totalPage} onClick={() => handlePageChange(page + 1)}>
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    );
}

export default ParrotList;
