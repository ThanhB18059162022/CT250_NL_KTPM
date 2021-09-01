import Home from "./Home"

/*  Route định tuyến cho tất cả các trang, khi tạo ra 1 trang,
    cần import bên trên và khai báo vào mảng bên dưới./
*/
const route = [
    {
        path: '/',
        exact: true,
        public: true,
        component: Home
    }
    //so on...
]

export default route
