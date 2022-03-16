document.querySelector('#generate-names').addEventListener('submit', loadNames);

function loadNames(e) {
    e.preventDefault();

    // Read the values from the form
    const house = document.querySelector('#house').value,
        gender = document.querySelector('#genre').value,
        amount = document.querySelector('#quantity').value;

    let url = '//hp-api.herokuapp.com/api/characters';

    fetch(url)
        .then(response => response.json())
        .then(names => {
            console.log(names);

            let namesHP = [];
            let namesNew = [];

            // Filter by gender and house, then push to new array
            if (house !== '' && gender == '') {
                names.forEach(el => {
                    console.log(el.house);
                    if (el.house == house) {
                        namesHP.push(el);
                    }
                });

            } else if (gender !== '' && house == '') {
                names.forEach(el => {
                    if (el.gender == gender) {
                        namesHP.push(el);
                    }
                });

            } else if (house !== '' && gender !== '') {
                names.forEach(el => {
                    if (el.gender == gender && el.house == house) {
                        namesHP.push(el);
                    }
                });

            } else {
                names.forEach(el => {
                    namesHP.push(el);
                });
            }



            // Loop through array amount times
            for (let i = 1; i <= amount; i++) {
                namesNew.push(namesHP[i]);
            }

            let output = '<ul>';
            namesNew.forEach(el => {
                output += `<li>${el.name}</li>`;
            });
            output += '</ul>';

            // Print the output
            document.querySelector('#result').innerHTML = output;

        })
}
