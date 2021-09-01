import Home from "./Home"
import Admin from "./Admin"

/*  Route định tuyến cho tất cả các trang, khi tạo ra 1 trang,
    cần import bên trên và khai báo vào mảng bên dưới./
*/
const route = [
    //so on...
    {
        path: '/admin',
     //   exact: true,
        public: true,
        component: Admin
    },
    {
        path: '/',
      //  exact: true,
        public: true,
        component: Home
    },
]

export default route
