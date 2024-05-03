import { Socket } from "socket.io";

// Định nghĩa lớp Student
class Client {
    // Thuộc tính của lớp Student
    PcID: string;
    NamePC: string;
    Network: string;
    socket: string;
  
    // Constructor (phương thức khởi tạo) của lớp Student
    constructor(PcID: string, NamePC: string, Network: string, socket: string) {
      this.PcID = PcID;
      this.NamePC = NamePC;
      this.Network = Network;
      this.socket = socket
    }
  
    // Phương thức của lớp Student
    displayInfo() {
        console.log(`PcID: ${this.PcID}, NamePC: ${this.NamePC}, Network: ${this.Network}, socket: ${this.socket}`);
    }
  }
  export default Client;