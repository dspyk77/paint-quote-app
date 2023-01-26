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

// allows entered room name to be sumbited using the enter btn
roomNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addRoom();
  }
});