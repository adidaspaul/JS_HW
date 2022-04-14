




//REQUEST FUNCTION
const sendRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        headers: data ? { 'Content-Type': 'application/json' } : {},
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status >= 400) {
            return response.json().then(errData => {
                let err = new Error('Things got out of hand');
                err.data = errData;
                throw err;
            });
        }
        return response.json();
    });
};
//PET FUNCTIONS
const findPetByIdData = () => {
    var petId = document.getElementById('pet-id').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/' + petId).then(data => {
        document.write(JSON.stringify(data));
    });
}

const findPetByStatus = () => {
    var status = document.getElementById('pet-status').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/findByStatus?status=' + status).then(data => {
        document.write(JSON.stringify(data));
    });
}

const updatePet = () => {

    sendRequest('PUT', 'https://petstore.swagger.io/v2/pet', { 'id': '1', 'name': 'doggie', 'photoUrls': ['https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg'], 'status': 'available' }).then(data => {
    }
    );
}


// MODAL OPTIONS CODE STARTS HERE
const openModalPetId = document.querySelector('#findPetById');
const openModalPetStatus = document.querySelector('#findPetByStatus');
const closeModal = document.querySelector('#close');
const closeModalPetId = document.querySelector('.close');
const modalPetId = document.querySelector('.modalPetId');
const modalPetStatus = document.querySelector('.modalPetStatus');

openModalPetId.addEventListener('click', () => {
    modalPetId.showModal();
});
closeModalPetId.addEventListener('click', () => {
    modalPetId.close();
});
openModalPetStatus.addEventListener('click', () => {
    modalPetStatus.showModal();
});
closeModal.addEventListener('click', () => {
    modalPetStatus.close();
});

// MODAL OPTIONS CODE FINISH


//FIND BUTTONS
const findPetById = document.getElementById('find-pet-by-id-button');
const findPetByStat = document.getElementById('find-pet-by-status-button');
//EVENT LISTENERS(BUTTONS) TO SEND REQUESTS-- CODE STARTS HERE

findPetById.addEventListener('click', findPetByIdData);
findPetByStat.addEventListener('click', findPetByStatus);
