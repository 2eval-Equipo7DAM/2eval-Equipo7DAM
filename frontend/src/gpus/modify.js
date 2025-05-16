import axios from 'axios';
import { element } from '../util/documentUtil.js';
import { notifySuccess, notifyError } from '../util/warningUtil.js';



window.showGpus = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')); 

    axios.get('http://localhost:8080/gpu/' + id)
        .then((response) => {
            const gpu = response.data;

            // Configurar los placeholders de los campos
            document.getElementById('brand').placeholder = videogame.brand;
            document.getElementById('model').placeholder = videogame.model;
            document.getElementById('vram').placeholder = videogame.vram;
            document.getElementById('price').placeholder = videogame.price;
        })
        .catch((error) => {
            console.error('An error ocurred while obtaining GPU:', error);
        });
};


window.saveChanges = function(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')); 

    const brand = element('brand').value
    const model = element('model').value
    const vram = element('vram').value
    const price = element('price').value

if(!brand || !model || !vram || !price){
    notifyError('All fields must be filled.');
    return;
}
    
axios.put('http://localhost:8080/gpu/' + id, {
    brand: brand,
    model: model,
    vram: vram,
    price: price
})

.then(response => {
    console.log('Server answer:', response);  // Verifica la respuesta
if (response.status === 200) {
    notifySuccess('GPU was modified.');
    }
})

};


