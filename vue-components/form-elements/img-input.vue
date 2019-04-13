<template>
    <div class="img-input " :class="{ 'is-filled' : imgDataInner }">
        <label>
            <div class="img-input-img" v-if="!multiple" :style="'background-image:url('+ imgDataInner +')'"></div>
            <div class="img-input-text">{{ text }}</div>
            <input type="file" 
                @change="onChange" 
                :name="name" 
                :multiple="multiple"
                class="img-input-field">
        </label>                    
    </div>
</template>

<script>
export default {
    name: 'img-input',
    props:{
        value:{},
        name:{
            type: String,
            default: null
        },
        text: {
            type: String,
            required: true
        },
        imgData:{
            type: String,
            default : ''
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            imgDataInner: this.imgData,
            img: ''
        }
    },
    methods:{
        onChange(e){
            this.img = e.target.files[0]        
            let reader = new FileReader
            reader.onload = ()=>{
                this.imgDataInner = reader.result
                this.$emit('update:imgData', reader.result)
            }
            reader.readAsDataURL(this.img)
            this.$emit('input', this.img)
            this.$emit('change' , e)
        },
    },
    watch:{
        value(newVal){
            this.img = ''
            this.imgDataInner = ''
            this.$emit('update:imgData', this.imgDataInner)
        },
        'imgData'(val){
            this.imgDataInner = val
        }

    }
}
</script>

