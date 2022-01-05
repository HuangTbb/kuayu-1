# 使用方法
1. 安装 node-dev yarn global add node-dev
2. 下载代码 https://github.com/FrankFang/kuayu-1.git
3. 进入 qq-com 运行 server.js cd kuayu-1/qq-com; node-dev server.js 8888
4. 进入 frank-com 运行 server.js cd ../frank-com; node-dev server.js 9999
5. 设置 hosts
``` 
 127.0.0.1 qq.com
 127.0.0.1 frank.com
 ```
6. 打开两个页面 qq.com:8888/index.html 和 frank.com:9999/index.html
7. 记得做完之后，删掉 hosts 里的两行，否则 qq.com 无法正常访问！