import 'dotenv/config'
export const {
    PORT = 3000,
    PGPORT,
    PGDATABASE,
    PGHOST,
    PGPASSWORD,
    PGUSER
} = process.env