const MODAL = new bootstrap.Modal(document.getElementById("editModal"), {
  backdrop: "static",
  keyboard: false
});

let JSON_DATA;
let EDIT_VALUE;

function onSubmitMenu() {
  const inputForm = $("#form-input");
  const tableMenu = $("#table-menu tbody");

  inputForm.on("submit", async (e) => {
    e.preventDefault();

    const data = JSON_DATA;
    const inputElement = $("#input-menu");

    const isExist = data.filter(
      (food) => inputElement.val().trim() === food.name
    );

    if (isExist.length) {
      alert("Error: Food you want to create was already exists in the table!");
      return;
    }

    data.push({
      id: data.length + 1,
      name: inputElement.val(),
      category: generateCategory()
    });

    clearRandomize();

    alert("Success: Menu successfully added!");

    inputElement[0].value = "";

    tableMenu.append(appendRow(data.length, data[data.length - 1].name));
  });
}

function onDeleteMenu(value) {
  const tableMenu = $("#table-menu tbody");
  JSON_DATA = JSON_DATA.filter((food) => food.name !== value);

  alert("Success: Data successfully deleted!");

  clearRandomize();
  tableMenu.html("");

  JSON_DATA.forEach((food, idx) => {
    tableMenu.append(appendRow(idx + 1, food.name));
  });
}

function onEditMenu() {
  const inputError = $("#input-error");
  const modalForm = $("#edit-input");
  const modalValue = modalForm.val();
  const tableMenu = $("#table-menu tbody");

  inputError.empty();

  if (!modalValue.length) {
    inputError.append("Error: Input can't be empty!");
    return;
  }

  for (let i = 0; i < JSON_DATA.length; i++) {
    if (modalValue === JSON_DATA[i].name) {
      inputError.append("Error: Input can't be same like the existing menu!");
      return;
    }
  }

  clearRandomize();

  JSON_DATA.forEach((food) => {
    if (food.name === EDIT_VALUE) {
      food.name = modalValue;
      alert("Success: Data edited successfully");
      MODAL.hide();

      tableMenu.html("");
      JSON_DATA.forEach((food, idx) => {
        tableMenu.append(appendRow(idx + 1, food.name));
      });
    }
  });
}

function randomizeMenu() {
  let inputBreakfast = $("#breakfast");
  let inputLunch = $("#lunch");
  let inputDinner = $("#dinner");

  if (JSON_DATA.length <= 0) {
    alert("Error: There's no such data in the table, try to insert it first!");
    return;
  }

  inputBreakfast.val("");
  inputLunch.val("");
  inputDinner.val("");

  if (JSON_DATA.length === 1) {
    let randInput = Math.floor(Math.random() * 3);
    let randNumber = Math.floor(Math.random() * JSON_DATA.length);
    let randData = JSON_DATA[randNumber].name;

    switch (randInput) {
      case 0:
        inputBreakfast.val(randData);
        break;
      case 1:
        inputLunch.val(randData);
        break;
      case 2:
        inputDinner.val(randData);
        break;
    }

    return;
  }

  if (JSON_DATA.length === 2) {
    let randInput = Math.floor(Math.random() * 3);
    let rand = Math.floor(Math.random() * JSON_DATA.length);
    let rand2 = Math.floor(Math.random() * JSON_DATA.length);

    while (rand === rand2) {
      rand = Math.floor(Math.random() * JSON_DATA.length);
    }

    let randData = JSON_DATA[rand].name;
    let randData2 = JSON_DATA[rand2].name;

    switch (randInput) {
      case 0:
        inputBreakfast.val(randData);
        inputLunch.val(randData2);
        break;
      case 1:
        inputLunch.val(randData);
        inputDinner.val(randData2);
        break;
      case 2:
        inputBreakfast.val(randData);
        inputDinner.val(randData2);
        break;
    }

    return;
  }

  for (let i = 0; i < 3; i++) {
    let rand = Math.floor(Math.random() * JSON_DATA.length);
    let rand2 = Math.floor(Math.random() * JSON_DATA.length);
    let rand3 = Math.floor(Math.random() * JSON_DATA.length);

    while (rand === rand2 || rand === rand3 || rand2 === rand3) {
      if (rand === rand2 || rand === rand3) {
        rand = Math.floor(Math.random() * JSON_DATA.length);
      }

      if (rand2 === rand || rand2 === rand3) {
        rand2 = Math.floor(Math.random() * JSON_DATA.length);
      }

      if (rand3 === rand || rand3 === rand2) {
        rand3 = Math.floor(Math.random() * JSON_DATA.length);
      }
    }

    inputBreakfast.val(JSON_DATA[rand].name);
    inputLunch.val(JSON_DATA[rand2].name);
    inputDinner.val(JSON_DATA[rand3].name);
  }
}

// * Helper Functions
async function loadDefaultData() {
  const response = await fetch("/assets/javascript/food.json");
  JSON_DATA = await response.json();

  const tableMenu = $("#table-menu tbody");

  const data = JSON_DATA;

  for (let counter = 0; counter < 3; counter++) {
    tableMenu.append(appendRow(counter + 1, data[counter].name));
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

function onEditSubmit() {
  $("#modal-form").on("submit", (e) => e.preventDefault());
}

function getEditTarget(value) {
  document.getElementById("edit-input").value = "";
  $("#input-error").empty();
  return (EDIT_VALUE = value);
}

// * Resusable Code Functions
function appendRow(counter, data) {
  return `
    <tr>
      <td class="number">${counter}</td>
      <td class="name">${data}</td>
      <td class="action">
        <a id="edit" class="btn btn-primary btn-table" data-bs-toggle="modal" onclick="getEditTarget('${data}')" data-bs-target="#editModal" href="#">
          <img
            class="edit-icon"
            src="/assets/images/edit-icon.png"
            alt="edit icon button"
          />
          <span class="btn-text">Edit</span>
        </a>

        <a id="delete" class="btn btn-primary btn-table" href="#" onClick="onDeleteMenu('${data}')">
          <img
            class="delete-icon"
            src="/assets/images/delete-icon.png"
            alt="edit icon button"
          />
          <span class="btn-text">Delete</span>
        </a>
      </td>
    </tr>
  `;
}

function clearRandomize() {
  $(".form-randomize").val("");
}

onSubmitMenu();
onEditSubmit();
