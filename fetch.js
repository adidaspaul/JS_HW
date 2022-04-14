const findPetById = document.getElementById('find-pet-by-id-button');

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

const findPetByIdData = () => {
    sendRequest('GET', 'https://petstore.swagger.io/v2/pet/findByStatus?status=available').then(data => {
        document.write(JSON.stringify(data));
    });
}

const openModal = document.querySelector('#findPetById');
const closeModal = document.querySelector('.close');
const modal = document.querySelector('.modal');

openModal.addEventListener('click', () => {
    modal.showModal();
});
closeModal.addEventListener('click', () => {
    modal.close();
});


findPetById.addEventListener('click', findPetByIdData);