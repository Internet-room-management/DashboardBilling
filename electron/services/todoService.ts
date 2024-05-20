// Dịch vụ quản lý công việc
import { forEach } from 'lodash';
import Client from '../shared/models/clientPC';

const todos:any[] = [];
let Clients: any[] = [];

function addClientPc(client:any) {
    const isObjectInArray = Clients.some(item => item.Network.IPv4 === client.Network.IPv4);

    console.log(isObjectInArray, client); // Kết quả: true
    if (isObjectInArray){
        Clients.forEach(function(item, index) {
            if (item.Network.IPv4 === client.Network.IPv4){
                item.offline()
                item.Socket = client.Socket
            }
        })
        console.log('new array', Clients)
        return Promise.resolve(Clients);
    }
    client.offline()
    Clients.push(client);

    console.log('connect add PC', Clients);
    return Promise.resolve(Clients);
}
function delClientPc(socket: any){
    // Clients = Clients.filter(item => item.socket !== socket.id);
    
    Clients.forEach(function(item, index) {
        console.log('disss', item.Socket)
        if (item.Socket == socket.id){
            console.log('dis', item.socket)
            item.disconnect()
            // break;
        }
    });
    console.log('disconnect del PC', Clients);

    return Promise.resolve(Clients);
}


function getAll() {
    return Promise.resolve(Clients);
}
module.exports = { addClientPc, getAll, delClientPc };

