class Room {
  constructor(name, items, roomSqft) {
    this.name = name;
    this.items = items;
    this.roomSqft = roomSqft;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  calculateRoomSqft() {
    // Calculate the total square footage of the room based on its items
  }

  calculateRoomCost() {
    // Calculate the cost of the room based on its square footage and items
  }
}

class Item {
  constructor(name, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;
  }

  calculateItemSqft() {
    // Calculate the square footage of the item
  }
}

// Initialize the list of rooms
const rooms = [
  new Room("", [], 0),
];

const roomsDiv = document.querySelector("#rooms-div");
const roomNameInput = document.querySelector("#room-name-input");
const displayEstimateTotal = document.querySelector("#esitmate-totals");
const emptyInputAlert = document.querySelector("#empty-input-alert");

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
        <th scope="col">${room.calculateRoomSqft()}</th>
        <th scope="col">$1.50</th>
        <th scope="col" colspan="2">$${room.calculateRoomCost()}</th>
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
          <td id="add-sub-item-room-${i}">${item.calculateItemSqft()}</td>
          <td><button onclick="removeItem(${i}, ${j})" class="btn btn-outline-danger btn-sm ms-4">Delete</button></td>
        </tr>
      `;

      rows = rows + row + "\n";
    }

    roomsDiv.insertAdjacentHTML(
      "
