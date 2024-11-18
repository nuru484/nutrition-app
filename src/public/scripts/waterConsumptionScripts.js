async function handleWaterConsume(event) {
  event.preventDefault();

  try {
    const formData = new FormData(event.target);
    const data = {
      amount: formData.get('amount'), // Get the amount
    };

    // Send the filtered data to the server via fetch
    const response = await fetch('/add-water', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify(data), // Stringify the data object
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();

    console.log(result);

    // Show modal with the success message
    showWaterModal(
      `You have successfully drank ${result.waterConsumption.amount} L of water!`
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to show the water consumption modal
function showWaterModal(message) {
  const modal = document.getElementById('waterModal');
  const modalMessage = document.getElementById('modalMessage');
  modalMessage.textContent = message; // Set the message
  modal.classList.remove('hidden'); // Show the modal

  // Close the modal when the close button is clicked
  const closeModalButton = document.getElementById('closeModalButton');
  closeModalButton.onclick = function () {
    modal.classList.add('hidden'); // Hide the modal

    // Reload content or update UI as needed
    loadContent('water-consumption');
  };
}
