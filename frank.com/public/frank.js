console.log('我是frank.js')
const request = new XMLHttpRequest()
request.open('GET', 'http://qq.com:8888/friend.json')
request.onreadystatechange = () => {
    if(request.readyState === 4 && request.status >=200 && request.status < 300){
        console.log(request.response)
    }
}
request.send()

