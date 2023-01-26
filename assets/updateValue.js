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