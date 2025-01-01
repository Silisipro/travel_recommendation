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

                     const viewButton = document.createElement('button');
                     viewButton.className = 'view-btn';
                     viewButton.textContent = 'View';
                     viewButton.addEventListener('click', () => {
                         alert(`You clicked View for ${item.name}`);
                     });

                     itemDiv.appendChild(image);
                    itemDiv.appendChild(title);
                    itemDiv.appendChild(description);
                    itemDiv.appendChild(viewButton);

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

    const style = document.createElement('style');
    style.textContent = `
        .result-item {
            border: 1px solid #ccc;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
            background-color: white;

        }

        .result-item img {
            max-width: 100%;
            border-radius: 5px;
        }

        .result-item h3 {
            margin: 10px 0;
            font-size: 1.5em;
        }

        .result-item p {
            margin: 10px 0;
            font-size: 1em;
            line-height: 1.5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .view-btn {
            display: inline-block;
            padding: 10px 15px;
            background-color: #008080;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            margin-top: 10px;
        }

        .view-btn:hover {
            background-color: #006666;
        }
    `;
    document.head.appendChild(style);





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