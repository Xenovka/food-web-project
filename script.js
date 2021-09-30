let JSON_DATA;

async function loadDefaultData() {
  const response = await fetch("/food.json");
  JSON_DATA = await response.json();

  const tableMenu = $("#table-menu tbody");

  const data = JSON_DATA;

  for (let counter = 0; counter < 3; counter++) {
    tableMenu.append(`
      <tr>
        <td class="number">${counter + 1}</td>
        <td class="name">${data[counter].name}</td>
        <td class="action">
          <a id="edit" class="btn btn-primary btn-table" href="#">
            <img
              class="edit-icon"
              src="./images/edit-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Edit</span>
          </a>

          <a id="delete" class="btn btn-primary btn-table" href="#" onClick="onDeleteMenu('${
            data[counter].name
          }')">
            <img
              class="delete-icon"
              src="./images/delete-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Delete</span>
          </a>
        </td>
      </tr>
    `);
  }
}

function generateCategory() {
  const random = Math.floor(Math.random() * 3) + 1;

  switch (random) {
    case 1:
      return "breakfast";
    case 2:
      return "lunch";
    case 3:
      return "dinner";
  }
}

function onSubmitMenu() {
  const inputForm = $("#form-input");
  const tableMenu = $("#table-menu tbody");

  inputForm.on("submit", async (e) => {
    e.preventDefault();

    const data = JSON_DATA;
    const inputElement = $("#input-menu");

    const isExist = data.filter(
      (food) => inputElement.get(0).value.trim() === food.name
    );

    if (isExist.length) {
      alert("Error: Food you want to create was already exists in the table!");
      return;
    }

    data.push({
      id: data.length + 1,
      name: inputElement.get(0).value,
      category: generateCategory()
    });

    alert("Success: Menu successfully added!");

    inputElement[0].value = "";

    tableMenu.append(`
      <tr>
        <td class="number">${data.length}</td>
        <td class="name">${data[data.length - 1].name}</td>
        <td class="action">
          <a id="edit" class="btn btn-primary btn-table" href="#">
            <img
              class="edit-icon"
              src="./images/edit-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Edit</span>
          </a>

          <a id="delete" class="btn btn-primary btn-table" href="#" onClick="onDeleteMenu('${
            data[data.length - 1].name
          }')">
            <img
              class="delete-icon"
              src="./images/delete-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Delete</span>
          </a>
        </td>
      </tr>
    `);
  });
}

function onDeleteMenu(value) {
  const tableMenu = $("#table-menu tbody");
  JSON_DATA = JSON_DATA.filter((food) => food.name !== value);

  alert("Success: Data successfully deleted!");

  tableMenu.html("");

  JSON_DATA.forEach((food, idx) => {
    tableMenu.append(`
      <tr>
        <td class="number">${idx + 1}</td>
        <td class="name">${food.name}</td>
        <td class="action">
          <a id="edit" class="btn btn-primary btn-table" href="#">
            <img
              class="edit-icon"
              src="./images/edit-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Edit</span>
          </a>

          <a id="delete" class="btn btn-primary btn-table" href="#" onClick="onDeleteMenu('${
            food.name
          }')">
            <img
              class="delete-icon"
              src="./images/delete-icon.png"
              alt="edit icon button"
            />
            <span class="btn-text">Delete</span>
          </a>
        </td>
      </tr>
    `);
  });
}

function onEditMenu() {}

onSubmitMenu();
