import HomePage from '~/Pages/HomePage/Homepage';
import Nest from '~/Pages/Nest/Nest';
import ParrotProduct from '~/Pages/ParrotProduct/ParrotProduct';
import AdParrotSpecies from '~/Pages/AdParrotSpecies/AdParrotSpecies';
import SystemLayout from '~/Components/SystemLayout/SystemLayout';
import ChangePassword from '~/Pages/ChangePassword/ChangePassword';
import LoginSystemLayout from '~/Components/LoginSystemLayout/LoginSystemLayout';
import SystemLogin from '~/Pages/SystemLogin/SystemLogin';
import Payment from '~/Pages/Payment/Payment';
import UserLogin from '~/Pages/UserLogin/UserLogin';
import OrderHistory from '~/Pages/OrderHistory/OrderHistory';
import FAQs from '~/Pages/FAQs/FAQs';
import Register from '~/Pages/Register/Register';
import DeliveryInformation from '~/Pages/DeliveryInformation/DeliveryInformation';
import ParrotDetail from '~/Pages/ParrotDetail/ParrotDetail';
import AddParotSpecies from '~/Pages/AddParrotSpecies/AddParrotSpecies';
import TestDontDelete from '~/Pages/TestDontDelete/TestDontDelete';
import AddPost from '~/Pages/AddPost/AddPost';
import AddParrot from '~/Pages/AddParrot/AddParrot';
import StaffFeedback from '~/Pages/StaffFeedBack/StaffFeedback';
import MngVoucherPromotion from '~/Pages/MngVoucherPromotion/MngVoucherPromotion';
import MngOrder from '~/Pages/MngOrder/MngOrder';
import AddSpeciesColor from '~/Pages/AddSpeciesColor/AddSpeciesColor';
import AddSlider from '~/Pages/AddSlider/AddSlider';
//Dành cho những người kể cả đăng nhập hay không đăng nhập cũng coi được
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/parrotProduct', component: ParrotProduct },
    { path: '/nest', component: Nest },
    { path: '/payment', component: Payment },
    { path: '/parrotdetail/:id', component: ParrotDetail },
    { path: '/orderhistory', component: OrderHistory },
    { path: '/register', component: Register, layout: LoginSystemLayout },
    { path: '/loginUser', component: UserLogin, layout: LoginSystemLayout },
    { path: '/adparrotspecies', component: AdParrotSpecies, layout: SystemLayout },
    { path: '/changePassword', component: ChangePassword, layout: LoginSystemLayout },
    { path: '/loginSystem', component: SystemLogin, layout: LoginSystemLayout },
    { path: '/faq', component: FAQs },
    { path: '/addparrotspecies', component: AddParotSpecies, layout: LoginSystemLayout },
    { path: '/addparrot', component: AddParrot, layout: SystemLayout },
    { path: '/test', component: TestDontDelete, layout: SystemLayout },
    { path: '/addpost', component: AddPost, layout: SystemLayout },
    { path: '/stafffeedback', component: StaffFeedback, layout: SystemLayout },
    { path: '/mngvoucherpromotion', component: MngVoucherPromotion, layout: SystemLayout },
    { path: '/mngorder', component: MngOrder, layout: SystemLayout },
    { path: '/addspeciescolor', component: AddSpeciesColor, layout: SystemLayout },
    { path: '/addslider', component: AddSlider, layout: SystemLayout },
];

//Dành cho những người đăng nhập mới coi được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
