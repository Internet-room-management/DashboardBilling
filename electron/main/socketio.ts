// const { EventEmitter } = require('events');
// const io = require('socket.io-client');

// class SocketIOClient extends EventEmitter {
//     constructor() {
//         super();
//         this.socket = null;
//     }

//     connect(url: any) {
//         this.socket = io(url);

//         this.socket.on('connect', () => {
//             this.emit('connect');
//         });

//         this.socket.on('disconnect', () => {
//             this.emit('disconnect');
//         });

//         this.socket.on('error', (err: any) => {
//             this.emit('error', err);
//         });

//         this.socket.on('message', (data: any) => {
//             this.emit('message', data);
//         });

//         // Thêm các sự kiện khác mà bạn muốn lắng nghe từ server

//         return this.socket;
//     }

//     disconnect() {
//         if (this.socket) {
//             this.socket.disconnect();
//             this.socket = null;
//         }
//     }

//     sendMessage(message: any) {
//         if (this.socket) {
//             this.socket.emit('message', message);
//         } else {
//             console.error('Socket is not connected.');
//         }
//     }

//     // Thêm các phương thức khác tùy thuộc vào nhu cầu của bạn
// }
//////////////////////////////////////////////

const { BrowserWindow, ipcMain } = require('electron');
const todoService = require('../services/todoService');
const io = require('socket.io')();
import Client from '../shared/models/clientPC';

export function createSocketIo(mainWindow: any) {
  let socketClient: any [] = [];
  // socket server
    // Khởi tạo mảng clients chứa các đối tượng clientpc

  //@ts-ignore
  io.on('connection', (socket) => {

    const clientIP = socket.handshake.address; // Lấy địa chỉ IP của client
    // Lọc ra địa chỉ IPv4  
    const clientIPv4 = clientIP.includes(':') ? clientIP.split(':').pop() : clientIP;       
    console.log(`socket connection:${clientIPv4}`);
  
    socket.on('register', async (dataPC:any) => {
  
      console.log(`REGISTER :${JSON.stringify(dataPC)}`, 'socket', clientIPv4);
      const client = new Client(dataPC.PcID, dataPC.NamePC, dataPC.Network, socket.id, dataPC.storage, dataPC.vga, dataPC.network, dataPC.ram, dataPC.cpu)
      socketClient.push(socket)

      const data = await todoService.addClientPc(client);
      console.log('respone', JSON.stringify(data))
      mainWindow.webContents.send('response-dataMain', JSON.stringify(data));  
  
    });
    
    socket.on("reconnect", () => {
      console.log(`socket reconnection:${clientIPv4}`);
    });

    socket.on('disconnect', async () => {
        console.log('disconnect', socket.id, clientIPv4)
        const data = await todoService.delClientPc(socket);
        console.log('respone', JSON.stringify(data))
        // Sử dụng mainWindow ở đây
        mainWindow.webContents.send('response-dataMain', JSON.stringify(data));
    });
  
  });
  
  
  // Địa chỉ IP cụ thể bạn muốn máy chủ lắng nghe kết nối
//   const ip = '192.167.1.242'; // Thay thế địa chỉ IP này bằng địa chỉ IP cụ thể của bạn
  io.listen(18092);
  //@ts-ignore
  // io.listen(18092, ip, function() {
  //     console.log('listening on localhost:18092');
  // })


}
///////////////////////////////////////////////
// console.log('socketIO', state.connecte)
// import { io } from "socket.io-client";
// const socket = io(`http://localhost:18092`,{
					
// 					transports: ["websocket"],
// 				});

// socket.on('welcome', () => {
//   console.log('on welcome : welcome received renderer'); // displayed
// //   socket.emit('test')
// });
// socket.on('error', (e) => {
//   console.log('error', e); // not displayed
// });
// socket.on('ok', () => {
//   console.log("OK received renderer"); // not displayed
// });
// socket.on('connect', () => {
//   console.log("connected renderer xx"); // displayed
// //   socket.emit('test');

//   socket.emit("register", {
// 						userid: 'userInfos.userid',
// 						shopid: 'userInfos.shopid',
// 						roleid: 'userInfos.roleid',
// 						view: 'cashier'
// 					});
// });
// // Lắng nghe sự kiện kết nối lại thành công
// socket.on('reconnect', (attemptNumber) => {
//     console.log('Reconnected on attempt:', attemptNumber);
// });
// socket.on('connect_error', (err) => {
//     console.log('Connect error:', err.message);
// });
// socket.on('disconnect', () => {
//     console.log('Disconnected from server');
// });
// socket.on('notify_bar', (data) => {
//   console.log("OK notify_bar", data); // not displayed
// });

// console.log('projectTableData', projectTableData)

// var socketUrl = window.location.protocol + "//" + window.location.host;
// // var socket = io(socketUrl, {
// // 					origins: "*",
// // 					transports: ["websocket"],
// // 				});
// console.log('socket', socket, socketUrl)
// socket.on("connected", function () {
// 					console.log("socket conectedddddddddddd")
// 					socket.emit("register", {
// 						userid: userInfos.userid,
// 						shopid: userInfos.shopid,
// 						roleid: userInfos.roleid,
// 						view: 'cashier'
// 					});

// 					socket.emit("customEvent", {
// 						name: "shopinfo",
// 						shopInfo: shopInfo,
// 						shopname: shopInfo.name_vn,
// 						shopphone: shopInfo.phones,
// 						shopaddress: shopInfo.addr,
// 						username: userInfos.username,
// 						partnerid: shopInfo.partnerid,
// 						shopid: shopInfo.id,
// 						svfee: shopInfo.svfee,
// 					});

// 					socket.emit("customEvent", {
// 						name: "changeproduct",
// 						data: $scope.list_product,
// 						typeOrder: $scope.table,
// 					});
// });
// socket.on("disconnect", (data) => {
//     if (data == "io server disconnect") disconnect();
// });

// socket.emit('notify_bar', { shopid: shopInfo.id })

// socket.emit("customEvent", {
// 							name: "changeproduct",
// 							data: $scope.list_product,
// 							typeOrder: $scope.table,
// 						});

///////////////////////////////////////////////////////////

// module.exports = SocketIOClient;
