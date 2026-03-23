let palindromo="assa";

function verifcaPalindromo(palavra){

    let palavraInvertida=palavra.split("").reverse().join("");
    
    if (palavraInvertida == palavra){
        console.log("É um palíndromo");
    }
    else{
        console.log("Não é um palíndromo");
    }
}

console.log(verifcaPalindromo(palindromo));