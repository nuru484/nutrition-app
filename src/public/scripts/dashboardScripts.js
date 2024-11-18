async function loadContent(endpoint) {
  try {
    const response = await fetch(`/${endpoint}`);
    console.log(response);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text();

    // Load the content into the main container
    const mainContainer = document.getElementById('main-container');

    mainContainer.innerHTML = '';
    mainContainer.innerHTML = html;
  } catch (error) {
    console.error('Error loading content:', error);
    document.getElementById('main-container').innerHTML =
      'Error loading content';
  }
}

async function handleDelete(event, endpoint, recordId) {
  event.preventDefault();

  try {
    // Send the DELETE request to the server
    const response = await fetch(`/${endpoint}/${recordId}`, {
      method: 'DELETE', // Specify the method as DELETE
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
    });

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    const result = await response.json(); // Optional: Handle response if needed
    console.log(result);

    loadContent(endpoint);
  } catch (error) {
    console.error('Error:', error);
  }
}
