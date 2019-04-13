<template>
    <div class="drag-and-drop-upload" 
        @click="click" 
        
        @dragend="draging($event)"
        @dragenter="draging($event)"
        @dragover="draging($event)"
        @drop="drop($event)"
        >
        <slot></slot>
        <input type="file" :multiple="multiple" @change="change($event)" ref="input"  hidden>
    </div>
</template>

<script>
    export default {
        name :'drag-and-drop-upload',
        props:{
            load:{
                default: true
            },
            multiple:{
                default: false,
                type: Boolean
            },
            enable: {
                default: true
            }
        },
        data(){
            return {
                files: ''
            }
        },
        methods:{
            draging(e){
                e.preventDefault();
                e.stopPropagation();
            },
            drop(e){
                e.preventDefault();
                e.stopPropagation(); 
                
                if(!this.enable)
                    return 

                this.files  = e.dataTransfer.files[0]

                if(this.multiple)
                    this.files  = e.dataTransfer.files

                this.loadFiles()
            },
            click(){
                if(!this.enable)
                    return 
                
                this.$refs.input.click()
            },
            change(e){
                this.files = e.target.files[0]

                if(this.multiple)
                    this.files = e.target.files
                e.target.value = ''
                this.loadFiles()
            },
            loadFiles(){
                if(!this.load){
                    this.$emit('change', this.files)
                    return
                }


                if(!this.multiple){
                    let reader = new FileReader
                    reader.onload = () => {
                        this.$emit('change', {
                            file : this.files,
                            data: reader.result
                        })
                    }
                    reader.readAsDataURL(this.files)
                }else{
                    let results  = []
                    this.files  = Array.from(this.files)

                    this.files.forEach((file)=>{
                        let reader = new FileReader
                        reader.onload = () => {
                            results.push({
                                file: reader.file,
                                data : reader.result
                            })
                            if(results.length == this.files.length)
                                this.$emit('change', results)
                        }
                        reader.readAsDataURL(file)
                        reader.file = file
                    })                        
                }                   
            }
        }
    }
</script>

