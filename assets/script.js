var rooms = [
  {
    name: "Kitchen",
    items: []
  },
  {
    name: "Master",
    items: [
      {
        name: "Wall One",
        width: 24,
        height: 12
      },
      {
        name: "Window",
        width: 2,
        height: 3
      },
      {
        name: "Door",
        width: 3,
        height: 7
      }
    ]
  },
  {
    name: "Bathroom",
    items: [
      {
        name: "Wall One",
        width: 24,
        height: 12
      },
      {
        name: "Window",
        width: 2,
        height: 3
      },
      {
        name: "Door",
        width: 3,
        height: 7
      }
    ]
  }
]

var roomsDiv = document.querySelector("#rooms-div")
var roomNameInput = document.querySelector("#room-name-input")
var deleteRoomIndex = document.querySelector("#remove-room-input")

function renderRooms(itemSqft) {
  roomsDiv.innerHTML = ""

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];

    let rows = "";
    for (let j = 0; j < room.items.length; j++) {
      const item = room.items[j];
      // var itemSqft = (item.width * item.height)

      const row = `
      <tr>
        <th scope="row">${j + 1}</th>
        <td>${item.name}</td>
        <td>${item.width}</td>
        <td>${item.height}</td>
        <td>${itemSqft}</td>
      </tr>
      `;

      rows = rows + row + "\n";
    }

    roomsDiv.insertAdjacentHTML('beforeend', `
      <h3>${room.name}</h3>
      <p>Room # ${i +1}</p>

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
            <td><input type="text" id="new-item-name-input-room-${i}" name="objectName"></td>
            <td><input type="number" id="new-item-width-input-room-${i}" name="objectWidth"></td>
            <td><input type="number" id="new-item-height-input-room-${i}" name="objectHeight"></td>
          </tr>
          <tr>
            <td><button onclick="addItemSqft(${i})" class="btn btn-primary me-2">Add Sqft</button><button onclick="subItemSqft(${i})" class="btn btn-primary">Subtract
                Sqft</button></td>
          </tr>
          <tr>
            <th scope="col"><label for="removeObject">Remove Item-Object</label></th>
          </tr>
          <tr>
            <td><input type="number" name="removeItem" id="remove-item-input-room-${i}" class="me-2"><button onclick="removeItem(${i})" class="btn btn-primary">Remove</button></td>
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
            <th scope="col">Sqft</th>
          </tr>
        </thead>

        <tbody>
          ${rows}
          <tr>
            <th scope="row"></th>
            <th>Total Sqft:</th>
            <th>510</th>
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

  renderRooms()
}

// looking into adding a btn under every room header to del
// room so no input is needed
// <button onclick="removeRoom()" class="btn btn-primary btn-sm">Remove Room</button>

function removeRoom() {
  rooms.splice(deleteRoomIndex.value, 1)

  renderRooms()
}

function addItemSqft(roomIndex) {
  var addItemName = document.querySelector(`#new-item-name-input-room-${roomIndex}`)
  var addItemHeight = document.querySelector(`#new-item-height-input-room-${roomIndex}`)
  var addItemWidth = document.querySelector(`#new-item-width-input-room-${roomIndex}`)

  console.log(addItemName.value)
  console.log(addItemHeight.value)
  console.log(addItemWidth.value)

  item = {
    name: addItemName.value,
    width: addItemWidth.value,
    height: addItemHeight.value
  }

  console.log(item)

  rooms[roomIndex].items.push(item)

  renderRooms()
}

function subItemSqft(roomIndex) {
  var addItemName = document.querySelector(`#new-item-name-input-room-${roomIndex}`)
  var addItemHeight = document.querySelector(`#new-item-height-input-room-${roomIndex}`)
  var addItemWidth = document.querySelector(`#new-item-width-input-room-${roomIndex}`)

  console.log(addItemName.value)
  console.log(addItemHeight.value)
  console.log(addItemWidth.value)

  item = {
    name: addItemName.value,
    width: addItemWidth.value,
    height: addItemHeight.value
  }

  console.log(item)

  rooms[roomIndex].items.push(item)

  renderRooms()
}

function removeItem(roomIndex) {
  var itemDel = document.querySelector(`#remove-item-input-room-${roomIndex}`)

  rooms[roomIndex].items.splice(itemDel.value, 1)

  renderRooms()
}

renderRooms()
