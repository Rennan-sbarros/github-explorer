const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'; //Variaveis de ambiente

module.exports ={
    mode: isDevelopment ? 'development' : 'production', //ambiente de dev e produção
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', //Source maps
    entry: path.resolve(__dirname, 'src', 'index.tsx'), //Colocará a barra(/) correta de acordo com o sistema operacional
    output:{ //Qual arquivo vamos gerar com o webpack
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: { //Para que possa ler arquivo js e jsx
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        static: path.resolve(__dirname, 'public'),
        hot: true,
    },
    plugins: [
        isDevelopment && new ReactRefreshWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        })
    ].filter(Boolean),
    module: { //Configuração de como a aplicação irá se comportar quando estiver importando cada um dos tipos de arquivo
        rules: [ //array de regras 
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    }
}