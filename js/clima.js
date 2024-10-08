const resultado=document.querySelector('#resultado')
const formularia=document.querySelector('#formulario')
const contenedor = document.querySelector('.container')

window.addEventListener('load',()=>{
    formularia.addEventListener('submit',buscarClima)
})

function buscarClima(e){
    e.preventDefault()
   
    const ciudad=document.querySelector('#ciudad').value 
    const pais=document.querySelector('#pais').value
 console.log(ciudad,pais)

 if(ciudad===''||pais===''){
    mostratError('error')
}else{
    consultarAPI(ciudad,pais)
}

}

function mostratError(mensaje){
    const alerta=document.querySelector('.bg-red-100')
    if(!alerta){
        const alertaM=document.createElement('div')
        alertaM.innerHTML= `<strong>${mensaje}</strong>` 
        alertaM.classList.add('bg-red-100','text-center','text-red-500','py-3','mt-4','max-w-md','mx-auto')
        
       
        contenedor.appendChild(alertaM)

        setTimeout(()=>{
            alertaM.remove()
        },3000)
       }
}

function consultarAPI(ciudad,pais){
    const appid= '5e506fee1b93a3f2c2c49258278ab291'
    let url= `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appid}`
    fetch(url)
    .then(respuesta=>{
        //console.log(respuesta)
        return respuesta.json()
    })
    .then(datos=>{
        //console.log(datos)
        if(datos.cod==='404'){
            mostratError('La ciudad no se ha encontrado , ingrese una ciudad validad por favor ')
        }else{
            mostrarHTML(datos)
             
        }

       
    })
    .catch(error=>{
        console.log(error)
    })
}

function mostrarHTML(data){
    console.log(data)
    limpiarHTML()
    const{name,main:{temp,temp_min,temp_max}} =data
    //console.log(name,temp,temp_min,temp_max)
    //Math.fround()
    const TA = Math.round(gragdoskelvinAC(temp))
    const TM = Math.round(gragdoskelvinAC(temp_max))
    const TN = Math.round(gragdoskelvinAC(temp_min))

    const Nciudad=document.createElement('p')
    Nciudad.innerHTML= `El clima en: ${name}`
    Nciudad.classList.add('text-center','text-white','text-3xl')

    const tiempo= document.createElement('p')
    tiempo.innerHTML= ` El tiempo es de: ${TA}&#8451`
    tiempo.classList.add('text-center','text-white','text-3xl')

    const tiempoMax=document.createElement('p')
    tiempoMax.innerHTML=`El tiempo maximo es de: ${TM}&#8451`
    tiempoMax.classList.add('text-center','text-white','text-3xl')


    const tiempoMin=document.createElement('p')
    tiempoMin.innerHTML=`El tiempo minimo es de: ${TN}&#8451`
    tiempoMin.classList.add('text-center','text-white','text-3xl')

    resultado.appendChild(Nciudad)
    resultado.appendChild(tiempo)
    resultado.appendChild(tiempoMax)
    resultado.appendChild(tiempoMin)
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function gragdoskelvinAC(temperatura){
    return temperatura -273.15
}

window.onload=function(){
    limpiarHTML()
    var container = document.createElement('loader')
    //container.classLists.add()
    container.innerHTML
    resultado.appendChild(container)
}