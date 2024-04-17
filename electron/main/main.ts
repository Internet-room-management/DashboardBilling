import { join } from 'path';
import {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} from 'electron';

// socket 
const io = require('socket.io')();
//@ts-ignore
io.on('connection', (client) => {
  io.emit('welcome');

  client.on("test", () => {
    console.log("received test"); // not displayed
    io.emit("ok");
  })
});

io.listen(18092);

const isDev = process.env.npm_lifecycle_event === "dev" ? true : false;

async function handleFileOpen() {
    const { canceled, filePaths } = await dialog.showOpenDialog({ title: "Open File" })
    if (!canceled) {
        return filePaths[0]
    }
}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
              width: 1200,
      height: 1080,
      icon: __dirname + '/icon.ico',
    //   maximizable: false, // Vô hiệu hóa maximize
      webPreferences: {
        // preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false,
        nodeIntegrationInWorker: true,
        nodeIntegrationInSubFrames: true,
        // enableRemoteModule: true
      }

    });
     // Accept all usb
     // @ts-ignore
     mainWindow.webContents.on('select-usb-device', (event, details, callback) => {

     })

    // and load the index.html of the app.
    if (isDev) {
        // mainWindow.loadURL('http://localhost:5173');// Open the DevTools.
        mainWindow.loadFile(join(__dirname, '../../index.html'));
        // mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, '../../index.html'));
    }
    console.log('path', join(__dirname, '../../index.html'))
    mainWindow.webContents.openDevTools({ mode: "detach" });
    // mainWindow.loadURL( //this doesn't work on macOS in build and preview mode
    //     isDev ?
    //     'http://localhost:3000' :
    //     join(__dirname, '../../index.html')
    // );
}

// function createWindows () {
//     // Create the browser window.
//     const mainWindow = new BrowserWindow({
//       // x: 0,
//       // y: 0,
//       // width: 350,
//       // height: 225,
//       width: 650,
//       height: 430,
//       icon: __dirname + '/icon.ico',
//       maximizable: false, // Vô hiệu hóa maximize
//       webPreferences: {
//         // preload: path.join(__dirname, 'preload.js'),
//         nodeIntegration: true,
//         contextIsolation: false,
//         nodeIntegrationInWorker: true,
//         nodeIntegrationInSubFrames: true,
//         // enableRemoteModule: true
//       }
//     })
//       // const ses = mainWindow.webContents.session;
//       // ses.clearCache(() => {
//       //   alert("Cache cleared!");
//       // });
  
//       // and load the index.html of the app.
      
//       // mainWindow.loadFile(path.join(__dirname, 'index.html'));
//       // and load the index.html of the app.
//       console.log(isDev)
//       if (isDev) {
//           mainWindow.loadURL('http://localhost:5173');// Open the DevTools.
//           mainWindow.webContents.openDevTools({ mode: "detach" });
//       } else {
         
//           mainWindow.loadFile(path.join(__dirname, '../../index.html'));
//       }
//        console.log('path html', __dirname)
//       mainWindow.webContents.openDevTools({ mode: "detach" });
//       // mainWindow.loadURL( //this doesn't work on macOS in build and preview mode
//       // isDev ?
//       // 'http://localhost:5174' :
//       // path.join(__dirname, '../../index.html')
//       // );
  
//       // mainWindow.on('minimize',function(event){
//       // event.preventDefault();
//       // });
  
//       // anti close
//       // mainWindow.on('close', function (event) {
//       //     event.preventDefault();
//       // });
  
//       mainWindow.setMenu(null)
//       mainWindow.setMenuBarVisibility(false)
//       mainWindow.resizable = false;
  
//       // Accept all usb
//       mainWindow.webContents.on('select-usb-device', (event, details, callback) => {
//         // Add events to handle devices being added or removed before the callback on
//         // `select-usb-device` is called.
//         mainWindow.webContents.on('usb-device-added', (event, device) => {
//           console.log('usb-device-added FIRED WITH', device)
//           // Optionally update details.deviceList
//         })
    
//         mainWindow.webContents.session.on('usb-device-removed', (event, device) => {
//           console.log('usb-device-removed FIRED WITH', device)
//           // Optionally update details.deviceList
//         })
    
//         event.preventDefault()
        
//       })
//       mainWindow.webContents.session.setPermissionCheckHandler((webContents, permission, requestingOrigin, details) => {
//         return true
//       })
//       mainWindow.webContents.session.setDevicePermissionHandler((details) => {
//         return true
//       })
     
//       // Open the DevTools.
//       // mainWindow.webContents.openDevTools({ mode: "detach" });
  
//       if (isDev) {
//         mainWindow.webContents.openDevTools({ mode: "detach" });
//         // require('react-devtools-electron');
//       };
//       if (!isDev) {
//         autoUpdater.checkForUpdates();
//       };
  
//       return mainWindow
//   }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen)
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});