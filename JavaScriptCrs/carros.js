const carros=[

    {
        nome:"Gol",
        marca:"Volkswagen",
        ano: 2016,
        cor: "vermelho",
        preco: 40000,
        combustivel: "gasolina",
        ligado: false,
        ligar: function(){
            if(this.ligado == false){
                this.ligado = true
                console.log(this.ligado)
            }
            console.log("O gol já está ligado")
        },
        desligar: function(){
            if(this.ligado == true){
                this.ligado = false
                console.log(this.ligado)
            }
            console.log("O gol já está desligado")
        }
        
    },

    {
        marca:"Chevrolet",
        nome:"Astra",
        ano: 2013,
        cor: "prata",
        preco: 35000,
        combustivel: [ "gasolina", "alcool"],
        ligado: true,
        ligar: function(){
            if(this.ligado == false){
                this.ligado = true
                console.log(this.ligado)
            }
            console.log("O astra já está ligado")
        },
        desligar: function(){
            if(this.ligado == true){
                this.ligado = false
                console.log(this.ligado)
            }
            console.log("O astra já está desligado")
        }
    },

    {
        marca:"Fiat",
        nome:"marea",
        ano: 2005,
        cor: "preto",
        preco: 15000,
        combustivel: "gasolina",
        ligado: false,
        ligar: function(){
            if(this.ligado == false){
                this.ligado = true
                console.log(this.ligado)
            }
            console.log("O marea já está ligado")
        },
        desligar: function(){
            if(this.ligado == true){
                this.ligado = false
                console.log(this.ligado)
            }
            console.log("O marea já está desligado")
        }
    },

    {
        marca: "chevrolet",
        nome:"S10",
        ano: 2020,
        cor: "branco",
        preco: 120000,
        combustivel: "diesel",
        ligado: true,
        ligar: function(){
            if(this.ligado == false){
                this.ligado = true
                console.log(this.ligado)
            }
            console.log("A S10 já está ligado")
        },
        desligar: function(){
            if(this.ligado == true){
                this.ligado = false
                console.log(this.ligado)
            }
            console.log("A S10 já está desligado")
        }
    }
]

console.log(carros.forEach(carro => carro.desligar()))