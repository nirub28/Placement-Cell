const updateBtn = document.querySelector('.update-btn');
const updateForm = document.getElementById('updateForm');

console.log('working');

updateBtn.addEventListener('click', () => {
  updateForm.classList.toggle('hidden');
});
