<template>
    <div class="radio-btn">
        <label class="d-block" ref="label">
            <input type="radio" :name="name" hidden :checked="isChecked()" :value="nativeValue">
            <button type="button" class="btn" :class="btnClass"  
                @click.prevent="check()"
            >{{ text }} </button>
        </label>
    </div>
</template>

<script>
    export default {
        name : 'radio-btn',
        props:{
            text: {
                type :String,
                default: 'text'
            },
            btnClass: {
                type: String,
                default: ''
            },
            name:{
                default: null
            },
            nativeValue:{
                default: null
            },
            checked:{
                default: false
            },
            value:{
                default: null
            }
        },
        methods:{
            check(){
                this.$refs.label.click();
                this.$emit('input', this.nativeValue)
            },
            isChecked(){
                if(this.checked)
                    return true
                if(this.value && this.nativeValue == this.value)
                    return true
                return false
            }
        }
    }
</script>

