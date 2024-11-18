async function handleSubmit(event) {
  event.preventDefault();

  try {
    const formData = new FormData(event.target);

    const data = {
      exerciseId: formData.get('exerciseId'), // Get the exercise ID
      duration: formData.get('duration'), // Get the duration
    };

    // Send the filtered data to the server via fetch
    const response = await fetch('/add-user-exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(data), // Stringify the data object
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();

    console.log(result);

    // Show modal with the success message
    showExerciseModal(
      `You have successfully completed ${result.userExercise.exerciseName}, you burned ${result.userExercise.caloriesBurned}g of calories `
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to show the water consumption modal
function showExerciseModal(message) {
  const modal = document.getElementById('exerciseModal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message; // Set the message
  modal.classList.remove('hidden'); // Show the modal

  // Close the modal when the close button is clicked
  const closeModalButton = document.getElementById('closeModalButton');
  closeModalButton.onclick = function () {
    modal.classList.add('hidden'); // Hide the modal
  };
}
