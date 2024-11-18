async function consumeMeal(mealId) {
  const userId = event.target.getAttribute('data-user-id');

  const data = {
    userId: userId,
    mealId: mealId,
  };

  try {
    const response = await fetch('/user-meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();

    console.log(result);

    // Show modal with the success message
    showMealsModal(
      `You have successfully consumed ${result.meal.name} and you got calories: ${result.meal.calories}(g), carbohydrates: ${result.meal.carbohydrates}(g), fat: ${result.meal.fat}(g), protein: ${result.meal.protein}(g)`
    );
  } catch (error) {
    console.error('Error:', error);
    alert('There was an error consuming the meal.');
  }
}

// Function to show the water consumption modal
function showMealsModal(message) {
  const modal = document.getElementById('mealsModal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message; // Set the message
  modal.classList.remove('hidden'); // Show the modal

  // Close the modal when the close button is clicked
  const closeModalButton = document.getElementById('closeModalButton');
  closeModalButton.onclick = function () {
    modal.classList.add('hidden'); // Hide the modal
  };
}
