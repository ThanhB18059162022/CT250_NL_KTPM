import Home from "./Home"
import Admin from "./Admin"
import SearchProduct from "./SearchProduct"
import ProductDetail from "./ProductDetail"
import Cart from "./Cart"
import SuccessDirect from "./SuccessDirect"
import Login from "./Login"

/*  Route định tuyến cho tất cả các trang, khi tạo ra 1 trang,
    cần import bên trên và khai báo vào mảng bên dưới./
*/
const route = [
    //so on...
    {
        path: '/admin',
        public: true,
        component: Admin
    },
    {
        path:'/product/:id',
        public:true,
        exact:true,
        component: ProductDetail
    }
    ,
    {
        path:'/search/:flug',
        public:false,
        component:SearchProduct
    },
    {
        path:'/cart',
        public:true,
        component:Cart
    },

    {
        path:'/login',
        public:true,
        component:Login
    },

    {
        path:'/success/:type/:id',
        public:true,
        component:SuccessDirect
    },
    {
        path: '/',
        public: true,
        component: Home
    },
]

export default route
