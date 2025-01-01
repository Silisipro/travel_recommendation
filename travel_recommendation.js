const btnSearch = document.getElementById('btnSearch');
const btnClear = document.querySelector('.clear-btn');
const recommendations = [];



    function recommendationsSearch() {
        const input = document.querySelector('.search-container input').value.toLowerCase();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
    
        fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let results = [];

            if (input.includes('plage')) {
                results = results.concat(data.beaches);
            }

            if (input.includes('temple')) {
                results = results.concat(data.temples);
            }

            data.countries.forEach(country => {
                if (country.name.toLowerCase() === input) {
                    results = results.concat(country.cities);
                }
            });

            if (results.length > 0) {
                results.forEach(item => {
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'result-item';

                    const image = document.createElement('img');
                    image.src = item.imageUrl;
                    image.alt = item.name;

                    const title = document.createElement('h3');
                    title.textContent = item.name;

                    const description = document.createElement('p');
                    description.textContent = item.description;

                    const timeZoneMap = {
                        "Australia": "Australia/Sydney",
                        "Japan": "Asia/Tokyo",
                        "Brazil": "America/Sao_Paulo"
                    };

                    const countryName = item.name.split(', ')[1];
                    if (timeZoneMap[countryName]) {
                        const options = { timeZone: timeZoneMap[countryName], hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                        const localTime = new Date().toLocaleTimeString('en-US', options);

                        const timeInfo = document.createElement('p');
                        timeInfo.textContent = `Local time: ${localTime}`;
                        itemDiv.appendChild(timeInfo);
                    }

                    itemDiv.appendChild(image);
                    itemDiv.appendChild(title);
                    itemDiv.appendChild(description);

                    resultDiv.appendChild(itemDiv);
                });
            } else {
                resultDiv.innerHTML = 'Aucun résultat trouvé.';
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            resultDiv.innerHTML = 'Une erreur est survenue lors de la recherche des données.';
        });
        }
    
    
    //fonctionnalité pour le bouton "Effacer"
    btnClear.addEventListener('click', () => {
        document.querySelector('.search-container input').value = '';
        document.getElementById('result').innerHTML = '';
    });




    function recommendationsList() {
        fetch('travel_recommendation_api.json')
        .then(response => response.json())
            .then(data => {
            console.log('recommendations lists data', data);
            })
            .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
            });
    }

    recommendationsList()