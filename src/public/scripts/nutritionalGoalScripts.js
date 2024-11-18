async function addNutritionalGoal(event) {
  event.preventDefault();

  try {
    const formData = new FormData(event.target);
    const data = {
      nutrientType: formData.get('nutrientType'),
      goalAmount: formData.get('goalAmount'),
    };

    const response = await fetch('/nutrition-goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    console.log(result);

    // Show modal with the success message
    showNutritionModal(`You have successfully set a goal`);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to show the water consumption modal
function showNutritionModal(message) {
  const modal = document.getElementById('nutritionModal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message; // Set the message
  modal.classList.remove('hidden'); // Show the modal

  // Close the modal when the close button is clicked
  const closeModalButton = document.getElementById('closeModalButton');
  closeModalButton.onclick = function () {
    modal.classList.add('hidden'); // Hide the modal

    // Reload content or update UI as needed
    loadContent('nutrition-goals');
  };
}
