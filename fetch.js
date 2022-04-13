const findPetById = document.getElementById('findPetById');

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
        console.log(data);
    });
}

findPetById.addEventListener('click', findPetByIdData);