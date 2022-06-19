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
        // for (let i = 0; i < loadData.length; i++) {
            //     const IconDiv = document.getElementById("hero");
            //     const IconImg = document.createElement("img");
            //     const hero = loadData[i]
            //     IconImg.src = hero.images.xs;
            //     IconDiv.appendChild(IconImg);
            //     document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";
            // }
            let col = ['images','name','biography','powerstats','appearance'];
            let bio = ['fullName', 'placeOfBirth', 'alignment']
            let app = ['race', 'gender', 'height', 'weight']
            let pow = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat']
            // let col = []
            // for (let i = 0; i < loadData.length; i++) {
                //     for (let key in loadData[i]) {
                    //         if (col.indexOf(key) === -1) {
                        //             console.log(key)
                        //             col.push(key);
                        //         }
                        //     }
                        // }
                        let table = document.getElementById("table");
                        let tr = table.insertRow(-1);                   // table row.
                        
                        // for (let i = 0; i < col.length; i++) {
                            //     let th = document.createElement("th");      // table header.
                            //     th.innerHTML = col[i];
    //     tr.appendChild(th);
    // }

    // add json data to the table as rows.
    for (let i = 0; i < loadData.length; i++) {
        
        tr = table.insertRow(-1);
        
        for (let j = 0; j < col.length; j++) {
            if (col[j]=== 'biography') {
                for (let k = 0; k < bio.length; k++) {
                    let tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = loadData[i][col[j]][bio[k]];
                }
            } else if (col[j] === 'appearance') {
                for (let k = 0; k < app.length; k++) {
                    let tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = loadData[i][col[j]][app[k]];
                }
            } else if (col[j] === 'powerstats'){
                for (let k = 0; k < pow.length; k++) {
                    let tabCell = tr.insertCell(-1);
                    tabCell.innerHTML = loadData[i][col[j]][pow[k]];
                }
            }else if (col[j] ==='images'){
                const IconImg = document.createElement("img");
                IconImg.src = loadData[i].images.xs;
                let tabCell = tr.insertCell(-1);
                tabCell.appendChild(IconImg);
                
            } else {
                let tabCell = tr.insertCell(-1);
                
                tabCell.innerHTML = loadData[i][col[j]];
            }
            
            
        }
    }
    // Now, add the newly created table with json data, to a container.
    let divShowData = document.getElementById('showData');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
    
    document.getElementById('msg').innerHTML = '<br />You can later <a href="https://www.encodedna.com/javascript/dynamically-add-remove-rows-to-html-table-using-javascript-and-save-data.htm" target="_blank" style="color:#1464f4;text-decoration:none;">get all the data from table and save it in a database.</a>';
    
}

(document).ready(function () {
    ('#table').DataTable({
        pagingType: 'full_numbers',
    });
});