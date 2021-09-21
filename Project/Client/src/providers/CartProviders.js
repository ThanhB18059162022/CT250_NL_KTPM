import { createContext,useEffect,useState } from "react";

export const CartContext = createContext()

export default function CartProvider(props){
    const [amount, setAmount] = useState(0)

    const _getListItem = () =>{
        return JSON.parse(window.localStorage.getItem('optopus_store') || "[]")
    }

    const _updateListItem = list =>{
        window.localStorage.setItem('optopus_store',JSON.stringify(list));
        setAmount(list.length);
    }

    const getItemList = () =>{
        return _getListItem()
    }

    const upItem = id =>{
        let carts = _getListItem()
        let index  = carts.findIndex(item=>item.id === id)
        let isExist = index !== -1
        if(isExist){
            carts[index].amount++
        }
        else carts.push({id:id, amount:1})
        _updateListItem(carts)
    }

    const downItem = id =>{
        let carts = _getListItem()
        let index  = carts.findIndex(item=>item.id === id)
        let isExist = index !==-1
        if(isExist){
            carts[index].amount--
            if(carts[index].amount<1) carts[index].amount=1;
        }
        _updateListItem(carts)
    }

    const removeItem = id =>{
        let carts = _getListItem().filter(item=>item.id !==id)
        _updateListItem(carts)
    }

    const clearItem = () =>{
        _updateListItem([])
    }

    useEffect(()=>{
        _updateListItem(_getListItem())
    },[])

    return(
        <CartContext.Provider value = {{upItem, downItem, removeItem,clearItem, getItemList, amount}}>
            {props.children}
        </CartContext.Provider>
    )
}