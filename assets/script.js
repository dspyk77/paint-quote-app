
















// when called displays error msg for empty input fields
// scrolls to error msg
function emptyInputAlertDisplay() {
  emptyInputAlert.insertAdjacentHTML(
    "beforeend",
    `
    <div id="empty-input-alert" class="alert alert-danger alert-dismissible fade show" role="alert">
      <span>
        <i class="bi bi-bandaid"></i><span class="fw-bold">Uh oh!</span>
        Look's like you left an input box empty! Make sure everthing is filled out and try again<i class="bi bi-hand-thumbs-up"></i>
      </span>
      <button class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
  );
  emptyInputAlert.scrollIntoView();
}