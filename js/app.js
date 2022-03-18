document.querySelector('#generate-names').addEventListener('submit', loadNames);

function loadNames(e) {
    e.preventDefault();

    // Read the values from the form
    const house = document.querySelector('#house').value,
        gender = document.querySelector('#genre').value,
        amount = document.querySelector('#quantity').value;

    let url = '//hp-api.herokuapp.com/api/characters';

    getNames(url)
        .then(data => {
            data = data.data;
            console.log(data);

            let namesHP = [];
            let namesNew = [];


            // Filter by gender and house, then push to new array
            if (house !== '' && gender == '') {
                data.forEach(el => {
                    if (el.house == house) {
                        namesHP.push(el);
                    }
                });
            } else if (gender !== '' && house == '') {
                data.forEach(el => {
                    if (el.gender == gender) {
                        namesHP.push(el);
                    }
                });
            } else if (house !== '' && gender !== '') {
                data.forEach(el => {
                    if (el.gender == gender && el.house == house) {
                        namesHP.push(el);
                    }
                });
            } else {
                data.forEach(el => {
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

async function getNames(url) {
    const response = await fetch(url);
    const data = await response.json();
    return { data }
}