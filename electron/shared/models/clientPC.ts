import { Socket } from "socket.io";

// Định nghĩa lớp Student
class Client {
    // Thuộc tính của lớp Student
    PcID: string;
    NamePC: string;
    Network: string;
    Socket: string;
    Status: string;
  
    // Constructor (phương thức khởi tạo) của lớp Student
    constructor(PcID: string, NamePC: string, Network: string, Socket: string) {
      this.PcID = PcID;
      this.NamePC = NamePC;
      this.Network = Network;
      this.Socket = Socket;
      this.Status = ''
    }
  
    // Phương thức của lớp Student
    displayInfo() {
        console.log(`PcID: ${this.PcID}, NamePC: ${this.NamePC}, Network: ${this.Network}, socket: ${this.Socket}`);
    }
    // Online PC
    online (){
      this.Status = 'Online'
    }
    // Offline PC
    offline(){
      this.Status = 'Offline'
    }
    disconnect(){
      this.Status = 'Disconnect'
    }
  }
  export default Client;