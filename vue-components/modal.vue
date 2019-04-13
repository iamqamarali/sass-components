<template>
    <div class="modal fade"
        :class="{ show : innerShowModal }"
        >
        <div class="modal-overlay" @click="overlayClicked"></div>
        <div class="modal-dialog" :class="dialogClass">
            <div class="modal-content">
                <div class="modal-header" v-if="!noHeader && !!!$slots.header">
                    <div class="modal-title">{{ title }}</div>
                    <button class="close" @click="hide">
                            <div class="fi flaticon-close"></div>
                    </button>
                </div>

                <slot name="header"></slot>
                <slot></slot>
                <slot name="footer"></slot>
            </div>
        </div>

        <button class="modal-close-btn close" @click="hide">
            <div class="fi flaticon-close"></div>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'modal',
        props:{
            title:{
                default: null
            },
            noHeader: Boolean,
            shown:{
                default: false,
            },
            dialogClass: {
                type: String,
                default: ''
            },
            overlayClose:{
                default: true,
            }
        },
        data(){
            return {
                innerShowModal: false
            }
        },
        mounted(){
            if(this.shown)
                this.show()
            else
                this.hide()            
        },
        methods:{
            show(){
                this.innerShowModal = true
                this.$emit('update:shown', this.innerShowModal)
                this.$emit('show')
                document.querySelector('body').classList.add('modal-open')
            },
            hide(){
                this.innerShowModal = false
                this.$emit('update:shown', this.innerShowModal)
                this.$emit('hide')
                document.querySelector('body').classList.remove('modal-open')
            },
            overlayClicked(){
                if(this.overlayClose)
                    this.hide();
            }
        },
        watch:{
            shown(newVal){
                if(newVal)
                    this.show()
                else
                    this.hide()
            }
        }
    }
</script>

