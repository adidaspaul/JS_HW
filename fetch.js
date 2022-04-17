
//REQUEST FUNCTION
const sendRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        headers: data ? { 'Content-Type': 'application/json' } : {},
        body: JSON.stringify(data)
    }).then(response => {
        if (response.status >= 400) {
            return response.json().then(errData => {
                if (response.status === 404) {
                    document.write(JSON.stringify("PET NOT FOUND"));
                    setTimeout(() => { location.reload(); }, 2000);
                } else {
                    let err = new Error('Things got out of hand');
                    err.data = errData;
                    document.write(JSON.stringify(err.message));
                }
            });
        }
        return response.json();
    });
};
//PET FUNCTIONS
const findPetByIdData = () => {

    var petId = document.getElementById('pet-id').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/' + petId).then(data => {
        let name = data.tags[0].name;
        document.getElementById('result').innerHTML = (JSON.stringify(data.id + '<br>' + 'PET\'S NAME--> ' + data.name + "<br>" + 'STORE STATUS --> ' + data.status
            + '<br>' + 'photo--> ' + data.photoUrls[0] + '<br>' + 'TAG--> ' + name + '<br>' + 'CATEGORY--> ' + data.category.name));
        // document.write(JSON.stringify(data.id + '<br>' + 'pet\'s name--> ' + data.name + "<br>" + 'status --> ' + data.status
        //     + '<br>' + 'photo--> ' + data.photoUrls[0]));
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
        if (data.status >= 400) {
            return data.json().then(err => {
                document.write(JSON.stringify(err.message));
                setTimeout(() => { location.reload(); }, 4000);
            }
            );
        }
        document.getElementById('result2').innerHTML = (JSON.stringify(data.id + '<br>' + 'pet\'s name--> ' + data.name + "<br>" + 'status --> ' + data.status
            + '<br>' + '<br>' + 'photo--> ' + data.photoUrls[0])) + '<br>' + 'PET UPDATED.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        // document.write(JSON.stringify(data));
        setTimeout(() => { location.reload(); }, 5000);
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
        console.log(rand);
        rand = Math.floor(rand);
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
        document.getElementById('result3').innerHTML = (JSON.stringify(data.id + '<br>' + 'pet\'s name--> ' + data.name + "<br>" + 'status --> '
            + data.status + '<br>' + '<br>' + 'photo--> ' + data.photoUrls[0])) + '<br>' + 'Pet added.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        setTimeout(() => { location.reload(); }, 3000);
    });
}

const deletePetById = () => {
    var petId = document.getElementById('delete-pet-id').value;
    sendRequest('DELETE', 'https://petstore.swagger.io/v2/pet/' + petId).then(data => {
        document.getElementById('demo').innerHTML = 'Pet deleted <br> 🔄PAGE WILL REFRESH AFTER 2sec';
        setTimeout(() => { location.reload(); }, 3000);
        // document.write("deleted");
    });

}

// MODAL OPTIONS CODE STARTS HERE
//FIND PET ID MODAL
const modalPetId = document.querySelector('.modal-pet-id');
const openModalPetId = document.querySelector('#findPetById');
const closeModalPetId = document.querySelector('.close');
//---OPEN/CLOSE PET ID MODAL--------------------
openModalPetId.addEventListener('click', () => {
    modalPetId.showModal();
});
closeModalPetId.addEventListener('click', () => {
    modalPetId.close();
});

//FIND PET BY STATUS MODAL
const modalPetStatus = document.querySelector('.modal-pet-status');
const openModalPetStatus = document.querySelector('#findPetByStatus');
const closeModal = document.querySelector('#close');
//---OPEN/CLOSE PET STATUS MODAL--------------------
openModalPetStatus.addEventListener('click', () => {
    modalPetStatus.showModal();
});
closeModal.addEventListener('click', () => {
    modalPetStatus.close();
});


//UPDATE PET MODAL
const modalUpdatePet = document.querySelector('.modal-update-pet');
const openModalUpdatePet = document.querySelector('#updatePet');
const closeModalUpdatePet = document.querySelector('#closeUpdatePet');
//OPEN/CLOSE UPDATE PET MODAL----------------------
openModalUpdatePet.addEventListener('click', () => {
    modalUpdatePet.showModal();
});
closeModalUpdatePet.addEventListener('click', () => {
    modalUpdatePet.close();
});


//ADD PET MODAL
const modalAddPet = document.querySelector('.modal-add-pet');
const openModalAddPet = document.querySelector('#addPet');
const closeModalAddPet = document.querySelector('#closeAddPet');
//OPEN/CLOSE ADD PET MODAL---------------------
openModalAddPet.addEventListener('click', () => {
    modalAddPet.showModal();
});
closeModalAddPet.addEventListener('click', () => {
    modalAddPet.close();
});



//DELETE PET ID MODAL
const modalDeletePet = document.querySelector('.modal-delete-pet-by-id');
const openModalDeletePet = document.querySelector('#deletePet');
const closeModalDeletePet = document.querySelector('#close-delete-pet');
const deletePetConfirmationModal = document.querySelector('#delete-confirmation');
const openDeleteConfirmationModal = document.querySelector('#delete-pet-by-id-button');
const closeDeleteConfirmationModal = document.querySelector('#cancel-delete-confirmation-button');
const closedDeleteConfirmationModal = document.querySelector('#x-delete-confirmation-button');
//---OPEN/CLOSE DELETE PET ID MODAL--------------------
openModalDeletePet.addEventListener('click', () => {
    modalDeletePet.showModal();
});
closeModalDeletePet.addEventListener('click', () => {
    modalDeletePet.close();
});
openDeleteConfirmationModal.addEventListener('click', () => {
    deletePetConfirmationModal.showModal();
});
closeDeleteConfirmationModal.addEventListener('click', () => {
    deletePetConfirmationModal.close();
});
closedDeleteConfirmationModal.addEventListener('click', () => {
    deletePetConfirmationModal.close();
});




// MODAL OPTIONS CODE END


//FIND BUTTONS
const findPetById = document.getElementById('find-pet-by-id-button');
const findPetByStat = document.getElementById('find-pet-by-status-button');
const updatePetButton = document.getElementById('update-pet-button');
const addPetButton = document.getElementById('add-pet-button');
const deleteByIdButton = document.getElementById('delete-confirmation-button');
//EVENT LISTENERS(BUTTONS) TO SEND REQUESTS-- CODE STARTS HERE

findPetById.addEventListener('click', findPetByIdData);
findPetByStat.addEventListener('click', findPetByStatusData);
updatePetButton.addEventListener('click', updatePet);
addPetButton.addEventListener('click', addPet);
deleteByIdButton.addEventListener('click', deletePetById);


