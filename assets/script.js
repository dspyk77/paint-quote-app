var rooms = [
  {
    name: "",
    items: [],
    roomSqft: 0,
  },
];

const roomsDiv = document.querySelector("#rooms-div");
const roomNameInput = document.querySelector("#room-name-input");
const displayEstimateTotal = document.querySelector("#esitmate-totals");
const emptyInputAlert = document.querySelector("#empty-input-alert");
const ratePerSqftInput = document.querySelector("#rate-per-sqft-input");
const displayRatePerSqft = document.querySelector("#display-rate-per-sqft");

function renderRooms() {
  roomsDiv.innerHTML = "";
  emptyInputAlert.innerHTML = "";
  
  let totalEstimateRows = "";
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    console.log(room);

    const totalEstimateRow = `
    <tr>
      <th scope="col">${room.name}</th>
      <th scope="col">${calculateRoomSqft(room)}</th>
      <th scope="col">$${setRate()}</th>
      <th scope="col" colspan="2">$${calculateRoomCost(room)}</th>
    </tr>
    `;

    totalEstimateRows = totalEstimateRows + totalEstimateRow + "\n";
    let rows = "";
    for (let j = 0; j < room.items.length; j++) {
      const item = room.items[j];

      const row = `
      <tr>
        <th scope="row">${j + 1}</th>
        <td>${item.name}</td>
        <td>${item.width}</td>
        <td>${item.height}</td>
        <td id="add-sub-item-room-${i}">${item.itemSqft}</td>
        <td><button onclick="removeItem(${i}, ${j})" class="btn btn-outline-danger btn-sm ms-4">Delete</button></td>
      </tr>
      `;

      rows = rows + row + "\n";
    }

    roomsDiv.insertAdjacentHTML(
      "beforeend",
      `
      <h3>${room.name}</h3>
      <p>Room # ${i + 1}</p>
      <button onclick="removeRoom(${i})" class="btn btn-outline-danger btn-sm">Remove Room</button>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"><label for="objectName">New Object Name</label></th>
            <th scope="col"><label for="objectLenght">Object Width (ft)</label></th>
            <th scope="col"><label for="objectHeight">Object Height (ft)</label></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" class="col-8" id="new-item-name-input-room-${i}" name="objectName"></td>
            <td><input type="number" class="col-8" id="new-item-width-input-room-${i}" name="objectWidth"></td>
            <td><input type="number" class="col-8" id="new-item-height-input-room-${i}" name="objectHeight"></td>
          </tr>
          <tr>
            <td><button onclick="addItemSqft(${i})" class="btn btn-primary m-2">Add Sqft</button><button onclick="subItemSqft(${i})" class="btn btn-primary m-2">Subtract
                Sqft</button></td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item-Object</th>
            <th scope="col">Width</th>
            <th scope="col">Height</th>
            <th scope="col" colspan="2">Sqft</th>
          </tr>
        </thead>

        <tbody>
          ${rows}
          <tr>
            <th scope="row"></th>
            <th>Total Sqft:</th>
            <th colspan="4">${calculateRoomSqft(room)}</th>
          </tr>
        </tbody>
      </table>
    `
    );

    if (rooms.length > 1) {
      displayEstimateTotal.innerHTML = "";
      displayEstimateTotal.insertAdjacentHTML(
        "beforeend",
        `
         <h3>Estimate Total</h3>
    
         <table class="table">
            <thead>
              <tr>
                <th scope="col">Room</th>
                <th scope="col">Room Sqft</th>
                <th scope="col">Price per Sqft</th>
                <th scope="col" colspan="2">Room Cost</th>
              </tr>
            </thead>
    
            <tbody>
              ${totalEstimateRows}
              <tr>
                <th scope="row"></th>
                <th>Estimate Total Sqft:</th>
                <th colspan="4">${calculateEstimateTotalSqft(room)}</th>
              </tr>
              <tr>
                <th scope="row"></th>
                <th>Estimate Total Cost:</th>
                <th colspan="4">$${calculateEstimateTotalPrice(room)}</th>
              </tr>
            </tbody>
          </table>
    
      `
      );
    }
  }
}

ratePerSqftInput.addEventListener('focus', function() {
  this.value = '';
});

ratePerSqftInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    setRate();
  }
});

function setRate() {
  if (ratePerSqftInput.value == "") {
    emptyInputAlertDisplay();
  } else {
    let ratePerSqft = parseFloat(ratePerSqftInput.value);
    displayRatePerSqft.innerHTML = "";
    ratePerSqftInput.innerHTML = "";

    displayRatePerSqft.insertAdjacentHTML(
      "beforeend",
      `
    <span class="fs-5" >The current labor rate entered is</span> <span class="fs-5 fw-semibold">$${ratePerSqft} per sqft.</span>
    `
    );
    return ratePerSqft;
  }
}

roomNameInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addRoom();
  }
});

function addRoom() {
  if (roomNameInput.value == "") {
    emptyInputAlertDisplay();
  } else {
    var room = {
      name: roomNameInput.value,
      items: [],
    };

    rooms.push(room);

    if (!rooms[0].name) {
      rooms.splice(0, 1);
    }

    renderRooms();
    roomNameInput.value = "";
  }
}

function removeRoom(roomIndex) {
  rooms.splice(roomIndex, 1);

  renderRooms();
}

function addItemSqft(roomIndex) {
  var newItemName = document.querySelector(
    `#new-item-name-input-room-${roomIndex}`
  );
  var newItemHeight = document.querySelector(
    `#new-item-height-input-room-${roomIndex}`
  );
  var newItemWidth = document.querySelector(
    `#new-item-width-input-room-${roomIndex}`
  );
  var addSubItem = document.querySelector(`#add-sub-item-room-${roomIndex}`);

  if (
    newItemName.value == "" ||
    newItemHeight.value == "" ||
    newItemWidth.value == ""
  ) {
    emptyInputAlertDisplay();
    if (newItemName.value == "") {
      newItemName.className = "border border-danger";
    } else if (newItemHeight.value == "") {
      newItemHeight.className = "border border-danger";
    } else if (newItemWidth.value == "") {
      newItemWidth.className = "border border-danger";
    }
  } else {
    var item = {
      name: newItemName.value,
      width: parseInt(newItemWidth.value),
      height: parseInt(newItemHeight.value),
      itemSqft: parseInt(newItemWidth.value * newItemHeight.value),
    };

    rooms[roomIndex].items.push(item);

    renderRooms(addSubItem);
  }
}

function subItemSqft(roomIndex) {
  var newItemName = document.querySelector(
    `#new-item-name-input-room-${roomIndex}`
  );
  var newItemHeight = document.querySelector(
    `#new-item-height-input-room-${roomIndex}`
  );
  var newItemWidth = document.querySelector(
    `#new-item-width-input-room-${roomIndex}`
  );
  var addSubItem = document.querySelector(`#add-sub-item-room-${roomIndex}`);

  if (
    newItemName.value == "" ||
    newItemHeight.value == "" ||
    newItemWidth.value == ""
  ) {
    emptyInputAlertDisplay();
    if (newItemName.value == "") {
      newItemName.className = "border border-danger";
    } else if (newItemHeight.value == "") {
      newItemHeight.className = "border border-danger";
    } else if (newItemWidth.value == "") {
      newItemWidth.className = "border border-danger";
    }
  } else {
    var item = {
      name: newItemName.value,
      width: -parseInt(newItemWidth.value),
      height: -parseInt(newItemHeight.value),
      itemSqft: -parseInt(newItemWidth.value * newItemHeight.value),
    };

    rooms[roomIndex].items.push(item);

    renderRooms(addSubItem);
  }
}

function removeItem(roomIndex, itemIndex) {
  rooms[roomIndex].items.splice(itemIndex, 1);

  renderRooms();
}

function calculateRoomSqft(room, i) {
  var newItemSqft = room.items.map((x) => x.itemSqft);

  let newRoomSqft = 0;
  for (var i = 0; i < room.items.length; i++) {
    newRoomSqft += newItemSqft[i];
  }

  room.roomSqft = newRoomSqft;

  return room.roomSqft;
}

function calculateRoomCost(room, i) {
  let newItemSqft = room.items.map((x) => x.itemSqft);
  let roomCost = 0;

  let newRoomSqft = 0;
  for (var i = 0; i < room.items.length; i++) {
    newRoomSqft += newItemSqft[i];
    roomCost = newRoomSqft * setRate();
  }

  return roomCost.toFixed(2);
}

function calculateEstimateTotalSqft() {
  let estimateTotalSqft = 0;

  for (let i = 0; i < rooms.length; i++) {
    estimateTotalSqft += calculateRoomSqft(rooms[i]);
  }

  return estimateTotalSqft.toFixed(2);
}

function calculateEstimateTotalPrice() {
  let estimateTotalSqft = 0;
  let estimateTotalPrice = 0;

  for (let i = 0; i < rooms.length; i++) {
    estimateTotalSqft += calculateRoomSqft(rooms[i]);
    estimateTotalPrice = estimateTotalSqft * setRate();
  }

  return estimateTotalPrice.toFixed(2);
}

function emptyInputAlertDisplay() {
  emptyInputAlert.insertAdjacentHTML(
    "beforeend",
    `
       <div id="empty-input-alert" class="alert alert-danger alert-dismissible fade show" role="alert">
      <span>
        <i class="bi bi-bandaid"></i><span class="fw-bold">Uh oh!</span>
        Look's like you left an input box empty! Make sure everthing is filled out and try again<i class="bi bi-hand-thumbs-up"></i>
      </span>
      <button class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  
    `
  );
  emptyInputAlert.scrollIntoView();
}
