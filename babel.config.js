module.exports ={
    presets:[
        '@babel/preset-env',
        '@babel/preset-typescript',
        ['@babel/preset-react', {
            runtime:'automatic' //deixa o react ser importado automáticamente 
        }]
    ]
}