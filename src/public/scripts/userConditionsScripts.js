// src/public/scripts/dashboardScripts.js

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

// Search functionality
document
  .getElementById("conditionSearch")
  .addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll("#conditionsGrid .condition-card");
    let visibleCount = 0;

    cards.forEach((card) => {
      const conditionName = card.dataset.conditionName.toLowerCase();
      const description =
        card
          .querySelector(".condition-description")
          ?.textContent.toLowerCase() || "";

      const matches =
        conditionName.includes(searchTerm) ||
        description.includes(searchTerm) ||
        searchTerm === "";

      card.style.display = matches ? "block" : "none";
      if (matches) visibleCount++;
    });

    // Update search results count if needed
    if (searchTerm && visibleCount === 0) {
      document.getElementById("conditionsGrid").innerHTML = `
          <div class="col-span-full text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <p class="text-gray-500 text-lg">No conditions found matching "<strong>${searchTerm}</strong>"</p>
          </div>
        `;
    }
  });

// Add condition
async function addCondition(conditionId, conditionName) {
  const button = event.target.closest("button");
  const originalText = button.innerHTML;

  // Disable button and show loading
  button.disabled = true;
  button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Adding...
      `;

  try {
    const response = await fetch("/user-conditions/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ conditionId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }

    if (data.success) {
      // Update button to show added state
      button.innerHTML = `
            <span class="flex items-center justify-center">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Condition Active
            </span>
          `;
      button.className =
        "w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform condition-added shadow-lg shadow-green-200/50";
      button.onclick = () => removeCondition(conditionId);

      showNotification(`"${conditionName}" added successfully!`, "success");

      // Reload to update active conditions section
      setTimeout(() => location.reload(), 1500);
    }
  } catch (error) {
    console.error("Error adding condition:", error);
    button.innerHTML = originalText;
    button.disabled = false;
    showNotification(
      error.message || "Error adding condition. Please try again.",
      "error"
    );
  }
}

// Remove condition
async function removeCondition(conditionId) {
  if (
    !confirm(
      "Are you sure you want to remove this condition? This will affect your personalized meal recommendations."
    )
  ) {
    return;
  }

  const button = event.target.closest("button");
  const originalText = button.innerHTML;

  // For remove buttons in active conditions, find the closest card button or use the event target
  button.disabled = true;
  button.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-red-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Removing...
      `;

  try {
    const response = await fetch(`/user-conditions/remove/${conditionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! Status: ${response.status}`);
    }

    if (data.success) {
      showNotification("Condition removed successfully!", "success");
      setTimeout(() => location.reload(), 1500);
    }
  } catch (error) {
    console.error("Error removing condition:", error);
    button.innerHTML = originalText;
    button.disabled = false;
    showNotification(
      error.message || "Error removing condition. Please try again.",
      "error"
    );
  }
}

// Notification system
function showNotification(message, type) {
  // Remove existing notifications
  const existing = document.querySelector(".notification-toast");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `
        notification-toast fixed top-4 right-4 z-50 p-4 rounded-xl shadow-xl text-white transform 
        translate-x-full transition-transform duration-300 max-w-sm w-full
        ${
          type === "success"
            ? "bg-gradient-to-r from-emerald-500 to-teal-600"
            : "bg-gradient-to-r from-red-500 to-rose-600"
        }
      `;
  notification.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-medium">${message}</span>
          <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-white/80 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.classList.remove("translate-x-full");
  }, 100);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.classList.add("translate-x-full");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 4000);
}

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    'button[onclick*="addCondition"], button[onclick*="removeCondition"]'
  );
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.disabled) e.preventDefault();
    });
  });
});
