const dgram = require("dgram");

const serverSocket = dgram.createSocket("udp4"); // ipv4

/**
 * 发送数据
 *    udp,无连接协议，不需要连接到服务器然后再发送数据
 */

serverSocket.send('hello', 12345, '127.0.0.1');