import { useEffect, useState } from "react";
import { caller } from "../../../api_services/servicesContainer";
import "./Footer.Style.scss";
import { Loader } from "@googlemaps/js-api-loader";
const Footer = () => {
    const [trademade, setTrademade] = useState([]);
    const policy = ["Chính sách bảo hành", "Chính sách đổi trả", "Chính sách thanh toán"];

    const [directService, setDirectService] = useState(null)
    const [directDisplay,setDirectDisplay] = useState(null)

    const [googleInstance, setGoogleInstance] = useState(null)
    useEffect(() => {
        (async () => {
            let data = await caller.get("products/brands");
            setTrademade(data);
        })();
    }, []);

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyDpuhPAXBFKTzK1P7n9vSW87mZtZBSG408",
            version: "weekly",
            libraries: ["places"],
        });
        const mapOptions = {
            center: {
                lat: 10.030228,
                lng: 105.772085,
            },
            zoom: 16,
        };

        loader.load().then((google) => {
            const map = new google.maps.Map(document.getElementById("map"), mapOptions);
            new google.maps.Marker({
                map,
                title: "Octopus store",
                position: {
                    lat: 10.030228,
                    lng: 105.772085,
                },
            });
            const directionsService = new google.maps.DirectionsService();    // Khởi tạo DirectionsService - thằng này có nhiệm vụ tính toán chỉ đường cho chúng ta.
            const directionsDisplay = new google.maps.DirectionsRenderer({map: map});
            setGoogleInstance(google)
            setDirectService(directionsService)
            setDirectDisplay(directionsDisplay)
        });
    }, []);

    const route = () => {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(showPosition,e=>alert(`Trình duyện của bạn đã chặn website của chúng tôi, vui lòng bật cờ 'Insecure origins treated as secure' và thêm địa chỉ website của chúng tôi vào hộp thoại! `));
        else alert("Bạn chưa cho phép quyền về vị trí của bạn!")
    };

    const showPosition =position=>{
        directService.route({    // hàm route của DirectionsService sẽ thực hiện tính toán với các tham số truyền vào
            origin:{
                lat:position.coords.latitude,
                lng:position.coords.longitude,
            }, 
            destination: {
                lat: 10.030228,
                lng: 105.772085,
            },
            travelMode: 'DRIVING',     // phương tiện di chuyển
          }, function(response, status) {    // response trả về bao gồm tất cả các thông tin về chỉ đường
            if (status === googleInstance.maps.DirectionsStatus.OK) {    
              directDisplay.setDirections(response); // hiển thị chỉ đường trên bản đồ (nét màu đỏ từ A-B)
            //   showSteps(response); // Hiển thị chi tiết các bước cần phải đi đến đích.
            } else {    
              window.alert('Request for getting direction is failed due to ' + status);    // Hiển thị lỗi
            }    
          });    
    }

    return (
        <div className='Footer'>
            <div className='Footer_trademade'>
                <p>
                    <b>Sản phẩm</b>
                </p>
                <ul className='trademade'>
                    {trademade.map((item, index) => (
                        <li key={index}>
                            <p>{item.brand_name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='Footer_container'>
                <div className='Footer_container_info'>
                    <div>
                        <p>
                            <b>Chính sách</b>
                        </p>
                        <ul className='policy'>
                            {policy.map((item, index) => (
                                <li key={index}>
                                    <p>{item}</p>
                                </li>
                            ))}
                        </ul>
                        <p style={{ marginTop: "30px" }}>
                            <b>Địa chỉ cửa hàng</b>
                        </p>
                    </div>
                    <div>
                        <p>
                            <b>Về chúng tôi</b>
                        </p>
                        <ul>
                            <li className='storename'>
                                <p>Octopus</p>
                            </li>
                            <li>
                                <p>Liên hệ: 0987654311</p>
                            </li>
                            <li
                                onClick={() =>
                                    (window.location.href =
                                        "https://www.facebook.com/octopusstoreark")
                                }
                            >
                                <p>Fan page: fb.com/octopusstoreark</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='checkingmap'>
                    <div id='map'></div>

                    <button onClick={route}>Chỉ đường đến shop</button>
                </div>
            </div>
        </div>
    );
};

export default Footer;
