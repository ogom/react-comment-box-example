import * as Actions from './app/actions'
import server from './server'
import { app, BrowserWindow, Menu, dialog } from 'electron'

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(
    Menu.buildFromTemplate(
      [
        {
          label: 'App',
          submenu: [
            {
              role: 'quit'
            }
          ]
        },
        {
          label: 'Comment',
          submenu: [
            {
              label: 'Clear',
              click(item, focusedWindow) {
                dialog.showMessageBox({
                  type: 'info',
                  message: 'Message!',
                  detail: 'message detail.',
                  buttons: ['OK']
                })
                focusedWindow.webContents.send('ipc::dispatch', Actions.showComments([]))
              }
            }
          ]
        }
      ]
    )
  )
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
