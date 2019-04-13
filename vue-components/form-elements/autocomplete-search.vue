<template>
    <div class="autocomplete-search">
        <div class="input-group autocomplete-input-group">
            <div class="autocomplete-input-wrapper">
                    <input type="text" class="form-control autocomplete-input" 
                        @input="typing" @keydown="onKeyDown" v-model="query" :placeholder="placeholder"
                        @focus="$emit('focus')"
                        >
                    <div class="autocomplete-suggestions" v-if="suggestions.length">
                        <div class="autocomplete-suggestion"                         
                            v-for="(suggestion, index) in suggestions" :key="index"
                            :class="{ 'selected' : suggestionSelectedIndex == index }"
                            @click="select(suggestion)"
                            >
                            {{ suggestion.text }}
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import clickout from '../../mixins/click-out'
    export default {
        name: 'autocomplete-search',
        mixins:[clickout],
        props:{
            value:{
                type: String
            },
            placeholder:{
                type: String,
                default :''
            },
            suggestions:{
                type: Array,
                default: ()=>{
                    return []
                }
            },
            debounce:{
                type: Number,
                default : 300
            },
        },
        data(){
            return {
                interval : null,
                query: '',
                suggestionSelectedIndex: -1
            }
        },
        methods:{
            clickOutHandler(){
                this.$emit('on-clickout')
            },
            typing(e){
                this.suggestionSelectedIndex = -1 
                if(this.interval)
                    clearTimeout(this.interval)

                this.interval = setTimeout(()=>{
                    this.interval = null
                    this.$emit('input', this.query)
                }, this.debounce)
            },
            onKeyDown(e){
                let code = e.keyCode

                if(!this.suggestions.length)
                    return

                // down Key
                if(code == 40 && this.suggestionSelectedIndex < this.suggestions.length -1){
                    this.suggestionSelectedIndex++     
                }

                // up key
                if(code == 38 && this.suggestionSelectedIndex != -1){
                    this.suggestionSelectedIndex--
                }

                // enter key
                if(code == 13){
                    this.select(this.suggestions[this.suggestionSelectedIndex])
                }
            },
            select(suggestion){
                this.$emit('on-select', suggestion)
            },
        },
        watch:{
            value(newVal){
                this.query = newVal
            }
        }
    }
</script>
