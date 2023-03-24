import express from 'express'
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './module/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();


app.use(cors())
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    console.log('hello world')
    res.status(200)
    res.json({ message: "hello" })
})

app.use('/api', protect, router)

app.use('/user', createNewUser)
app.use('/signin', signin)

app.use((err, req, res, next) => {
    console.log(err)
    res.json({ message: "oops there was an error" })
})

export default app;