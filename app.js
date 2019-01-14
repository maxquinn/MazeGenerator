import express from 'express';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config';

const app = express();
const port = 3000;

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use('/public', express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.post('/highscores', (req, res) => {
    console.log(req.body);
});

app.listen(port);
