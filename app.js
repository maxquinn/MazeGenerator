import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';

const app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use('/public', express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Listening');
});
