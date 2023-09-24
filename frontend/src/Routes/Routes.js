import HomePage from '~/Pages/HomePage/Homepage';
import Nest from '~/Pages/Nest/Nest';
import ParrotProduct from '~/Pages/ParrotProduct/ParrotProduct';
import AdParrotSpecies from '~/Pages/AdParrotSpecies/AdParrotSpecies';
import SystemLayout from '~/Components/SystemLayout/SystemLayout';
import ChangePassword from '~/Pages/ChangePassword/ChangePassword';
import LoginSystemLayout from '~/Components/LoginSystemLayout/LoginSystemLayout';
import SystemLogin from '~/Pages/SystemLogin/SystemLogin';
import UserLogin from '~/Pages/UserLogin/UserLogin';
import Register from '~/Pages/Register/Register';
//Dành cho những người kể cả đăng nhập hay không đăng nhập cũng coi được
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/parrotProduct', component: ParrotProduct },
    { path: '/nest', component: Nest },
    { path: '/loginUser', component: UserLogin, layout: LoginSystemLayout },
    { path: '/register', component: Register, layout: LoginSystemLayout },
    { path: '/adParrotSpecies', component: AdParrotSpecies, layout: SystemLayout },
    { path: '/changePassword', component: ChangePassword, layout: LoginSystemLayout },
    { path: '/loginSystem', component: SystemLogin, layout: LoginSystemLayout },
];

//Dành cho những người đăng nhập mới coi được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
