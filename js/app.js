if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then((res) => {
        console.log("service worker registered", res)
    })
    .catch((err)=>{
        console.log("not regsitered ", err)
    })
}