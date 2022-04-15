
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
                err = errData;
                document.write(JSON.stringify(err.message));
            });
        }
        return response.json();
    });
};
//PET FUNCTIONS
const findPetByIdData = () => {

    var petId = document.getElementById('pet-id').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/' + petId).then(data => {
        document.write(JSON.stringify(data.id + '<br>' + 'pet\'s name--> ' + data.name + "<br>" + 'status --> ' + data.status
            + '<br>' + 'photo--> ' + data.photoUrls[0]));
    });
}

const findPetByStatusData = () => {
    var status = document.getElementById('pet-status').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/findByStatus?status=' + status).then(data => {
        for (var i = 0; i < data.length; i++) {
            document.write(JSON.stringify(data[i].id + '--' + data[i].name + "<br>"));
        }
    });
}

const updatePet = () => {
    var pet = {
        id: document.getElementById('updatePet-id').value,
        category: {
            id: categoryIdCheck(document.getElementById('updatePet-category').value),
            name: document.getElementById('updatePet-category').value,
        },
        name: document.getElementById('updatePet-name').value,
        photoUrls: [document.getElementById('pet-photo-url').value],
        tags: [{
            id: 1,
            name: 'Golden Tag'
        }],
        status: document.getElementById('updatePet-status').value
    }

    sendRequest('PUT', 'https://petstore.swagger.io/v2/pet', pet).then(data => {
        document.write(JSON.stringify(data));
    });
}
function categoryIdCheck(value) {
    switch (value) {
        case 'dog':
            return 1;
            break;
        case 'cat':
            return 2;
            break;
        case 'bird':
            return 3;
            break;
        case 'other':
            return 4;
            break;
        default:
            return 4;
            break;
    }
}
const addPet = () => {
    function generateRandomId(maxLimit = 900) {
        let rand = Math.random() * maxLimit;
        console.log(rand); // say 99.81321410836433.
        rand = Math.floor(rand); // 99.
        return rand;
    }
    var pet = {
        id: generateRandomId(),
        category: {
            id: categoryIdCheck(document.getElementById('add-pet-category').value),
            name: document.getElementById('add-pet-category').value,
        },
        name: document.getElementById('add-pet-name').value,
        photoUrls: [document.getElementById('add-pet-photo-url').value],
        tags: [{
            id: 1,
            name: 'Golden Tag'
        }],
        status: 'available'
    }
    sendRequest('POST', 'https://petstore.swagger.io/v2/pet', pet).then(data => {
        document.write(JSON.stringify(data));
    });
}

// MODAL OPTIONS CODE STARTS HERE
const modalPetId = document.querySelector('.modal-pet-id');
const openModalPetId = document.querySelector('#findPetById');
const closeModalPetId = document.querySelector('.close');

const modalPetStatus = document.querySelector('.modal-pet-status');
const openModalPetStatus = document.querySelector('#findPetByStatus');
const closeModal = document.querySelector('#close');


const modalUpdatePet = document.querySelector('.modal-update-pet');
const openModalUpdatePet = document.querySelector('#updatePet');
const closeModalUpdatePet = document.querySelector('#closeUpdatePet');

const modalAddPet = document.querySelector('.modal-add-pet');
const openModalAddPet = document.querySelector('#addPet');
const closeModalAddPet = document.querySelector('#closeAddPet');



//---OPEN/CLOSE PET ID MODAL--------------------
openModalPetId.addEventListener('click', () => {
    modalPetId.showModal();
});
closeModalPetId.addEventListener('click', () => {
    modalPetId.close();
});

//---OPEN/CLOSE PET STATUS MODAL--------------------
openModalPetStatus.addEventListener('click', () => {
    modalPetStatus.showModal();
});
closeModal.addEventListener('click', () => {
    modalPetStatus.close();
});

//OPEN/CLOSE UPDATE PET MODAL----------------------
openModalUpdatePet.addEventListener('click', () => {
    modalUpdatePet.showModal();
});
closeModalUpdatePet.addEventListener('click', () => {
    modalUpdatePet.close();
});

//OPEN/CLOSE ADD PET MODAL---------------------
openModalAddPet.addEventListener('click', () => {
    modalAddPet.showModal();
});
closeModalAddPet.addEventListener('click', () => {
    modalAddPet.close();
});

// MODAL OPTIONS CODE END


//FIND BUTTONS
const findPetById = document.getElementById('find-pet-by-id-button');
const findPetByStat = document.getElementById('find-pet-by-status-button');
const updatePetButton = document.getElementById('update-pet-button');
const addPetButton = document.getElementById('add-pet-button');
//EVENT LISTENERS(BUTTONS) TO SEND REQUESTS-- CODE STARTS HERE

findPetById.addEventListener('click', findPetByIdData);
findPetByStat.addEventListener('click', findPetByStatusData);
updatePetButton.addEventListener('click', updatePet);
addPetButton.addEventListener('click', addPet);

