import { createContext,useState } from "react";

export const CartContext = createContext()

export default function CartProvider(props){
   
    const [change, setChange] = useState(false)
    const _getListItem = () =>{
        return JSON.parse(window.localStorage.getItem('optopus_store') || "[]")
    }
    const [amount, setAmount] = useState(_getListItem().length)

    const _updateListItem = list =>{
        window.localStorage.setItem('optopus_store',JSON.stringify(list));
        setAmount(list.length);
    }

    const getItemList = () =>{ 
        return _getListItem()
    }

    const upItem = (id, type=0, currentColor) =>{
        let carts = _getListItem()
        let index  = carts.findIndex(item=>Number(item.id) === Number(id) && Number(item.type)===Number(type) && item.currentColor===currentColor)
        let isExist = index !== -1
        if(isExist){
            carts[index].amount++
        }
        else carts.push({id:Number(id), amount:1, type, currentColor})
        _updateListItem(carts)
        setChange(!change)
        return isExist
    }

    const forceItem = (id, type, currentColor, value) =>{
        let carts = _getListItem()
        let index  = carts.findIndex(item=>item.id === id && item.type===type && item.currentColor===currentColor)
        let isExist = index !==-1
        if(isExist)
            carts[index].amount =  value
        _updateListItem(carts)
    }

    const downItem = (id,type, currentColor) =>{
        let carts = _getListItem()
        let index  = carts.findIndex(item=>Number(item.id) === Number(id) && Number(item.type)===Number(type) && item.currentColor===currentColor)
        let isExist = index !==-1
        if(isExist){
            carts[index].amount--
            if(carts[index].amount<1) carts[index].amount=1;
        }
        setChange(!change)
        _updateListItem(carts)
    }

    const removeItem = (id,type, currentColor) =>{
        let carts = _getListItem().filter(item=>!(item.id ===id && item.type===type && item.currentColor===currentColor))
        setChange(!change)
        _updateListItem(carts)
    }

    const clearItem = () =>{
        _updateListItem([])
    }

    return(
        <CartContext.Provider value = {{upItem, downItem, removeItem,clearItem, getItemList, forceItem,change, amount}}>
            {props.children}
        </CartContext.Provider>
    )
}