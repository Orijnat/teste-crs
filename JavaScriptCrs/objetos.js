const pessoa= {
    nome: 'pedro',
    idade: 19,
    trabalha: false,
    dataCriacaoPessoa: new Date(Date.now()),
    enderecos:[
        {
            rua: 'rua 1',
            numero: 123,
            cidade: 'cidade 1',
        },
        {
            rua: 'rua 2',
            numero: 456,
            cidade: 'cidade 2',
        }
    ],
    fala: () => {
        console.log("oi")
    }

}

console.log(pessoa)




