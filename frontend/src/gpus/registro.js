import axios from 'axios';
import {notifyError, notifySuccess} from'../util/warningUtil.js';
import { element } from '../util/documentUtil.js';


window.addGpu = function() {
   const brand = element('brand').value;
   const model = element('model').value;
   const vram = element('vram').value;
   const price = element('price').value;

   //validación de datos
    if (brand == '' || model == '' || vram == '' || price == ''){ 
        notifyError('All fields must be filled.');
        return;
      
    }
    
    if(!vram || isNaN(vram)){
        notifyError('Introduce a valid number.');
        return;
    }


   axios.post('http://localhost:8080/gpu',{
        brand: brand,
        model: model,
        vram: vram,
        price: price
   });

   //confirmar al usuario que todo ha ido bien
   notifySuccess('GPU registered.');
        

   //vaciar el formulario
   element('brand').value = '';
   element('model').value = '';
   element('vram').value = '';
   element('price').value = '';
    };

