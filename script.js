//CREAR MATRIZ
function generateMatrix() {
    const rows = 26;
    const cols = 26;
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        const startCharCode = 'a'.charCodeAt(0) + (i % 26); // Start with the appropriate letter
        for (let j = 0; j < cols; j++) {
            const charCode = startCharCode + (j % 26); // Cycle through letters  
            row.push(String.fromCharCode(charCode > 'z'.charCodeAt(0) ? charCode - 26 : charCode));
        }
        matrix.push(row);
    }
    return matrix;
}
const matrix = generateMatrix();

//Pasa a mayúsculas la primera letra de cada frase.
function capitalizeFirst(frase){
    let frase_capitlized = "";
    for(i = 0; i < frase.length; i++){
        if(i == 0 || (frase[i-1] == "." || frase[i-2] == ".")){
            frase_capitlized += frase[i].toUpperCase();
        }else{
            frase_capitlized += frase[i];
        };
    }
    return frase_capitlized;
};

// MOSTRAR MATRIZ
matrix.forEach(row => console.log(row.join(' ')));

console.log("PRUEBAS");

//Captura elementos
let clave = "";
const frase_text = document.getElementById('frase');
const clave_in = document.getElementById("clave_in");
const clave_out = document.getElementById("clave_out");
const frase = "La mar estaba serena.";

const frase_encriptada_text = document.getElementById('frase_encriptada');
const frase_desencriptada_text = document.getElementById('frase_desencriptada');
const boton_encriptar = document.getElementById('boton_encriptar');
const boton_desencriptar = document.getElementById('boton_desencriptar');
let frase_encriptada = "";
frase_text.textContent = frase;




boton_encriptar.onclick = function(e){
    clave = clave_in.value;
    const clave_string = getClaveString(clave, frase);
    frase_encriptada = getEncryptedFrase(clave_string, frase);
    frase_encriptada_text.textContent = frase_encriptada;
    clave_out.value = "";
    frase_desencriptada_text.textContent = "";
};
boton_desencriptar.onclick = function(e){
    clave = clave_out.value;
    const clave_string = getClaveString(clave, frase_encriptada);
    const frase_desencriptada = getEncryptedFrase(clave_string, frase_encriptada);
    frase_desencriptada_text.textContent = capitalizeFirst(frase_desencriptada);

};

console.log("La clave es: " + clave)
console.log("La frase es: " + frase)

//FUNCION GENERAR STRING DE CLAVE CONTINUA CORRESPONDIENTE A FRASE
function getClaveString(clave, frase){
    let clave_string = "";
    let clave_index = 0;
    for(let i = 0; i < frase.length; i++ ){
        const frase_char = frase[i];
        let clave_char = "";
        if (/^[a-zA-Z]$/.test(frase_char)){
            clave_char = clave[clave_index % clave.length];
            clave_index ++
        }else{
            clave_char = frase_char;
            clave_index = 0;
        };
        clave_string += clave_char;
    };
    return clave_string;
};


function getEncryptedFrase(clave_string, frase){
    let frase_encripatada = "";
    for(let i = 0; i < frase.length; i++){
        const frase_char = frase.toLowerCase()[i];
        let clave_char = clave_string.toLowerCase()[i];

        if (/^[a-zA-Z]$/.test(frase_char)){
            const row_number = matrix[0].indexOf(frase_char);
            const col_number = matrix[row_number].indexOf(clave_char);
            frase_encripatada += matrix[0][col_number];
        }else{
            frase_encripatada += frase_char;
        };   
    };
    return frase_encripatada;
};





// const frase_desencriptada = capitalizeFirst(getEncryptedFrase(clave_string, frase_encriptada));

// console.log("Frase desnc: " + frase_desencriptada);



