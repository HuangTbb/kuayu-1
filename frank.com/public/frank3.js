const script = document.createElements('script')
script.src = 'http://qq.com:8888/frand.js'
script.onload = () => {
    console.log(window.xxx)
}
document.body.appendChild(script)