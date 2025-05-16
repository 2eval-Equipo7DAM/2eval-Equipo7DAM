import axios from 'axios';
import { element, icon, td } from '../util/documentUtil.js';
import { notifySuccess } from '../util/warningUtil.js';


window.readGpus = function() {
    axios.get('http://localhost:8080/gpu')
        .then((response) => {
            const gpuList = response.data;
            const gpuTable = element('tableBody');

            gpuList.forEach(gpu => {
                const row =  document.createElement('tr');
                row.id = 'gpu-' + gpu.id;
                row.innerHTML = td(gpu.brand) + 
                                td(gpu.model) + 
                                td(gpu.vram) + 
                                td (gpu.price) + 
                                '<a class="btn btn-info" href="/gpus/modify.html?id='+ gpu.id+'">' +
                                icon('edit') +
                                '</a> ' +  '<a class="btn btn-danger" href="javascript:removeGpu('+ gpu.id + ')">' + 
                                icon('delete') +
                                '</a>';
                gpuTable.appendChild(row);
            })
        });
};

window.removeGpu = function(id) {
    if(confirm('Are you sure you want to delete this GPU?')){
    axios.delete('http://localhost:8080/gpu/' + id)
        .then((response) => {
            if (response.status == 200){
                notifySuccess('GPU deleted successfully.');
                element('gpu-' + id).remove();
            }
        });
    }
};