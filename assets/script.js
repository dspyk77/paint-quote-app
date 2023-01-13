var rooms = [
  {
    name: "",
    items: [],
    cabinets: [],
    furniture: [],
    roomSqft: 0,
  },
];

console.log(rooms);

const roomsDiv = document.querySelector("#rooms-div");
const roomNameInput = document.querySelector("#room-name-input");
const displayEstimateTotal = document.querySelector("#esitmate-totals");
const emptyInputAlert = document.querySelector("#empty-input-alert");
const ratePerSqftInput = document.querySelector("#rate-per-sqft-input");
const displayRatePerSqft = document.querySelector("#display-rate-per-sqft");

// when called displays current values of all rooms and totals section
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
      <th scope="col">$${setPaintRate()}</th>
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
      <!-- id room-name is for edit room btn in totals section (in backlog)-->
      <h3 id="room-name${i}">${room.name}</h3>
      <p>Room # ${i + 1}</p>

      <button onclick="removeRoom(${i})" class="btn btn-outline-danger btn-sm">Remove Room</button>

      <!-- Button that triggers the cabinet modal -->
      <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#cabinet-modal${i}">Add Cabinets</button>

        <!-- Cabinet Modal -->
        <div class="modal fade" id="cabinet-modal${i}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">

              <div class="modal-header">
                <div class="row">
                  <h5 class="modal-title" id="myModalLabel">Add Cabinets to ${
                    room.name
                  }</h5>
                  <span class="fst-italic">Add cabinets that will be painted or refinished in the ${
                    room.name
                  }</span>
                </div>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <!-- Form content goes here -->
                <form>
                  <div class="form-group row">
                    <div class="col-md-6">
                      <label for="num-of-bases">Number of Bases</label>
                      <input type="number" class="form-control" id="num-of-bases-${i}" placeholder="Number of cabinet bases">
                    </div>
                    <div class="col-md-6">
                      <label for="price-per-bases">Price per Base</label>
                      <input type="number" class="form-control" id="price-per-bases-${i}" placeholder="$250">
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-6">
                      <label for="num-of-doors">Number of Doors</label>
                      <input type="number" class="form-control" id="num-of-doors-${i}" placeholder="Number of cabinet doors">
                    </div>
                    <div class="col-md-6">
                      <label for="price-per-door">Price per Door</label>
                      <input type="number" class="form-control" id="price-per-door-${i}" placeholder="$75">
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-6">
                      <label for="num-of-drawers">Number of Drawers</label>
                      <input type="number" class="form-control" id="num-of-drawers-${i}" placeholder="Number of cabinet drawers">
                    </div>
                    <div class="col-md-6">
                      <label for="price-per-drawer">Price per Drawer</label>
                      <input type="number" class="form-control" id="price-per-drawer-${i}" placeholder="$50">
                    </div>
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <!-- Modal footer -->
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-primary" onclick="addCabinets(${i})">Add Cabinet(s)</button>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Button that triggers the furniture modal -->
        <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#furniture-modal${i}">Add Furniture</button>

        <!-- Furniture Modal -->
        <div class="modal fade" id="furniture-modal${i}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">

              <div class="modal-header">
                <div>
                  <h5 class="modal-title" id="myModalLabel">Add Furniture to ${
                    room.name
                  }</h5>
                  <span class="fst-italic">Add furniture that will be painted or refinished in the ${
                    room.name
                  }</span>
                </div>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body">
                <!-- Form content goes here -->
                <form>
                  <div class="form-group">
                    <label for="furniture-name">Name of Furniture</label>
                    <input type="text" class="form-control" id="furniture-name-${i}" placeholder="Arm chair, stool, bench ect.">

                    <label for="num-of-pieces">Number of Pieces</label>
                    <input type="number" class="form-control" id="num-of-pieces-${i}" placeholder="Number of furniture peices">

                    <label for="price-per-furniture-piece">Price per Piece</label>
                    <input type="number" class="form-control" id="price-per-furniture-piece-${i}" placeholder="$100">
                  </div>
                </form>
              </div>

              <div class="modal-footer">
                <!-- Modal footer -->
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" onclick="addFurniture(${i})" class="btn btn-primary">Add Furniture</button>
                </div>
              </div>

            </div>
          </div>
        </div>

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

// when clicking the labor rate input field the inherit set value is cleared
ratePerSqftInput.addEventListener("focus", (event) => {
  event.target.value = "";
});

// allows entered labor rate to be sumbited using the enter btn
ratePerSqftInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    setPaintRate();
  }
});

// sumbits entered labor rate when the "set rate" btn is clicked
document.querySelector("#rate-per-sqft-btn").addEventListener("click", () => {
  setPaintRate();
});

// re renders rooms if labor rate is changed after values are displayed when "update totals" btn is clicked
document.querySelector("#update-totals-btn").addEventListener("click", () => {
  renderRooms();
});

// checks if input has value if !value displays error else stores input value and displays value
function setPaintRate() {
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

// allows entered room name to be sumbited using the enter btn
roomNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addRoom();
  }
});

// checks if input has value if !value displays error else pushes room array to rooms then removes default room and
// renders rooms display with new values
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

// removes selected room then renders rooms display with remaining values
function removeRoom(roomIndex) {
  rooms.splice(roomIndex, 1);

  renderRooms();
}

// checks if input has value if !value displays red border on empty input field and displays error msg
// stores indexed room new objects input values
// parse's input strings to numbers
// pushes values to indexed room array
// renders room display with added values
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

    renderRooms();
  }
}

// checks if input has value if !value displays red border on empty input field and displays error msg
// stores indexed room new objects input values
// parse's input strings to negitive numbers for subtracting
// pushes values to indexed room array
// renders room display with added values
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

    renderRooms();
  }
}

// pushes cabinets input value to indexed rooms array
function addCabinets(roomIndex) {
  let newNumOfBases = document.querySelector(`#num-of-bases-${roomIndex}`);
  let newPricePerBase = document.querySelector(`#price-per-bases-${roomIndex}`);
  let newNumOfDoors = document.querySelector(`#num-of-doors-${roomIndex}`);
  let newPricePerDoor = document.querySelector(`#price-per-door-${roomIndex}`);
  let newNumOfDrawers = document.querySelector(`#num-of-drawers-${roomIndex}`);
  let newPricePerDrawer = document.querySelector(
    `#price-per-drawer-${roomIndex}`
  );

  rooms[roomIndex].cabinets = [];

  var cabinet = {
    numOfBases: parseInt(newNumOfBases.value),
    pricePerBase: parseInt(newPricePerBase.value),
    numOfDoors: parseInt(newNumOfDoors.value),
    pricePerDoor: parseInt(newPricePerDoor.value),
    numOfDrawers: parseInt(newNumOfDrawers.value),
    pricePerDrawer: parseInt(newPricePerDrawer.value),
  };

  console.log(cabinet);
  console.log(rooms[roomIndex]);
  console.log(rooms);
  console.log(rooms[roomIndex].cabinets);


  rooms[roomIndex].cabinets.push(cabinet);
}

// pushes cabinets input value to indexed rooms array
function addFurniture(roomIndex) {
  let newFurnitureName = document.querySelector(`#furniture-name-${roomIndex}`);
  let newNumOfPieces = document.querySelector(`#num-of-pieces-${roomIndex}`);
  let newPricePerFurniturePiece = document.querySelector(`#price-per-furniture-piece-${roomIndex}`);

  rooms[roomIndex].furniture = [];

  var newFurniture = {
    FurnitureName: newFurnitureName.value,
    NumOfPieces: parseInt(newNumOfPieces.value),
    PricePerFurniturePiece: parseInt(newPricePerFurniturePiece.value),
  };

  console.log(newFurniture);
  console.log(rooms[roomIndex]);
  console.log(rooms);
  console.log(rooms[roomIndex].furniture);


  rooms[roomIndex].furniture.push(newFurniture);
}

// removes item/object from indexed rooms array
// renders room display with remaining values
function removeItem(roomIndex, itemIndex) {
  rooms[roomIndex].items.splice(itemIndex, 1);

  renderRooms();
}

// calculates each rooms sqft and returns result
function calculateRoomSqft(room, i) {
  var newItemSqft = room.items.map((x) => x.itemSqft);

  let newRoomSqft = 0;
  for (var i = 0; i < room.items.length; i++) {
    newRoomSqft += newItemSqft[i];
  }

  room.roomSqft = newRoomSqft;

  return room.roomSqft;
}

// calculates each rooms cost of labor and returns result
function calculateRoomCost(room, i) {
  let newItemSqft = room.items.map((x) => x.itemSqft);
  let roomCost = 0;

  let newRoomSqft = 0;
  for (var i = 0; i < room.items.length; i++) {
    newRoomSqft += newItemSqft[i];
    roomCost = newRoomSqft * setPaintRate();
  }

  return roomCost.toFixed(2);
}

// calculates a total of all rooms sqft
// returns result converted back to string only displaying 2 places after decemal
function calculateEstimateTotalSqft() {
  let estimateTotalSqft = 0;

  for (let i = 0; i < rooms.length; i++) {
    estimateTotalSqft += calculateRoomSqft(rooms[i]);
  }

  return estimateTotalSqft.toFixed(2);
}

// calculates a total of all rooms cost of labor
// returns result converted back to string only displaying 2 places after decemal
function calculateEstimateTotalPrice() {
  let estimateTotalSqft = 0;
  let estimateTotalPrice = 0;

  for (let i = 0; i < rooms.length; i++) {
    estimateTotalSqft += calculateRoomSqft(rooms[i]);
    estimateTotalPrice = estimateTotalSqft * setPaintRate();
  }

  return estimateTotalPrice.toFixed(2);
}

// when called displays error msg for empty input fields
// scrolls to error msg
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
