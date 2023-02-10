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

  rooms[roomIndex].cabinets.splice(0, 1);
  rooms[roomIndex].cabinets.push(cabinet);

  renderRooms();
}

// pushes furniture input value to indexed rooms array
function addFurniture(roomIndex) {
  let newFurnitureName = document.querySelector(`#furniture-name-${roomIndex}`);
  let newNumOfPieces = document.querySelector(`#num-of-pieces-${roomIndex}`);
  let newPricePerFurniturePiece = document.querySelector(`#price-per-furniture-piece-${roomIndex}`);

  rooms[roomIndex].furniture = [];

  var newFurniture = {
    furnitureName: newFurnitureName.value,
    numOfPieces: parseInt(newNumOfPieces.value),
    pricePerFurniturePiece: parseInt(newPricePerFurniturePiece.value),
  };

  rooms[roomIndex].furniture.push(newFurniture);

  renderRooms();
}