import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAPI from '~/Api/UserAPI';

const ShopContext = createContext();

const ShopProvider = ({ children }) => {
    const [user, setUser] = useState();
    // const navigate = useNavigate();

    useEffect(() => {
        const run = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('accessToken'));
                console.log(userInfo);

                const userGetFromToken = await UserAPI.getUserByToken(userInfo);

                console.log(userGetFromToken);
                setUser(userGetFromToken);

                // });
            } catch (error) {}
        };
        run();

        // if (!userInfo) navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ShopContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
};

export const ShopState = () => {
    return useContext(ShopContext);
};

export default ShopProvider;
