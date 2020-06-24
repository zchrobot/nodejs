import * as dotenv from 'dotenv';

dotenv.config();
import app from './app';
import * as express from 'express';
import * as mongoose from 'mongoose';


const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true }, (err) => {
    // if (err) throw err;
});

app.use('/assets', express.static(`${__dirname}/public`));
app.set('view engine', 'esj');

app.listen(port, (err) => {
    if (err) {
        return console.log(err)
    }
    return console.log(`server is listening on ${port}`)
});