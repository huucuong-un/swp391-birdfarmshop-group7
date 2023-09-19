import classNames from 'classnames/bind';
import styles from '~/Components/Breadcrumbs/Breadcrumbs.module.scss';

import Breadcrumbs from '~/Components/Breadcrumbs/Breadcrumbs';
import StartPartPage from '~/Components/StartPartPage/StartPartPage';
import SortSpace from '~/Components/SortSpace/SortSpace';
import ParrotList from '~/Components/ParrotList/ParrotList';

const cx = classNames.bind(styles);

function ParrotProduct() {
    return (
        <div className={cx('wrapper')}>
            <StartPartPage>Parrots</StartPartPage>
            <SortSpace></SortSpace>
            <ParrotList></ParrotList>
        </div>
    );
}

export default ParrotProduct;
