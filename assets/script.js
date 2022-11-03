var rooms = [
  {
    name: "",
    items: []
  }
]
 
var roomsDiv = document.querySelector("#rooms-div")
var roomNameInput = document.querySelector("#room-name-input")
var deleteRoomIndex = document.querySelector("#remove-room-input")
var roomSqft = 0
var plusMinus = ""

function renderRooms(itemSqft) {
  roomsDiv.innerHTML = ""

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];

    let rows = "";
    for (let j = 0; j < room.items.length; j++) {
      const item = room.items[j];
      var itemSqft = (item.width * item.height)

      const row = `
      <tr>
        <th scope="row">${j + 1}</th>
        <td>${item.name}</td>
        <td>${item.width}</td>
        <td>${item.height}</td>
        <td id="add-sub-item-room-${i}">${item.posOrNeg} ${itemSqft}</td>
        <td><button onclick="removeItem(${i}, ${j})" class="btn btn-outline-danger btn-sm ms-4">Delete</button></td>
      </tr>
      `;

      rows = rows + row + "\n";
    }

    roomsDiv.insertAdjacentHTML('beforeend', `
      <h3>${room.name}</h3>
      <p>Room # ${i +1}</p>
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
            <th colspan="4">${roomSqft}</th>
          </tr>
        </tbody>
      </table>
    `);
  }
}

function addRoom() {
  room = {
    name: roomNameInput.value,
    items: []
  }

  rooms.push(room)

  if (rooms[0].name === "") {
    rooms.splice(0, 1)
  }

  roomNameInput.value = ""

  renderRooms()
}

// looking into adding a btn under every room header to del
// room so no input is needed
// <button onclick="removeRoom()" class="btn btn-primary btn-sm">Remove Room</button>

function removeRoom(roomIndex) {
  rooms.splice(roomIndex, 1)

  renderRooms()
}

function addItemSqft(roomIndex, itemSqft) {
  var newItemName = document.querySelector(`#new-item-name-input-room-${roomIndex}`)
  var newItemHeight = document.querySelector(`#new-item-height-input-room-${roomIndex}`)
  var newItemWidth = document.querySelector(`#new-item-width-input-room-${roomIndex}`)
  var addSubItem = document.querySelector(`#add-sub-item-room-${roomIndex}`)

  item = {
    name: newItemName.value,
    width: newItemWidth.value,
    height: newItemHeight.value,
    posOrNeg: "+"
  }

  rooms[roomIndex].items.push(item)


  itemSqft = (item.width * item.height)
  roomSqft = (roomSqft + itemSqft)

  renderRooms(itemSqft, addSubItem)
}

function subItemSqft(roomIndex, itemSqft) {
  var newItemName = document.querySelector(`#new-item-name-input-room-${roomIndex}`)
  var newItemHeight = document.querySelector(`#new-item-height-input-room-${roomIndex}`)
  var newItemWidth = document.querySelector(`#new-item-width-input-room-${roomIndex}`)
  var addSubItem = document.querySelector(`#add-sub-item-room-${roomIndex}`)

  item = {
    name: newItemName.value,
    width: newItemWidth.value,
    height: newItemHeight.value,
    posOrNeg: "-"
  }

  rooms[roomIndex].items.push(item)

  itemSqft = (item.width * item.height)
  roomSqft = (roomSqft - itemSqft)

  renderRooms(itemSqft, addSubItem)
}

function removeItem(roomIndex, itemIndex) {
  var removeItemSqft = (rooms[roomIndex].items[itemIndex].width * rooms[roomIndex].items[itemIndex].height)
  roomSqft = (roomSqft - removeItemSqft)

  rooms[roomIndex].items.splice(itemIndex, 1)

  renderRooms()
}

