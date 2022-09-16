let textValue = '';

// referencias html
const text = document.querySelector('#text');
const btnCopy = document.querySelector("#copy");
const btnEncrypt = document.querySelector('#encrypt');
const btnDecrypt = document.querySelector('#decrypt');
let showText = document.querySelector('#show-text');
const imgOrText = document.querySelector("#img-or-text");

if (!showText.innerText) {

    // imagen
    const img = document.createElement('img');
    img.src = 'assets/img/muñeco.png';
    img.id = "image"
    imgOrText.appendChild(img);

    //  texto mensaje no fue encontrado
    const parragraphNoMessage = document.createElement('p');
    parragraphNoMessage.className = "p-no-message";
    parragraphNoMessage.innerText = "ningún mensaje fue encontrado";
    imgOrText.appendChild(parragraphNoMessage);

    //  texto ingresar texto
    const parragraphEnterText = document.createElement('p');
    parragraphEnterText.className = "p-enter-text";
    parragraphEnterText.innerText = "ingrese el texto que desea encriptar";
    imgOrText.appendChild(parragraphEnterText);

}

const encrypt = (array) => {

    let wordChanged = '';
    let finalWord = '';
    let arrayChanged = [];

    array.map((item) => {
        for (let i = 0; i < item.length; i++) {
            if (item[i] === 'a' || item[i] === 'e' || item[i] === 'i' || item[i] === 'o' || item[i] === 'u') {
                switch (item[i]) {
                    case 'a':
                        wordChanged = 'ai';
                        break;
                    case 'e':
                        wordChanged = 'enter';
                        break;
                    case 'i':
                        wordChanged = 'imes';
                        break;
                    case 'o':
                        wordChanged = 'ober';
                        break;
                    case 'u':
                        wordChanged = 'ufat';
                        break;
                }
                finalWord += wordChanged;
            } else {
                finalWord += item[i];
            }
        }
        arrayChanged.push(finalWord);
        finalWord = '';
    });
    return arrayChanged;
};

const decrypt = (array) => {

    let arrayWordsDecrypt = [];

    array.map(item => {

        wordItem = item;

        if (item.includes('ai')) {
            item = item.replace('ai', 'a');
        }
        if (item.includes('enter')) {
            item = item.replace('enter', 'e');
        }
        if (item.includes('imes')) {
            item = item.replace('imes', 'i');
        }
        if (item.includes('ober')) {
            item = item.replace('ober', 'o');
        }
        if (item.includes('ufat')) {
            item = item.replace('ufat', 'u');
        }

        arrayWordsDecrypt.push(item);

    })

    return arrayWordsDecrypt;
}

// ===== events ======
// evento encriptar
// value -> obtiene el valor del input
// split se encarga de separar la cadena digitada y devolverla en un array
btnEncrypt.addEventListener('click', () => {
    arrayTextValue = text.value.toLowerCase().split(' ');
    showText.innerHTML = encrypt(arrayTextValue).join(' ');
    text.value = '';

    const image = document.querySelector("#image");
    imgOrText.removeChild(image);

    const textNoMessage = document.querySelector(".p-no-message");
    imgOrText.removeChild(textNoMessage);

    const textEnterText = document.querySelector(".p-enter-text");
    imgOrText.removeChild(textEnterText);

    const buttonCopy = document.createElement("button");
    buttonCopy.classList.add('btn')
    buttonCopy.classList.add('btn-copy')
    buttonCopy.id = 'copy';
    buttonCopy.innerText = "copy";
    buttonCopy.onclick = copyText;
    imgOrText.appendChild(buttonCopy);

});

// evento desencriptar
btnDecrypt.addEventListener('click', () => {
    arrayTextValue = text.value.split(' ');
    showText.innerHTML = decrypt(arrayTextValue).join(' ');
    text.value = '';
})


const copyText = () => {
    // función para copiar texto en el portapapeles
    navigator.clipboard.writeText(showText.innerText);
    Swal.fire("Copiado en el portapapeles correctamente");
}
