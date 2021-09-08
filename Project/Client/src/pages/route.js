import Home from "./Home"
import Admin from "./Admin"
import SearchProduct from "./SearchProduct"
import ProductDetail from "./ProductDetail"
import Cart from "./Cart"

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
        path: '/',
        public: true,
        component: Home
    },
]

export default route
