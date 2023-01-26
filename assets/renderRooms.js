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

// when called displays current values of all rooms and totals sections
function renderRooms() {
  roomsDiv.innerHTML = "";
  emptyInputAlert.innerHTML = "";

  let totalEstimateRows = "";
  let cabinetRows = "";
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];

    const totalEstimateRow = `
    <tr>
      <th scope="col">${room.name}</th>
      <th scope="col">${calculateRoomSqft(room)}</th>
      <th scope="col">$${setPaintRate()}</th>
      <th scope="col" colspan="2">$${calculateRoomCost(room)}</th>
    </tr>
    `;

    totalEstimateRows = totalEstimateRows + totalEstimateRow + "\n";

    if( typeof rooms[i].cabinets !== 'undefined' && rooms[i].cabinets.length > 0) {
      const cabinetDisplay = room.cabinets[0];

        const cabinetRow =  `
        <tr>
          <th scope="row">${1}</th>
          <td>${cabinetDisplay.numOfBases}</td>
          <td>${cabinetDisplay.numOfDoors}</td>
          <td>${cabinetDisplay.numOfDrawers}</td>
          <td><button onclick="" class="btn btn-outline-danger btn-sm ms-4">Edit</button></td>
        </tr>
        `;

        cabinetRows = cabinetRows + cabinetRow + "\n";
    };

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
                  <button type="submit" class="btn btn-primary" onclick="addCabinets(${i})" data-bs-dismiss="modal">Add Cabinet(s)</button>
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
        
        <!-- room input table -->
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
      
      <!-- room object display table -->
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

      <!-- room cabinet display -->
      <table class="table">
        <h4>Cabinets</h4>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Number of Bases</th>
              <th scope="col">Nubmer of Doors</th>
              <th scope="col">Number of Drawers</th>
            </tr>
          </thead>

          <tbody>
            ${cabinetRows}
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