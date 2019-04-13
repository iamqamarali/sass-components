<template>
    <div class="loader" v-if="shown">
        <div class="spinner loader-spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
        <div class="loader-message"
            v-if="message"
            v-html="message">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loader',
        props:{
            message:{
                type: String,
                default :'',
            },
            shown: {
                default : true,
            }
        },
        mounted(){
            if(this.show)
                this.show()
        },
        destroyed(){
            this.hide()
        },
        methods:{
            show(){
                let body = document.querySelector('body')
                body.classList.add('loader-show')
            },
            hide(){
                let body = document.querySelector('body')
                body.classList.remove('loader-show')            
            }
        },
        watch:{
            show(val){
                if(val)
                    this.showLoader()
                else
                    this.hideLoader()
            }
        }
    }
</script>

