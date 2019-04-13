<template>
    <div class="multiple-select"  :class="{ open : open }" @click="open = true">
        <div class="multiple-select-box" >
            <div 
                v-for="(option, index) in options" :key="index"
                @click="toggleSelect(option)"

                class="option"
                :class="{'selected': selected.indexOf(option) != -1}"
                >
                {{ option.text }}    
            </div>
        </div>
    </div>
</template>

<script>
import clickOut from '../../mixins/click-out'
    export default {
        name:'multiple-select',
        mixins: [clickOut],
        props:{
            options:{
                required: true                
            }
        },
        data(){
            return{
                selected:[]
            }   
        },
        methods:{
            toggleSelect(option){
                let index = this.selected.indexOf(option)
                if( index == -1){
                    this.selected.push(option)
                }else{
                    this.selected.splice(index , 1)
                }
                this.$emit('change', this.selected)
            },
            clickOutHandler(){
                this.open = false
            }
        }
    }
</script>

