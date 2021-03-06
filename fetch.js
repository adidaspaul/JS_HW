
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
                    document.write(JSON.stringify("NOT FOUND"));
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
}
//SERVICE FUNCTIONS
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
function verifyId(input) {
    return fetch('https://petstore.swagger.io/v2/pet/' + input, {
        method: 'GET',
        headers: {},
        body: null
    }).then(response => {
        if (response.status >= 400) { return false; }
        return true;
    })
}
function generateRandomId(maxLimit = 900) {
    let rand = Math.random() * maxLimit;
    console.log(rand);
    rand = Math.floor(rand);
    return rand;
}
//PET FUNCTIONS
const getPetById = () => {

    var petId = document.getElementById('pet-id').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/' + petId).then(data => {
        let name = data.tags[0].name;
        document.getElementById('result').innerHTML = (JSON.stringify(data.id + '<br>' + 'PET\'S NAME--> ' + data.name + "<br>" + 'STORE STATUS☑️ --> ' + data.status
            + '<br>' + 'photo--> ' + data.photoUrls[0] + '<br>' + 'TAG--> ' + name + '<br>' + 'CATEGORY--> ' + data.category.name));
        console.log(JSON.stringify(data.id + '<br>' + 'PET\'S NAME--> ' + data.name + "<br>" + 'STORE STATUS☑️ --> ' + data.status
            + '<br>' + 'photo--> ' + data.photoUrls[0] + '<br>' + 'TAG--> ' + name + '<br>' + 'CATEGORY--> ' + data.category.name))

    });
}

const getPetsByStatus = () => {
    var status = document.getElementById('pet-status').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/findByStatus?status=' + status).then(data => {
        for (var i = 0; i < data.length; i++) {
            document.write(JSON.stringify(data[i].id + '--' + data[i].name + "<br>"));
            console.log(JSON.stringify(data[i].id + '--' + data[i].name + "<br>"))
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
                console.log(JSON.stringify(err.message));
                // setTimeout(() => { location.reload(); }, 4000);
            }
            );
        }
        document.getElementById('result2').innerHTML = (JSON.stringify(data.id + '<br>' + 'pet\'s name--> ' + data.name + "<br>" + 'status --> ' + data.status
            + '<br>' + '<br>' + 'photo--> ' + data.photoUrls[0])) + '<br>' + 'PET UPDATED.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        console.log(JSON.stringify(data.id + '<br>' + 'pet\'s name--> ' + data.name + "<br>" + 'status --> ' + data.status
            + '<br>' + '<br>' + 'photo--> ' + data.photoUrls[0]));
        // setTimeout(() => { location.reload(); }, 5000);
    });
}

const addPet = () => {

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
        console.log(JSON.stringify(data.id + '<br>' + 'pet\'s name--> ' + data.name + "<br>" + 'status --> '
            + data.status + '<br>' + '<br>' + 'photo--> ' + data.photoUrls[0]));
        // setTimeout(() => { location.reload(); }, 3000);
    });
}

const deletePetById = () => {
    var petId = document.getElementById('delete-pet-id').value;
    sendRequest('DELETE', 'https://petstore.swagger.io/v2/pet/' + petId).then(data => {
        document.getElementById('demo').innerHTML = 'Pet deleted <br> 🔄PAGE WILL REFRESH AFTER 2sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 3000);

    });

}

const updatePetInStore = () => {

    const id = document.getElementById('update-pet-in-store').value;
    const updateName = document.getElementById('update-pet-in-store-name').value;
    if (id === '') {
        document.getElementById('result4').innerHTML = 'Please enter pet id';
    } else if (!verifyId(id)) {
        document.getElementById('result4').innerHTML = 'Entered ID is not valid';

    } else if (updateName === '') {
        document.getElementById('result4').innerHTML = 'Please enter pet name';

    } else {
        const url = `https://petstore.swagger.io/v2/pet/${id}`;
        fetch(url, {
            method: 'POST',
            body: new URLSearchParams('name=' + updateName +
                '&status=' + document.getElementById('update-pet-in-store-status').value),
        }).then(response => {
            document.getElementById('result4').innerHTML = 'UPDATED.<br> 🔄PAGE WILL REFRESH AFTER 3sec';
            console.log(response);
            // setTimeout(() => { location.reload(); }, 3000);
        }
        ).catch(error => {
            return error.json().then(err => {
                document.write(JSON.stringify(err.text()));
                console.log(JSON.stringify(err.text()));
            }
            );
        });
    }
}

const uploadPetPhoto = (e) => {
    e.preventDefault();
    var petId = document.getElementById('upload-pet-photo-id').value;
    console.log(verifyId(petId));
    if (!verifyId(petId)) {
        document.getElementById('result5').innerHTML = 'Entered ID is not valid';
        return null;
    }
    var photo = document.getElementById('upload-pet-photo').files[0];
    if (petId === '') {
        document.getElementById('result5').innerHTML = 'Please enter valid pet id';
        return null;
    }
    else {
        var FD = new FormData();
        let h = new Headers();
        const url = `https://petstore.swagger.io/v2/pet/${petId}/uploadImage`;
        FD.append('file', photo, 'avatar.png');
        h.append('Accept', 'application/json');
        fetch(url, {
            method: 'POST',
            body: FD,
        }).then(response => {
            if (response.status >= 400) {
                return response.json().then(err => {
                    document.write(JSON.stringify(err.message));
                }
                );
            }
            document.getElementById('result5').innerHTML = 'UPDATED.<br> 🔄PAGE WILL REFRESH AFTER 3sec';
            console.log(response);
            // setTimeout(() => { location.reload(); }, 3000);
        }
        ).catch(error => {
            return error.json().then(err => {
                document.write(JSON.stringify(err.text()));
                console.log(JSON.stringify(err.text()));
            }
            );
        });
    }
}
const placePetOrder = () => {
    var order = {
        id: generateRandomId(),
        petId: document.getElementById('purchase-order-pet-id').value,
        quantity: document.getElementById('order-quantity').value,
        shipDate: new Date().toISOString(),
        status: 'placed',
        complete: true
    };
    sendRequest('POST', 'https://petstore.swagger.io/v2/store/order', order).then(data => {
        document.getElementById('result6').innerHTML = (JSON.stringify('Your Order ID' + data.id
            + '<br>' + 'pet\'s ID--> ' + data.petId + "<br>" + 'status --> ' + data.status + '<br>'
            + 'quantity--> ' + data.quantity + '<br>' + 'shipDate ' + data.shipDate)) + '<br>' + '🛒Order placed.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        console.log(JSON.stringify('Your Order ID' + data.id
            + '<br>' + 'pet\'s ID--> ' + data.petId + "<br>" + 'status --> ' + data.status + '<br>'
            + 'quantity--> ' + data.quantity + '<br>' + 'shipDate ' + data.shipDate));
        // setTimeout(() => { location.reload(); }, 5000);
    }
    ).catch(error => {
        return error.json().then(err => {
            document.write(JSON.stringify(err.text()));
        }
        );
    }
    );
}
const findOrderById = () => {
    var orderId = document.getElementById('find-order-by-id').value;
    if (orderId === '') {
        document.getElementById('result7').innerHTML = 'Please enter order id';
    } else if (!verifyId(orderId)) {
        document.getElementById('result7').innerHTML = 'Entered ID is not valid';
    } else {
        sendRequest('GET', 'https://petstore.swagger.io/v2/store/order/' + orderId).then(data => {
            document.getElementById('result7').innerHTML = (JSON.stringify('Order ID' + data.id
                + '<br>' + 'pet\'s ID--> ' + data.petId + "<br>" + 'status --> ' + data.status + '<br>'
                + 'quantity--> ' + data.quantity + '<br>' + 'shipDate ' + data.shipDate)) + '<br>' + 'Order found.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
            console.log(JSON.stringify('Order ID' + data.id
                + '<br>' + 'pet\'s ID--> ' + data.petId + "<br>" + 'status --> ' + data.status + '<br>'
                + 'quantity--> ' + data.quantity + '<br>' + 'shipDate ' + data.shipDate));
            // setTimeout(() => { location.reload(); }, 5000);
        }
        ).catch(error => {
            return error.json().then(err => {
                document.write(JSON.stringify(err.text()));
            }
            );
        }
        );
    }
}
const inventory = () => {
    sendRequest('GET', 'https://petstore.swagger.io/v2/store/inventory').then(data => {
        document.getElementById('result8').innerHTML = (JSON.stringify('Sold->' + data.sold + '<br>'
            + 'Pending->' + data.pending + '<br>' + 'Available-> ' + data.available)) + '<br>' + '🛒Inventory found.<br>';
        console.log(JSON.stringify('Sold->' + data.sold + '<br>'
            + 'Pending->' + data.pending + '<br>' + 'Available-> ' + data.available));
    }
    ).catch(error => {
        return error.json().then(err => {
            document.write(JSON.stringify(err.text()));
            console.log(JSON.stringify(err.text()));
        }
        );
    }
    );
}
const deleteOrder = () => {
    var orderId = document.getElementById('delete-order-id').value;
    if (orderId === '') {
        document.getElementById('result9').innerHTML = 'Please enter order id';
    } else {
        sendRequest('DELETE', 'https://petstore.swagger.io/v2/store/order/' + orderId).then(data => {
            document.getElementById('demo1').innerHTML = 'Order deleted.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
            console.log(data);
            // setTimeout(() => { location.reload(); }, 5000);
        });
    }
}
const createUserArray = () => {
    var user = [
        {
            id: generateRandomId(),
            username: document.getElementById('create-user-array-name').value,
            firstName: document.getElementById('create-user-array-fn').value,
            lastName: document.getElementById('create-user-array-ln').value,
            email: document.getElementById('create-user-array-email').value,
            password: document.getElementById('create-user-array-password').value,
            phone: document.getElementById('create-user-array-phone').value,
            userStatus: 1
        }
    ]
    sendRequest('POST', 'https://petstore.swagger.io/v2/user/createWithArray', user).then(data => {
        document.getElementById('result10').innerHTML = JSON.stringify(data) + '<br> 🙋‍♂️ User Array created.<br>  🔄PAGE WILL REFRESH AFTER 3sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 3000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
}
const createUserList = () => {
    var user = [
        {
            id: generateRandomId(),
            username: document.getElementById('create-user-list-name').value,
            firstName: document.getElementById('create-user-list-fn').value,
            lastName: document.getElementById('create-user-list-ln').value,
            email: document.getElementById('create-user-list-email').value,
            password: document.getElementById('create-user-list-password').value,
            phone: document.getElementById('create-user-list-phone').value,
            userStatus: 1
        }
    ]
    sendRequest('POST', 'https://petstore.swagger.io/v2/user/createWithList', user).then(data => {
        document.getElementById('result11').innerHTML = '🙋‍♂️ User List created. 🔄PAGE WILL REFRESH AFTER 3sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 3000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
}
const updateUser = () => {
    var userName = document.getElementById('user-name-to-update').value;
    var user = {
        id: document.getElementById('update-user-id').value,
        username: document.getElementById('update-user-username').value,
        firstName: document.getElementById('update-user-fn').value,
        lastName: document.getElementById('update-user-ln').value,
        email: document.getElementById('update-user-email').value,
        password: document.getElementById('update-user-password').value,
        phone: document.getElementById('update-user-phone').value,
        userStatus: 1
    }
    sendRequest('PUT', 'https://petstore.swagger.io/v2/user/' + userName, user).then(data => {
        document.getElementById('result13').innerHTML = 'User updated.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 5000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
}
const createUser = () => {
    var user = {
        id: generateRandomId(),
        username: document.getElementById('create-username').value,
        firstName: document.getElementById('create-user-fn').value,
        lastName: document.getElementById('create-user-ln').value,
        email: document.getElementById('create-user-email').value,
        password: document.getElementById('create-user-password').value,
        phone: document.getElementById('create-user-phone').value,
        userStatus: 1
    }
    sendRequest('POST', 'https://petstore.swagger.io/v2/user', user).then(data => {
        document.getElementById('result14').innerHTML = 'User created.<br> 🔄PAGE WILL REFRESH AFTER 3sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 3000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
}
const getUser = () => {
    var userName = document.getElementById('find-user-username').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/user/' + userName).then(data => {
        document.getElementById('result12').innerHTML = JSON.stringify(data) + '<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 5000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
}
const login = () => {
    var userName = document.getElementById('login-username').value;
    var password = document.getElementById('login-password').value;
    sendRequest('GET', 'https://petstore.swagger.io/v2/user/login?username=' + userName + '&password=' + password).then(data => {
        document.getElementById('result15').innerHTML = JSON.stringify(data.message) + '<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 5000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
}
const logout = () => {
    sendRequest('GET', 'https://petstore.swagger.io/v2/user/logout').then(data => {
        document.getElementById('result16').innerHTML = 'Logged out.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 5000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
}
const deleteUser = () => {
    var userName = document.getElementById('delete-username').value;
    sendRequest('DELETE', 'https://petstore.swagger.io/v2/user/' + userName).then(data => {
        document.getElementById('result17').innerHTML = 'User deleted.<br> 🔄PAGE WILL REFRESH AFTER 5sec';
        console.log(data);
        // setTimeout(() => { location.reload(); }, 5000);
    }
    ).catch(err => {
        document.write(`Error: ${err}`);
        console.error('There was an error!', err);
    }
    );
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


// UPDATE PET IN STORE MODAL
const modalUpdatePetInStore = document.querySelector('.modal-update-pet-in-store');
const openModalUpdatePetInStore = document.querySelector('#updatePetInStore');
const closeModalUpdatePetInStore = document.querySelector('#closeUpdatePetInStore');
// OPEN/CLOSE UPDATE IN STORE MODAL
openModalUpdatePetInStore.addEventListener('click', () => {
    modalUpdatePetInStore.showModal();
});
closeModalUpdatePetInStore.addEventListener('click', () => {
    modalUpdatePetInStore.close();
});


//UPLOAD PET PHOTO MODAL
const modalUploadPetPhoto = document.querySelector('.modal-upload-pet-photo');
const openModalUploadPetPhoto = document.querySelector('#uploadPetPhoto');
const closeModalUploadPetPhoto = document.querySelector('#closeUploadPetPhoto');
//OPEN/CLOSE UPLOAD PET PHOTO MODAL
openModalUploadPetPhoto.addEventListener('click', () => {
    modalUploadPetPhoto.showModal();
}
);
closeModalUploadPetPhoto.addEventListener('click', () => {
    modalUploadPetPhoto.close();
}
);


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


// PLACE ORDER MODAL---------------------------------------
const modalPlaceOrder = document.querySelector('.modal-place-order');
const openModalPlaceOrder = document.querySelector('#placeOrder');
const closeModalPlaceOrder = document.querySelector('#closePlaceOrder');
//OPEN/CLOSE PLACE ORDER MODAL
openModalPlaceOrder.addEventListener('click', () => {
    modalPlaceOrder.showModal();
});
closeModalPlaceOrder.addEventListener('click', () => {
    modalPlaceOrder.close();
});


//FIND ORDER BY ID MODAL
const modalFindOrderById = document.querySelector('.modal-find-order-by-id');
const openModalFindOrderById = document.querySelector('#findOrderById');
const closeModalFindOrderById = document.querySelector('#closeFindOrderById');
//OPEN/CLOSE FIND ORDER BY ID MODAL
openModalFindOrderById.addEventListener('click', () => {
    modalFindOrderById.showModal();
}
);
closeModalFindOrderById.addEventListener('click', () => {
    modalFindOrderById.close();
}
);


//SHOW INVENTORY MODAL
const modalShowInventory = document.querySelector('.modal-inventory-status');
const openModalShowInventory = document.querySelector('#invetoryStatus');
const closeModalShowInventory = document.querySelector('#closeInventoryStatus');
//OPEN/CLOSE SHOW INVENTORY MODAL
openModalShowInventory.addEventListener('click', () => {
    modalShowInventory.showModal();
}
);
closeModalShowInventory.addEventListener('click', () => {
    modalShowInventory.close();
}
);


//DELETE ORDER MODAL
const modalDeleteOrder = document.querySelector('.modal-delete-order-by-id');
const openModalDeleteOrder = document.querySelector('#deleteOrder');
const closeModalDeleteOrder = document.querySelector('#closeDeleteOrder');
const deleteConfirmationOrderModal = document.querySelector('#delete-confirmation-order');
const openDeleteConfirmationOrderModal = document.querySelector('#delete-order-by-id-button');
const closeDeleteConfirmationOrderModal = document.querySelector('#cancel-delete-confirmation-order-button');
const closedDeleteConfirmationOrderModal = document.querySelector('#x-delete-confirmation-order-modal');
//OPEN/CLOSE DELETE ORDER MODAL
openModalDeleteOrder.addEventListener('click', () => {
    modalDeleteOrder.showModal();
}
);
closeModalDeleteOrder.addEventListener('click', () => {
    modalDeleteOrder.close();
}
);
openDeleteConfirmationOrderModal.addEventListener('click', () => {
    deleteConfirmationOrderModal.showModal();
}
);
closeDeleteConfirmationOrderModal.addEventListener('click', () => {
    deleteConfirmationOrderModal.close();
}
);
closedDeleteConfirmationOrderModal.addEventListener('click', () => {
    deleteConfirmationOrderModal.close();
}
);


//CREATE USER ARRAY MODAL
const modalCreateUserArray = document.querySelector('.modal-create-user-array');
const openModalCreateUserArray = document.querySelector('#createUserArray');
const closeModalCreateUserArray = document.querySelector('#closeCreateUserArray');
//OPEN/CLOSE CREATE USER ARRAY MODAL
openModalCreateUserArray.addEventListener('click', () => {
    modalCreateUserArray.showModal();
}
);
closeModalCreateUserArray.addEventListener('click', () => {
    modalCreateUserArray.close();
}
);


//CREATE USER LIST MODAL
const modalCreateUserList = document.querySelector('.modal-create-user-list');
const openModalCreateUserList = document.querySelector('#createUserList');
const closeModalCreateUserList = document.querySelector('#closeCreateUserList');
//OPEN/CLOSE CREATE USER LIST MODAL
openModalCreateUserList.addEventListener('click', () => {
    modalCreateUserList.showModal();
}
);
closeModalCreateUserList.addEventListener('click', () => {
    modalCreateUserList.close();
}
);


//UPDATE USER MODAL
const modalUpdateUser = document.querySelector('.modal-update-user');
const openModalUpdateUser = document.querySelector('#updateUser');
const closeModalUpdateUser = document.querySelector('#closeUpdateUser');
//OPEN/CLOSE UPDATE USER MODAL
openModalUpdateUser.addEventListener('click', () => {
    modalUpdateUser.showModal();
}
);
closeModalUpdateUser.addEventListener('click', () => {
    modalUpdateUser.close();
}
);


//FIND USER MODAL
const modalFindUser = document.querySelector('.modal-find-user');
const openModalFindUser = document.querySelector('#findUser');
const closeModalFindUser = document.querySelector('#closeFindUser');
//OPEN/CLOSE FIND USER MODAL
openModalFindUser.addEventListener('click', () => {
    modalFindUser.showModal();
}
);
closeModalFindUser.addEventListener('click', () => {
    modalFindUser.close();
}
);


//CREATE USER MODAL
const modalCreateUser = document.querySelector('.modal-create-user');
const openModalCreateUser = document.querySelector('#createUser');
const closeModalCreateUser = document.querySelector('#closeCreateUser');
//OPEN/CLOSE CREATE USER MODAL
openModalCreateUser.addEventListener('click', () => {
    modalCreateUser.showModal();
}
);
closeModalCreateUser.addEventListener('click', () => {
    modalCreateUser.close();
}
);


//LOGIN MODAL
const modalLogin = document.querySelector('.modal-login-user');
const openModalLogin = document.querySelector('#loginUser');
const closeModalLogin = document.querySelector('#closeLoginUser');
//OPEN/CLOSE LOGIN MODAL
openModalLogin.addEventListener('click', () => {
    modalLogin.showModal();
}
);
closeModalLogin.addEventListener('click', () => {
    modalLogin.close();
}
);


//LOGOUT MODAL
const modalLogout = document.querySelector('.modal-logout-user');
const openModalLogout = document.querySelector('#logout');
const closeModalLogout = document.querySelector('#closeLogout');
//OPEN/CLOSE LOGOUT MODAL
openModalLogout.addEventListener('click', () => {
    modalLogout.showModal();
}
);
closeModalLogout.addEventListener('click', () => {
    modalLogout.close();
}
);

//DELETE USER MODAL
const modalDeleteUser = document.querySelector('.modal-delete-user');
const openModalDeleteUser = document.querySelector('#deleteUser');
const closeModalDeleteUser = document.querySelector('#closeDeleteUser');
//OPEN/CLOSE DELETE USER MODAL
openModalDeleteUser.addEventListener('click', () => {
    modalDeleteUser.showModal();
}
);
closeModalDeleteUser.addEventListener('click', () => {
    modalDeleteUser.close();
}
);


// MODAL OPTIONS CODE END


//SUBMIT BUTTONS
const findPetById = document.getElementById('find-pet-by-id-button');
const findPetByStat = document.getElementById('find-pet-by-status-button');
const updatePetButton = document.getElementById('update-pet-button');
const addPetButton = document.getElementById('add-pet-button');
const deleteByIdButton = document.getElementById('delete-confirmation-button');
const updatePetInStoreButton = document.getElementById('update-pet-in-store-button');
const uploadPetPhotoButton = document.getElementById('upload-pet-photo-button');
const placePetOrderButton = document.getElementById('place-order-for-pet-button');
const findOrderByIdButton = document.getElementById('find-order-by-id-button');
const petInventory = document.getElementById('invetoryStatus');
const deleteOrderButton = document.getElementById('delete-confirmation-order-button');
const createUserArrayButton = document.getElementById('create-user-array-button');
const createUserListButton = document.getElementById('create-user-list-button');
const updateUserButton = document.getElementById('update-user-button');
const findUserButton = document.getElementById('find-user-button');
const createUserButton = document.getElementById('create-user-button');
const loginButton = document.getElementById('login-user-button');
const logoutButton = document.getElementById('logout-user-button');
const deleteUserButton = document.getElementById('delete-user-button');
//EVENT LISTENERS(BUTTONS) TO SEND REQUESTS-- CODE STARTS HERE

findPetById.addEventListener('click', getPetById);
findPetByStat.addEventListener('click', getPetsByStatus);
updatePetButton.addEventListener('click', updatePet);
addPetButton.addEventListener('click', addPet);
deleteByIdButton.addEventListener('click', deletePetById);
updatePetInStoreButton.addEventListener('click', updatePetInStore);
uploadPetPhotoButton.addEventListener('click', uploadPetPhoto);
placePetOrderButton.addEventListener('click', placePetOrder);
findOrderByIdButton.addEventListener('click', findOrderById);
petInventory.addEventListener('click', inventory);
deleteOrderButton.addEventListener('click', deleteOrder);
createUserArrayButton.addEventListener('click', createUserArray);
createUserListButton.addEventListener('click', createUserList);
updateUserButton.addEventListener('click', updateUser);
findUserButton.addEventListener('click', getUser);
createUserButton.addEventListener('click', createUser);
loginButton.addEventListener('click', login);
logoutButton.addEventListener('click', logout);
deleteUserButton.addEventListener('click', deleteUser);


