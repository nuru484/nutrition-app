async function handleWeightAdd(event) {
  event.preventDefault();

  try {
    const formData = new FormData(event.target);
    const weight = formData.get('weight'); // Get the weight from the input

    const response = await fetch('/add-weight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weight }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json();
    console.log(result);

    // Show success modal
    showModal(
      `You have updated your weight to ${result.newWeightRecord.weight} kg`
    );
  } catch (error) {
    console.error('Error:', error);
  }
}

function showModal(message) {
  document.getElementById('modal-message').innerText = message;
  document.getElementById('success-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('success-modal').classList.add('hidden');
  loadContent('weight-records');
}
