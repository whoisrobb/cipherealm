import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import appRoutes from './routes';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';


/* CONFIGURATIONS */
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());


/* ROUTES */
app.use('/',
    // ClerkExpressRequireAuth({}),
    appRoutes
);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});