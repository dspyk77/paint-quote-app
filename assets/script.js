var rooms = [
  {
    name: "Kitchen",
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

function renderRooms() {
  const room = rooms[0]
  const item = room.items[0]
  var sqft = (item.width * item.height)

  roomsDiv.innerHTML = ""

  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];

    let rows = "";
    for (let j = 0; j < room.items.length; j++) {
      const item = room.items[j];

      const row = `
      <tr>
        <th scope="row">${j}</th>
        <td>${item.name}</td>
        <td>${item.width}</td>
        <td>${item.height}</td>
        <td>${sqft}</td>
      </tr>
      `;

      rows = rows + row + "\n";
    }

    roomsDiv.insertAdjacentHTML('beforeend', `
      <h3>${room.name}</h3>
      <p>Room # ${i}</p>

      <table class="table">
        <thead>
          <tr>
            <th scope="col"><label for="objectName">New Object Name</label></th>
            <th scope="col"><label for="objectLenght">Object Length</label></th>
            <th scope="col"><label for="objectHeight">Object Height</label></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" name="objectName"></td>
            <td><input type="number" name="objectLenght"></td>
            <td><input type="number" name="objectHeight"></td>
          </tr>
          <tr>
            <td><button class="btn btn-primary me-2">Add Sqft</button><button class="btn btn-primary">Subtract
                Sqft</button></td>
          </tr>
          <tr>
            <th scope="col"><label for="removeObject">Remove Object</label></th>
          </tr>
          <tr>
            <td><input type="number" name="removeObject" class="me-2"><button class="btn btn-primary">Remove Object</button></td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Item-Object</th>
            <th scope="col">Width</th>
            <th scope="col">Length</th>
            <th scope="col">Sqft</th>
          </tr>
        </thead>

        <tbody>
          ${rows}
        </tbody>
      </table>
    `);
  }
}

renderRooms()

function addRoom() {
  console.log(roomNameInput.value)
}

