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
import PaidSuccess from '~/Pages/PaidSuccess/PaidSuccess';
import ShoppingCart from '~/Pages/ShoppingCart/ShoppingCart';
import PostDetail from '~/Pages/PostDetail/PostDetail';
import AboutUs from '~/Pages/AboutUs/AboutUs';
import UserProfile from '~/Pages/UserProfile/UserProfile';
import SpeciesSelection from '~/Pages/SpeciesSelection/SpeciesSelection';
import AddRole from '~/Pages/AddRole/AddRole';
import CompareParrot from '~/Pages/CompareParrot/CompareParrot';
import MyAccount from '~/Pages/MyAccount/MyAccount';
import UserProfileNew from '~/Pages/UserProfileNew/UserProfileNew';
import Contact from '~/Components/Contact/Contact';
import AddParrotNestService from '~/Pages/AddParrotNestService/AddParrotNestService';
import OrderHistoryNew from '~/Pages/OrderHistoryNew/OrderHistoryNew';
import AdminDashboard from '~/Pages/AdminDashboard/AdminDashboard';
import AdminRoleList from '~/Pages/AdminRoleList/AdminRoleList';
import StaffOrderManagement from '~/Pages/StaffOrderManagement/StaffOrderManagement';
import AdFAQSManagement from '~/Pages/AdFAQSManagement/AdFAQSManagement';
import AdminAccountList from '~/Pages/AdminAccountList/AdminAccountList';
import AdNestManagement from '~/Pages/AdNestManagement/AdNestManagement';
import AdNestPriceManagement from '~/Pages/AdNestPriceManagement/AdNestPriceManagement';
import AdNestDevelopmentStatus from '~/Pages/AdNestDevelopmentStatus/AdNestDevelopmentStatus';
import AdNestDevelopmentManagement from '~/Pages/AdNestDevelopmentManagement/AdNestDevelopmentManagement';
import AdNestUsageHistoryManagement from '~/Pages/AdNestUsageHistoryManagement/AdNestUsageHistoryManagement';
import PaidFail from '~/Pages/PaidFail/PaidFail';
import ForgotPassword from '~/Pages/ForgotPassword/ForgotPassword';
import ForgotPasswordOTP from '~/Pages/ForgotPasswordOTP/ForgotPasswordOTP';
import ResetPassword from '~/Pages/ResetPassword/ResetPassword';
import MarketingLayout from '~/Components/MarketingLayout/MarketingLayout';
import StaffLayout from '~/Components/StaffLayout/StaffLayout';
import MarketerPromotion from '~/Pages/MarketerPromotion/MarketerPromotion';
//Dành cho những người kể cả đăng nhập hay không đăng nhập cũng coi được
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/parrot-product', component: ParrotProduct },
    { path: '/nest', component: Nest },
    { path: '/payment', component: Payment },
    { path: '/parrot-product/parrot-detail', component: ParrotDetail },
    { path: '/order-history', component: OrderHistory },
    { path: '/order-history-new', component: OrderHistoryNew },
    { path: '/paid-success', component: PaidSuccess },
    { path: '/shopping-cart', component: ShoppingCart },
    { path: '/post-detail', component: PostDetail },
    { path: '/about-us', component: AboutUs },
    { path: '/userprofile', component: UserProfile },
    { path: '/species-selection', component: SpeciesSelection },
    { path: '/admin/faqs', component: AdFAQSManagement, layout: SystemLayout },
    { path: '/add-parrot-nest-service', component: AddParrotNestService },
    { path: '/register', component: Register, layout: LoginSystemLayout },
    { path: '/test', component: TestDontDelete, layout: SystemLayout },
    { path: '/marketer/post', component: AddPost, layout: MarketingLayout },
    { path: '/marketer/promotion', component: MarketerPromotion, layout: MarketingLayout },
    { path: '/staff/feedback', component: StaffFeedback, layout: StaffLayout, role: 'staff' },
    { path: '/staff/order', component: StaffOrderManagement, layout: StaffLayout, role: 'staff' },
    // { path: '/admin/order', component: MngOrder, layout: SystemLayout },
    { path: '/addspeciescolor', component: AddSpeciesColor, layout: SystemLayout },
    { path: '/marketer/slider', component: AddSlider, layout: MarketingLayout },
    { path: '/login-user', component: UserLogin, layout: LoginSystemLayout },
    { path: '/profile/change-password', component: ChangePassword },
    { path: '/system/login', component: SystemLogin, layout: LoginSystemLayout },
    { path: '/faqs', component: FAQs },
    { path: '/admin/parrot-species', component: AdParrotSpecies, layout: SystemLayout },
    { path: '/admin/parrot', component: AddParrot, layout: SystemLayout },
    { path: '/compare-products', component: CompareParrot },
    { path: '/profile', component: MyAccount },
    { path: '/user-profile', component: UserProfileNew },
    { path: '/contact', component: Contact },
    { path: '/add-role', component: AddRole },
    { path: '/admin/dashboard', component: AdminDashboard, layout: SystemLayout },
    { path: '/admin/nest', component: AdNestManagement, layout: SystemLayout },
    { path: '/admin/nest-price', component: AdNestPriceManagement, layout: SystemLayout },
    { path: '/admin/nest-development', component: AdNestDevelopmentManagement, layout: SystemLayout },
    { path: '/admin/nest-development-status', component: AdNestDevelopmentStatus, layout: SystemLayout },
    { path: '/admin/nest-usage-history', component: AdNestUsageHistoryManagement, layout: SystemLayout },
    { path: '/admin/role', component: AdminRoleList, layout: SystemLayout },
    { path: '/admin/promotion', component: MngVoucherPromotion, layout: SystemLayout },
    { path: '/admin/account', component: AdminAccountList, layout: SystemLayout },
    { path: '/paid-fail', component: PaidFail },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/forgot-password/otp', component: ForgotPasswordOTP },
    { path: '/forgot-password/otp/reset-password', component: ResetPassword },
];

//Dành cho những người đăng nhập mới coi được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
