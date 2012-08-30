合并混淆压缩运行在php环境下！
php服务器配置请确认 magic_quotes_gpc = off.可以修改php配置文件


compiler.jar,是google提供的压缩工具，有助与帮助你找出js中显式的错误。
也可以用 compiler.jar 来合并压缩javascript
如果你的电脑上有java运行环境可以用cmd 来压缩多个javascript文件。(跟目录中有个helloworld.bat文件可以当作实例)
当然是不能混淆压缩的


下面是 compiler 的cmd命令,更多参数可以阅读compiler的文档(去google)
java -jar compiler.jar --js helloworld/hello.js --js_output_file helloworld.js  //单个文件压缩
java -jar compiler.jar --js helloworld/hello.js --js helloworld/world.js --js_output_file helloworld.js//多文件合并

bat 最后一行加上  pause