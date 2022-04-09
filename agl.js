fetch('http://agl-developer-test.azurewebsites.net/people.json')
    .then(response => response.json())
    .then(responseData => {
        getPetListForGender('Male', 'Cat', responseData).forEach(petName => {
            let table = document.getElementById("maleTable");
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            cell.innerHTML = petName;
        });

        getPetListForGender('Female', 'Cat', responseData).forEach(petName => {
            let table = document.getElementById("femaleTable");
            let row = table.insertRow(-1);
            let cell = row.insertCell(0);
            cell.innerHTML = petName;
        });

    })
    .catch(reason => {
        document.getElementById("error").style.display = "block";
        document.getElementById("success").style.display = "none";
        console.error(reason.message);
    });

function getPetListForGender(gender, petType, responseData) {

    const requestedGenderList = responseData.filter(person => person.gender === gender && person.pets != null);

    let petsList = [];
    requestedGenderList.forEach(person => petsList = [...petsList, ...person.pets]);

    return petsList.filter(pet => pet.type === petType).map(pet => pet.name).sort((pet1, pet2) => pet1.localeCompare(pet2));
}
