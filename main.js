/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const crashReporter = electron.crashReporter;
const path = require('path');
const Menu = electron.Menu;
let mainWindow = null;

let menu;
let template;


crashReporter.start();




app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 450,
        height: 300,
        resizable: true,
        frame: true
    });

    let urlparams = '';

    mainWindow.loadURL(path.normalize('file://' + path.join(__dirname, '/index.html')));

    app.on('will-finish-launching', function() {
        app.on('open-file', function(event, url) {
            event.preventDefault();
            urlparams = url;
            mainWindow.webContents.send('params', 'test:'+url);
        });
    });

    app.on('open-file', function(event, url) {
        event.preventDefault();
        urlparams = url;
        mainWindow.webContents.send('params', 'test:'+url);

    });

    mainWindow.openDevTools();


    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    app.on('window-all-closed', () => {
        app.quit();
    });

});
