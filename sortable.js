let sHeroes
(async () => {
  const searchInput = document.querySelector("#search");
  const sortButton = document.querySelector("#sort");
  const sortNameButton = document.querySelector("#sortName");
  const pagination = document.querySelector("#pagination");
  const pageSize = document.querySelector("#display")

  const data =
    JSON.parse(localStorage.getItem("superhero")) ||
    (await (
      await fetch(
        "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"
      )
    ).json());

  searchInput.addEventListener("input", (e) => {
    filteredData = data.filter((item) =>
      item.name
        .toLocaleLowerCase()
        .includes(e.target.value.trim().toLocaleLowerCase())

    );
    sHeroes = filteredData
    console.log('filter', filteredData)
    paginate(filteredData)

  });

  sHeroes = data
  document.querySelectorAll('#catTable thead tr th').forEach(t => {
    t.addEventListener('click', sort, false);
  });

  let sortCol;
  let sortAsc = false;
  function sort(e) {
    let thisSort = e.target.dataset.sort;
    if (thisSort === 'powerstats.intelligence' || 'powerstats.strength' || 'powerstats.speed' || 'powerstats.durability' || 'powerstats.power' || 'powerstats.combat') {
      let st = thisSort.split('.')
      sortCol = st[1];
      sortHeroes = sHeroes.sort((a, b) => {
        if (a.powerstats[sortCol] < b.powerstats[sortCol]) {
          return sortAsc ? 1 : -1;
        } else if (a.powerstats[sortCol] > b.powerstats[sortCol]) {
          return sortAsc ? -1 : 1;
        } else {
          return 0;
        }
      });
    }


    const table = document.querySelectorAll('tbody tr')
    table.forEach(tb => tb.remove())
    let limit = document.getElementById('page-size').value
    let pageCount = Math.ceil(sHeroes.length / limit);
    let deleteButtons = document.querySelectorAll('#pagination li')
    deleteButtons.forEach(tb => tb.remove())
    if (limit == 'All') {
      limit = data.length;
    }
    for (let i = 1; i <= pageCount; i += 1) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i;
      button.onclick = () => {
        let page = i;
        const pageData = paginateTwo(data, limit, page)
        display(pageData)
      };
      li.append(button);
      pagination.append(li);
    }
    let pageData = paginateTwo(sHeroes, limit, 1)
    display(pageData)
  }

  localStorage.setItem("superhero", JSON.stringify(data));
  let filteredData = data;
  let limit = 20;

  function paginate(data) {
    pagination.textContent = "";
    let pageCount = Math.ceil(data.length / limit);
    for (let i = 1; i <= pageCount; i += 1) {

      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i;
      button.onclick = () => {
        let page = i;
        const pageData = paginateTwo(data, limit, page)
        console.log('array', pageData)
        display(pageData)
      };
      li.append(button);
      pagination.append(li);
    }
    firstDisplay(filteredData)

  }

  paginate(filteredData)

  pageSize.addEventListener('change', (e) => {
    console.log('Im alive')
    filteredData = data
    limit = e.target.value
    const table = document.querySelectorAll('tbody tr')
    table.forEach(tb => tb.remove())
    let pageCount = Math.ceil(data.length / limit);
    console.log('pageCount', pageCount)
    let deleteButtons = document.querySelectorAll('#pagination li')
    deleteButtons.forEach(tb => tb.remove())
    if (limit == 'All') {
      limit = data.length;
    }
    for (let i = 1; i <= pageCount; i += 1) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = i;
      button.onclick = () => {
        let page = i;
        const pageData = paginateTwo(data, limit, page)
        display(pageData)
      };
      li.append(button);
      pagination.append(li);
    }
    let pageData = paginateTwo(data, limit, 1)
    display(pageData)
  });



  sortButton.addEventListener("click", (e) => {
    if (e.detail === 1) {
      let sortedData = filteredData.sort((a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      );

      paginate(sortedData)
    }

    if (e.detail === 2) {
      let sortedData = filteredData.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
      paginate(sortedData)
    }
  });


  ////

  sortNameButton.addEventListener("click", (e) => {
    if (e.detail === 1) {
      let sortedData = filteredData.sort((a, b) =>
        a.biography.fullName.toLowerCase() < b.biography.fullName.toLowerCase() ? 1 : -1
      );

      paginate(sortedData)
    }

    if (e.detail === 2) {
      let sortedData = filteredData.sort((a, b) =>
        a.biography.fullName.toLowerCase() > b.biography.fullName.toLowerCase() ? 1 : -1
      );
      paginate(sortedData)
    }
  });
})();
////


function paginateTwo(arr, pageSize, pageNum) {
  return arr.slice((pageNum - 1) * pageSize, pageNum * pageSize);
};/*paginate*/

function display(pageArr) {
  let html = ''
  pageArr.forEach((ele, i) => {
    let htmlSegment = `
                 <tr class="${i}">
                    <td><img src="${ele.images.xs}" ></td>
                    <td>${ele.name}</td>
                    <td>${ele.biography.fullName}</td>
                    <td>${ele.powerstats.intelligence}</td>
                    <td>${ele.powerstats.strength}</td>
                    <td>${ele.powerstats.speed}</td>
                    <td>${ele.powerstats.durability}</td>
                    <td>${ele.powerstats.power}</td>
                    <td>${ele.powerstats.combat}</td>
                    <td>${ele.appearance.race}</td>
                    <td>${ele.appearance.gender}</td>
                    <td>${ele.appearance.height[1]}</td>
                    <td>${ele.appearance.weight[1]}</td>
                    <td>${ele.biography.placeOfBirth}</td>
                    <td>${ele.biography.alignment}</td>
                 </tr>`;
    html += htmlSegment;
  })
  let tblBody = document.querySelector('tbody')
  tblBody.innerHTML = html
}

function firstDisplay(arr) {
  let html = ''
  arr.forEach((ele, i) => {
    if (i <= 19) {
      let htmlSegment = `
                 <tr class="${i}">
                 <td><img src="${ele.images.xs}" ></td>
                 <td>${ele.name}</td>
                 <td>${ele.biography.fullName}</td>
                 <td>${ele.powerstats.intelligence}</td>
                 <td>${ele.powerstats.strength}</td>
                 <td>${ele.powerstats.speed}</td>
                 <td>${ele.powerstats.durability}</td>
                 <td>${ele.powerstats.power}</td>
                 <td>${ele.powerstats.combat}</td>
                 <td>${ele.appearance.race}</td>
                 <td>${ele.appearance.gender}</td>
                 <td>${ele.appearance.height[1]}</td>
                 <td>${ele.appearance.weight[1]}</td>
                 <td>${ele.biography.placeOfBirth}</td>
                 <td>${ele.biography.alignment}</td>
                 </tr>`;
      html += htmlSegment;
    }
  })
  let tblBody = document.querySelector('tbody')
  tblBody.innerHTML = html
}

//A LITTLE HELP FROM LUIS. :)
