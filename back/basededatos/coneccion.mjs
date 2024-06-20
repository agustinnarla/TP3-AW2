import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME

export const pool = new pg.Pool({
    user: DB_USER,
    password: DB_PASS,
    host:DB_HOST,
    port:DB_PORT,
    database:DB_NAME
}
)