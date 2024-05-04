import { Socket } from "socket.io";

// Định nghĩa lớp Client
class Client {
    // Thuộc tính của lớp Student
    PcID: string;
    NamePC: string;
    Network: string;
    Socket: string;
    Status: string;
    storage: string;
    vga: string;
    network: string;
    ram: string;
    cpu: string;
  
    // Constructor (phương thức khởi tạo) của lớp Student
    constructor(
      PcID: string, 
      NamePC: string, 
      Network: string, 
      Socket: string, 
      storage: string, 
      vga: string, 
      network: string, 
      ram: string, 
      cpu: string) 
      {
      this.PcID = PcID;
      this.NamePC = NamePC;
      this.Network = Network;
      this.Socket = Socket;
      this.Status = ''
      this.storage = storage;
      this.vga = vga;
      this.network = network;
      this.ram = ram;
      this.cpu = cpu;
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