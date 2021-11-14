import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: 'mariadb',
    user: 'root',
    password: 'password',
    database: 'webstate', 
    host: '172.18.0.2',
})

export default pool