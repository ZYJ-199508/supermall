import {debounce} from 'common/utils' 
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
    data(){
        return{
            itemImageListener:null,
            refresh:null
        }
    },
    mounted(){
        this.refresh = debounce(this.$refs.scroll.useRefresh,500)
        this.itemImageListener = ()=>{
           this.refresh()
        }
        this.$bus.$on('imgLoadAfter',this.itemImageListener)
    }
}

export const listenerBackTop = {
    data(){
        return{
            testScrollContent:false
        }
    },
    components:{
        BackTop
    },
    methods:{
        clickBackTap(){
            this.$refs.scroll.useScrollTo(0,0,300)
          }
    }
}