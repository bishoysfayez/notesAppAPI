
import express from 'express';
import allRoutes from './modules/index.router.js';
import connection from './DB/connection.js';


const app = express();
app.use(express.json());


app.use('/api/v1/users', allRoutes.usersRouter);
app.use('/api/v1/auth', allRoutes.authRouter);
app.use('/api/v1/notes', allRoutes.notesRouter);



connection();

app.get('/', (req, res) => res.send('Hello World!'))
app.get("*", (req, res) => {
    res.json({message:"invalid api"})
})

app.listen(3000,()=>{
    console.log('running on port 3000');

});