import {
    ADD_TO_CART,
    ADD_COUNT_CART
} from './mutations-types'


export default{
    addToCartMut(context,payload){
        return new Promise((resolve,reject)=>{
        
            //备注：赋值为对象和数组则是浅拷贝，即改变oldProduct也会改变cartList的值!!!!
            //方法1:
            // let oldProduct = null
            
            // state.cartList.forEach(element => {
            //     if(element.id === pyload.id){
            //         oldProduct = element
            //     }
            // });
            
            // 方法2,find函数会返回符合函数判断的item
            let oldProduct = context.state.cartList.find(item=>item.id===payload.id)
            
            if(oldProduct){
                context.commit(ADD_COUNT_CART,oldProduct)
                resolve('增加了商品的数量')
            }else{
                payload.checked = true
                payload.count = 1
                context.commit(ADD_TO_CART,payload)
                resolve('增加了商品')
            }
            
        })
    }
    
}