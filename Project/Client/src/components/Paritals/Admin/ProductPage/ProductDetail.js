import { faSave, faTrashAlt, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { AdminButton } from "../../../Controls"
import { useState } from "react";
import Notifications from "../../../../common/Notifications";
import "../Admin.Style.scss"

const ProductDetail = (props) => {
    const {setDisplay, details, setDetails, info} = props
    const [show, setShow] = useState(false)

    const [notify, setNotify] = useState({
        type :"", //CONFIRMARTION, INFORMATION
        title :"", // title of the notifications
        content :"", // content of the notify
        infoType :""
    })
    
    const notifyDeleteProdDetail = () =>{
        setNotify({
            type : "CONFIRMATION",
            title:"Xác nhận",
            content:"Xóa chi tiết sản phẩm?",
        })
        setShow(true)
    }

    const notifySaveProdDetail = () =>{
        setNotify({
            type : "INFORMATION",
            title:"Thông báo",
            content:"Đã lưu chi tiết",
            infoType : "SUCCESS"
        })
        setShow(true)
    }

    const [detail, setDetail] = useState({pd_no: "", pd_memory: "", pd_price: 0, pd_amount: 0, pd_sold: 0})

    const getDetail = () => {
        setDetails([...details, detail])
        notifySaveProdDetail()
    }

    const CusStyle = {
        margin: "1% 5px 5px 12%"
    };
    return(
        <>
        {!info ? (
            <>
                <div className="DetailButton">
                    {!setDisplay?(<AdminButton style={CusStyle} IconName={faTrashAlt} ClickEvent={notifyDeleteProdDetail}/>) : (<><AdminButton style={CusStyle} IconName={faSave} ClickEvent={()=>getDetail()}/> <AdminButton IconName={faWindowClose} ClickEvent={()=>setDisplay(0)}/> </>)}
                </div>
                <div className="ProductDetail BorderFormat">
                    <form className="ProductDetailForm">
                        <div>
                            <p>Mã chi tiết:</p>
                            <input name="txtPDNo" type="text" disabled onChange={e=>setDetail({...detail,pd_no: e.target.value})} />
                        </div>
                        <div>
                            <p>Bộ nhớ:</p>
                            <input name="txtPDMemory" type="text" onChange={e=>setDetail({...detail,pd_memory: e.target.value})} /> <br/>
                        </div>
                        <div>
                            <p>Giá:</p>
                            <input name="txtPDPrice" type="text" onChange={e=>setDetail({...detail,pd_price: Number(e.target.value)})} /> <br/>
                        </div>
                        <div>
                            <p>Số lượng:</p>
                            <input name="txtPDAmount" type="text" onChange={e=>setDetail({...detail,pd_amount: Number(e.target.value)})} /> <br/>
                        </div>
                        <div>
                            <p>Đã bán:</p>
                            <input name="txtPDSold" type="text" onChange={e=>setDetail({...detail,pd_sold: Number(e.target.value)})} /> <br/>
                        </div>
                        <div>
                            <p>Hình ảnh:</p>
                            <input type="file" id="myFile" name="filename" multiple />
                        </div>
                    </form>
                </div>
                <hr className="DetailSplit"/>
            </>
        ) : (
            <>
                <div className="DetailButton">
                    {!setDisplay?(<AdminButton style={CusStyle} IconName={faTrashAlt} ClickEvent={notifyDeleteProdDetail}/>) : (<><AdminButton style={CusStyle} IconName={faSave} ClickEvent={()=>getDetail()}/> <AdminButton IconName={faWindowClose} ClickEvent={()=>setDisplay(0)}/> </>)}
                </div>
                <div className="ProductDetail BorderFormat">
                    <form className="ProductDetailForm">
                        <div>
                            <p>Mã chi tiết:</p>
                            <input name="txtPDNo" type="text" disabled onChange={e=>setDetail({...detail,pd_no: e.target.value})} />
                        </div>
                        <div>
                            <p>Bộ nhớ:</p>
                            <input name="txtPDMemory" type="text" onChange={e=>setDetail({...detail,pd_memory: e.target.value})} value={info.pd_memory}/> <br/>
                        </div>
                        <div>
                            <p>Giá:</p>
                            <input name="txtPDPrice" type="text" onChange={e=>setDetail({...detail,pd_price: Number(e.target.value)})} value={info.pd_price}/> <br/>
                        </div>
                        <div>
                            <p>Số lượng:</p>
                            <input name="txtPDAmount" type="text" onChange={e=>setDetail({...detail,pd_amount: Number(e.target.value)})} value={info.pd_amount}/> <br/>
                        </div>
                        <div>
                            <p>Đã bán:</p>
                            <input name="txtPDSold" type="text" onChange={e=>setDetail({...detail,pd_sold: Number(e.target.value)})} value={info.pd_sold}/> <br/>
                        </div>
                        <div>
                            <p>Hình ảnh:</p>
                            <input type="file" id="myFile" name="filename" multiple />
                        </div>
                    </form>
                </div>
                <hr className="DetailSplit"/>
            </>
            )
        }
        <Notifications {...notify} isShow={show} onHideRequest={setShow}/>
        </>
    )
}

export default ProductDetail