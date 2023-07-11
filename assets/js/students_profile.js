const updateBtn = document.querySelector(".update-btn");
const updateForm = document.getElementById("updateForm");

updateBtn.addEventListener("click", () => {  // to hide update form
  updateForm.classList.toggle("hidden");
});
