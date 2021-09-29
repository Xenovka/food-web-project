let COUNTER;

async function loadDefaultData() {
  const requestData = await fetch("/food.json");
  const responseText = await requestData.text();

  window.localStorage.setItem("foods", responseText);

  const getData = localStorage.getItem("foods");
  const data = JSON.parse(getData);

  const DOMTable = document.getElementById("table-menu").querySelector("tbody");

  for (COUNTER = 0; COUNTER < 3; COUNTER++) {
    DOMTable.innerHTML += `
      <tr>
        <td class="number">${COUNTER + 1}</td>
        <td class="name">${data[COUNTER].name}</td>
        <td class="action">
          <a class="btn btn-primary btn-table" href="">
            <img
              class="edit-icon"
              src="./images/edit-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Edit</span>
          </a>

          <a class="btn btn-primary btn-table" href="">
            <img
              class="delete-icon"
              src="./images/delete-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Delete</span>
          </a>
          <a href=""><i class="bi bi-x-circle-fill"></i></a>
        </td>
      </tr>
    `;
  }
}

async function onSubmitMenu() {
  const DOMInputForm = document.getElementById("form-input");
  const DOMTable = document.getElementById("table-menu").querySelector("tbody");

  DOMInputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = JSON.parse(localStorage.getItem("foods"));
    const DOMInput = document.getElementById("input-menu");
    data.push({
      name: DOMInput.value
    });

    window.localStorage.setItem("foods", JSON.stringify(data));

    DOMInput.value = "";

    DOMTable.innerHTML += `
      <tr>
        <td class="number">${COUNTER + 1}</td>
        <td class="name">${data[data.length - 1].name}</td>
        <td class="action">
          <a class="btn btn-primary btn-table" href="">
            <img
              class="edit-icon"
              src="./images/edit-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Edit</span>
          </a>

          <a class="btn btn-primary btn-table" href="">
            <img
              class="delete-icon"
              src="./images/delete-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Delete</span>
          </a>
          <a href=""><i class="bi bi-x-circle-fill"></i></a>
        </td>
      </tr>
    `;

    COUNTER++;
  });
}

onSubmitMenu();
