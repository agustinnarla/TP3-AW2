
import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config'

export const pool = new Pool({
    user: 'postgres',
    password: "1809" ,
    host: "localhost" ,
    database: "productos",
    port: 5432 
});


async function testDBConnection() {
    try {
        await pool.query("SELECT NOW()");
        console.log("Base de datos conectada");
    } catch (error) {
        console.error("Error conectando a la base de datos:", error);
    }
}


testDBConnection();