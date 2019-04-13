const Vue = require('vue')

import RadioBtn from './form-elements/radio-btn'
import autocompleteSearch from './form-elements/autocomplete-search'
import imgInput from './form-elements/img-input'
import multipleSelect from './form-elements/multiple-select'
import  dragAndDropUpload from './form-elements/drag-and-drop-upload'

import modal from './modal'
import loader from './loader'

// form-elements
Vue.component(RadioBtn.name, RadioBtn)
Vue.component(autocompleteSearch.name , autocompleteSearch)
Vue.component(imgInput.name , imgInput)
Vue.component(multipleSelect.name , multipleSelect)
Vue.component(dragAndDropUpload.name, dragAndDropUpload)

// components
Vue.component(modal.name, modal)
Vue.component(loader.name, loader)

