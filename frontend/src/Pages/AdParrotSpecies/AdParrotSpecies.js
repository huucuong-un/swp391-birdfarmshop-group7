import Title from '~/Components/Title/Title';
import styles from '~/Pages/AdParrotSpecies/AdParrotSpecies.module.scss';
import classNames from 'classnames/bind';
import Button from '~/Components/Button/Button';
import AddParrotSpecies from '~/Components/TestAddSpecies/AddParrotSpecies';

const cx = classNames.bind(styles);

function AdParrotSpecies() {
    return (
        <div className={cx('wrapper')}>
            <Title system>Parrot Species</Title>

            <div className={cx('active')}>
                <div className={cx('add-btn')}>
                    <Button to="/add-parrot-species" add>
                        Add
                    </Button>
                </div>
                <div className={cx('sort-space')}>
                    <form className={cx('sort-space-form')}>
                        <select name="species" id="species">
                            <option value="" disabled selected>
                                Species
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <select name="status" id="status">
                            <option value="" disabled selected>
                                Status
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <input type="date" />
                        <select name="price" id="price">
                            <option value="" disabled selected>
                                Price
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </form>
                </div>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Species</th>
                            <th>Origin</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Create At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Grey Parrot</td>
                            <td>Nguyen Thanh</td>
                            <td>1 500 000</td>
                            <td className={cx('status')}>Active</td>
                            <td>31/10/2003</td>
                            <td className={cx('actions')}>
                                <Button to="" editDeteleSwitch>
                                    Edit
                                </Button>
                                <Button to="" editDeteleSwitch>
                                    Delete
                                </Button>
                            </td>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>Grey Parrot</td>
                            <td>Nguyen Thanh</td>
                            <td>1 500 000</td>
                            <td className={cx('status')}>Active</td>
                            <td>31/10/2003</td>
                            <td className={cx('actions')}>
                                <Button to="" editDeteleSwitch>
                                    Edit
                                </Button>
                                <Button to="" editDeteleSwitch>
                                    Delete
                                </Button>
                            </td>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>Grey Parrot</td>
                            <td>Nguyen Thanh</td>
                            <td>1 500 000</td>
                            <td className={cx('status')}>Active</td>
                            <td>31/10/2003</td>
                            <td className={cx('actions')}>
                                <Button to="" editDeteleSwitch>
                                    Edit
                                </Button>
                                <Button to="" editDeteleSwitch>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdParrotSpecies;
