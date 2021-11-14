import express from 'express'
import mariadb from 'mariadb'
import pool from './database'

const app = express()

// Home Route
app.get('/', async (req, res) => {
    res.json({
        message: 'Docker Service :D'
    })
})

const port = process.env.PORT || 8000

// Listening Server
app.listen(port, () => {
    console.log(`Server is up at port:${port}`)
})

// Para hacer petición a la base de datos 
app.get('/state', async (req, res) => {
    try {
        let sql = `SELECT * FROM webState`
        let result = await pool.query(sql)
        res.send(result)
    } catch (error) {
        throw error
    } finally {
        if (conn) {
            conn.release()
        }
    }
})

