const path = require('path') //melhor opção para colocar o caminho para os arquivos 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'; //cria ambiente de produção e de desenvolvimento
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin') //importa refresh 


module.exports = {
    mode: isDevelopment ? 'development' : 'production', // faz um teste se o modo está em desenvolvimento ou se está em produção
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', //configuração do source-map, um para desenvolvimento e outro para produção
    entry: path.resolve(__dirname, 'src', 'index.tsx'), //mostra onde o nosso arquivo principal está
    output: { // onde sairá o arquivo convertido
        path: path.resolve(__dirname, 'dist'), //caminho
        filename:'bundle.js' //nome do arquivo
    },

    resolve: { // mostra as extensões que irá ler
        extensions: ['.js', '.jsx', '.ts','.tsx'] //indica os arquivos que serão lidos
    },

    devServer:{ //atualiza o server a cada mudança 
        contentBase: path.resolve(__dirname, 'public'), //onde esta o conteúdo estático da aplicação
        hot: true, //configuração do refresh
    },

    plugins: [ //executa o refresh somente em ambiente de desenvolvimento
        isDevelopment && new ReactRefreshWebpackPlugin(), //verifica se esta em dev; && -> foi usado pq o operador ternário ( ? :) não tem o else (:)
        new HtmlWebpackPlugin({ //injetar o react no index.html
            template: path.resolve(__dirname, 'public', 'index.html') //qual arquivo de template que irá ser utilizado
        })
    ].filter(Boolean), //utilizado para podermos ler o plugin de forma condicional, se lê: se em desenvolvimento, executa reactwebpackplugin, se false, não executa. o filter é usado para filtrar tudo que é falso (oq n é lido aqui) e remove o falso

    module: { //como a aplicação irá se comportar ao converter cada tipo de arquiv
        rules:[
                { //um objeto para cada tipo de regra 
                    test: /\.(j|t)sx$/, // verifica se o arquivo termina com .jsx
                    exclude: /node_modules/,  //exclui todos os arquivos do node_modules
                    use: { //pede para usar o loader do babel
                        loader: 'babel-loader',
                        options: { 
                            plugins: [ isDevelopment && require.resolve('react-refresh/babel') ]. filter(Boolean) //faz um objeto e adiciona um plugin, se estiver em dev faz require.resolve
                        } 
                    }, 
                }, 
                {    //rule para compilar arquivo scss (sass)
                    test: /\.scss$/, 
                    exclude: /node_modules/, 
                    use: ['style-loader', 'css-loader', 'sass-loader'] //utilizando mais de um loader, devemos colocar em um array
                }
         ],
    
    }
};