// This function is called only after the data has been fetched, and parsed.
const loadData = heroes => {
    console.log(heroes)
  }
  
  // Request the file with fetch, the data will downloaded to your browser cache.
  fetch('https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json')
    .then((response) => {
        if (response.ok) {
            return response.json(); // parse the response from JSON
        } else {
            throw new Error("NETWORK RESPONSE ERROR");
        }
    })
    .then(loadData => {
        console.log(loadData);
        displayHeroData(loadData)
    }) // .then will call the `loadData` function with the JSON value.
    .catch((error) => console.error("FETCH ERROR:", error));

    function displayHeroData(loadData) {
        const hero = loadData.
    }