// Dịch vụ quản lý công việc
const todos:any[] = [];
let Clients: any[] = [];

function addClientPc(client:any) {
    Clients.push(client);
    console.log('connect add PC', Clients);
    return Promise.resolve(Clients);
}
function delClientPc(socket: any){
    Clients = Clients.filter(item => item.socket !== socket.id);
    console.log('disconnect del PC', Clients);

    return Promise.resolve(Clients);
}


function getAll() {
    return Promise.resolve(Clients);
}
module.exports = { addClientPc, getAll, delClientPc };
// export default { addClientPc, add, getAll, delClientPc };

