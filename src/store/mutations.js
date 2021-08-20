import {
    ADD_TO_CART,
    ADD_COUNT_CART
} from './mutations-types'

export default {
    [ADD_TO_CART](state,payload){
        state.cartList.push(payload)
        // console.log(state.cartList);
    },
    [ADD_COUNT_CART](state,payload){
        //payload加是因为浅拷贝
        payload.count++
        // console.log(state.cartList);
    },
    monitorSelectAll(state,payload){
        state.cartList.forEach(element => {
            element.checked = payload
        });
    }
}