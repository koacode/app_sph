let myPlugins = {}

myPlugins.install = function(Vue,options){
  Vue.directive(options.namen,(element,params)=>{
    element.innerHTML = params.value.toUpperCase()
    console.log(element)
    console.log(params)
  })
}

export default myPlugins