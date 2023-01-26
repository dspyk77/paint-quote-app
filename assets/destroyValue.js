// removes selected room then renders rooms display with remaining values
function removeRoom(roomIndex) {
  rooms.splice(roomIndex, 1);

  renderRooms();
}

// removes item/object from indexed rooms array
// renders room display with remaining values
function removeItem(roomIndex, itemIndex) {
  rooms[roomIndex].items.splice(itemIndex, 1);

  renderRooms();
}