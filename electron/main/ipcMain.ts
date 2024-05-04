const { BrowserWindow, ipcMain } = require('electron');
const todoService = require('../services/todoService');

// ipcMain.handle('addTodo', (event, todo) => {
//     return todoService.add(todo);
// });

// ipcMain.handle('getTodos', () => {
//     return todoService.getAll();
// });

// function registerHandlers() {
//     // ipcMain.handle('request-to-main', async (event, arg) => {
//     //     // Xử lý yêu cầu từ quá trình render
//     //     console.log('Request received from renderer:', arg);

//     //     // Trả về kết quả cho quá trình render
//     //     return 'Hello from main process!';
//     // });ipcMain.handle('getTodos', () => {
//     return todoService.getAll();

// }

// module.exports = {
//     registerHandlers
// };


// Hàm tạo các xử lý IPC
export function createIpcHandlers(mainWindow: any) {
    // ipcMain.on('some-event', (event, args) => {
    //     // Sử dụng mainWindow ở đây
    //     mainWindow.webContents.send('response-event', 'Hello from main process!');
    // });
    ipcMain.handle('addTodo', (event, todo) => {
        return todoService.add(todo);
    });
    
    ipcMain.handle('getAllPc', () => {
        return todoService.getAll();
    });
}