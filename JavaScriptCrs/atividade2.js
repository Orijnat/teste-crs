let text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur dui nibh, tincidunt eu pellentesque vel, rhoncus in ante. In eget tempor nunc. Phasellus sed est non est efficitur mollis. Nunc nec vulputate diam. Maecenas nisl nunc, efficitur vitae augue a, porttitor efficitur arcu. Vivamus ligula risus, ultrices vitae cursus eu, tempus quis nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam felis est, vehicula quis blandit lobortis, tincidunt sit amet turpis. Morbi sed libero vitae ex congue congue. Nunc sodales hendrerit ligula, ut gravida mi tristique ut. "
let i=0;
let letra="";
let vetText= text.split("");


while (i <= text.length){

    letra=text[i]
    if(letra == "a" || letra == "e" || letra == "i" || letra == "o" || letra == "u"){
        letra=vetText[i];
        letra=letra.toUpperCase();
        console.log(letra);
        text=text.replace(vetText[i], letra);
    } 
i++
}
console.log(text);







