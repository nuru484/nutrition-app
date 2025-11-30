async function loadContent(endpoint) {
  try {
    const response = await fetch(`/${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const html = await response.text();
    const mainContainer = document.getElementById("main-container");

    mainContainer.innerHTML = html;

    // Update active sidebar button
    updateActiveSidebarButton(endpoint);
  } catch (error) {
    console.error("Error loading content:", error);
    document.getElementById("main-container").innerHTML =
      '<div class="text-center py-12"><p class="text-red-500 text-lg">Error loading content. Please try again.</p></div>';
  }
}

function updateActiveSidebarButton(activeEndpoint) {
  // Remove active class from all sidebar buttons
  const sidebarButtons = document.querySelectorAll(".sidebar-button");
  sidebarButtons.forEach((button) => {
    button.classList.remove("bg-blue-700");
    button.classList.add("bg-blue-500");
  });

  // Add active class to current button
  const activeButton =
    document.getElementById(activeEndpoint) ||
    document.querySelector(`[onclick="loadContent('${activeEndpoint}')"]`);
  if (activeButton) {
    activeButton.classList.remove("bg-blue-500");
    activeButton.classList.add("bg-blue-700");
  }
}

// Set dashboard as active on page load
document.addEventListener("DOMContentLoaded", function () {
  updateActiveSidebarButton("dashboard");
});
