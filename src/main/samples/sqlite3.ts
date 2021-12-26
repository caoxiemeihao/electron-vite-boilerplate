import path from 'path'
import { app } from 'electron'
import sqlite3 from 'sqlite3'

const dbpath = path.join(app.getPath('userData'), 'sqlite3.db')
const db = new sqlite3.Database(
  dbpath,
  (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('[sqlite3] connect success.')
    console.log(dbpath)
  }
)

export {}
