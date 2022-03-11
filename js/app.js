document.querySelector('#generate-names').addEventListener('submit', loadNames);

function loadNames(e) {
    e.preventDefault();

    // Read the values from the form
    const house = document.querySelector('#house').value,
        gender = document.querySelector('#genre').value,
        amount = document.querySelector('#quantity').value;

    // Build the URL
    let url = '//hp-api.herokuapp.com/api/characters';

    // Create XMLHTTPRequest Object
    const xhr = new XMLHttpRequest();

    // Open the connection
    xhr.open('GET', url, true);

    xhr.onload = function () {
        if (this.status === 200) {

            // Get the response as an object
            const names = JSON.parse(this.responseText);

            let genderNames = [];
            let genderN = [];

            // Filter by gender and house, then push to new array
            if (house !== '' && gender == '') {
                names.forEach(function (el) {
                    if (el.house == house) {
                        genderNames.push(el);
                    }
                });

            } else if (gender !== '' && house == '') {
                names.forEach(function (el) {
                    if (el.gender == gender) {
                        genderNames.push(el);
                    }
                });

            } else if (house !== '' && gender !== '') {
                names.forEach(function (el) {
                    if (el.gender == gender && el.house == house) {
                        genderNames.push(el);
                    }
                });

            } else {
                names.forEach(function (el) {
                    genderNames.push(el);
                });
            }

            // Loop through array amount times
            for (let i = 1; i <= amount; i++) {
                genderN.push(genderNames[i]);
            }
            console.log(genderN);


            let output = '';
            genderN.forEach(function (el) {
                output += `
                    <ul>
                         <li>${el.name}</li>
                    </ul>
                    `;
            });

            // Print the output
            document.querySelector('#result').innerHTML = output;

        }
    }

    // Send the request
    xhr.send();

}