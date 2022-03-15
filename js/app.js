document.querySelector('#generate-names').addEventListener('submit', loadNames);

function loadNames(e) {
    e.preventDefault();

    // Read the values from the form
    const house = document.querySelector('#house').value,
        gender = document.querySelector('#genre').value,
        amount = document.querySelector('#quantity').value;

    let url = '//hp-api.herokuapp.com/api/characters';

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (names) {

            console.log(names);

            let namesHP = [];
            let namesNew = [];

            // Filter by gender and house, then push to new array
            if (house !== '' && gender == '') {
                names.forEach(function (el) {
                    console.log(el.house);
                    if (el.house == house) {
                        namesHP.push(el);
                    }
                });

            } else if (gender !== '' && house == '') {
                names.forEach(function (el) {
                    if (el.gender == gender) {
                        namesHP.push(el);
                    }
                });

            } else if (house !== '' && gender !== '') {
                names.forEach(function (el) {
                    if (el.gender == gender && el.house == house) {
                        namesHP.push(el);
                    }
                });

            } else {
                names.forEach(function (el) {
                    namesHP.push(el);
                });
            }



            // Loop through array amount times
            for (let i = 1; i <= amount; i++) {
                namesNew.push(namesHP[i]);
            }
            console.log(namesNew);

            let output = '';
            namesNew.forEach(function (el) {
                output += `
                    <ul>
                         <li>${el.name}</li>
                    </ul>
                    `;
            });

            // Print the output
            document.querySelector('#result').innerHTML = output;

        })
}
