var rooms = [
  {
    name: "",
    items: [],
    roomSqft: 0,
  },
];

var roomsDiv = document.querySelector("#rooms-div");
var roomNameInput = document.querySelector("#room-name-input");
var deleteRoomIndex = document.querySelector("#remove-room-input");
let displayEstimateTotal = document.querySelector("#esitmate-totals")

function renderRooms() {
  roomsDiv.innerHTML = "";

  let totalEstimateRows = "";
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    console.log(room);

    const totalEstimateRow = `
    <tr>
      <th scope="col">${room.name}</th>
      <th scope="col">${calculateRoomSqft(room)}</th>
      <th scope="col">$1.50</th>
      <th scope="col" colspan="2">$${calculateRoomSqft(room)}.00</th>
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
            <th scope="col"><label for="objectLenght">Object Width</label></th>
            <th scope="col"><label for="objectHeight">Object Height</label></th>
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

    if(rooms.length > 1) {
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
                <th colspan="4">$${calculateEstimateTotalPrice(room)}.00</th>
              </tr>
            </tbody>
          </table>
    
      `
      );
    }
  }
}

function addRoom() {
  var room = {
    name: roomNameInput.value,
    items: [],
  };

  rooms.push(room);

  if (!rooms[0].name) {
    rooms.splice(0, 1);
  }

  roomNameInput.value = "";

  renderRooms();
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

  item = {
    name: newItemName.value,
    width: parseInt(newItemWidth.value),
    height: parseInt(newItemHeight.value),
    itemSqft: parseInt(newItemWidth.value * newItemHeight.value)
  };

  rooms[roomIndex].items.push(item);

  renderRooms(addSubItem);
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

  var item = {
    name: newItemName.value,
    width: -parseInt(newItemWidth.value),
    height: -parseInt(newItemHeight.value),
    itemSqft: -parseInt(newItemWidth.value * newItemHeight.value)
  };

  rooms[roomIndex].items.push(item);

  renderRooms(addSubItem);
}

function removeItem(roomIndex, itemIndex) {
  rooms[roomIndex].items.splice(itemIndex, 1);

  renderRooms();
}

function calculateRoomSqft(room, i) {
  var newItemSqft = room.items.map(x => x.itemSqft);

  let newRoomSqft = 0;
  for(var i = 0; i < room.items.length; i++) {
    newRoomSqft += newItemSqft[i];
  }

  room.roomSqft = newRoomSqft;

  return room.roomSqft;
}

function calculateEstimateTotalSqft(room) {
  let estimateTotalSqft = 0;

  for(let i = 0; i < rooms.length; i++) {
    
    estimateTotalSqft += calculateRoomSqft(rooms[i]);
  }

  return estimateTotalSqft;
}

function calculateEstimateTotalPrice(room) {
  let estimateTotalSqft = 0;
  let estimateTotalPrice = 0;

  for(let i = 0; i < rooms.length; i++) {
    
    estimateTotalSqft += calculateRoomSqft(rooms[i]);
    estimateTotalPrice = (estimateTotalSqft * 1.5)
  }

  return estimateTotalPrice;
}
