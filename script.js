// script.js
function toggleSelect(button) {
  const itemDiv = button.parentElement;
  const selected = itemDiv.classList.toggle("selected");
  button.textContent = selected ? "Deselect" : "Select";
}

// Hamburger menu toggle
const hamburger = document.getElementById("hamburger");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.getElementById("navLinks");


hamburger.addEventListener("click", () => {
  navLinks.style.display = "flex";
  hamburger.style.display = "block";
  closeBtn.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  navLinks.style.display = "none"
  hamburger.style.display = "block";
  closeBtn.style.display = "none";
});


// Optional: Hide nav if screen resized to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    navLinks.classList.remove("active");
    hamburger.style.display = "none";
    closeBtn.style.display = "none";
  } else {
    hamburger.style.display = "block";
  }
});

// Toggle selection and update textarea
function toggleSelect(button) {
  const itemDiv = button.parentElement;
  const categoryDiv = itemDiv.closest(".category");
  const itemName = itemDiv.querySelector("p").textContent.trim();
  const isSelected = itemDiv.classList.contains("selected");

  const limit = getCategoryLimit(categoryDiv);
  const selectedCount = categoryDiv.querySelectorAll(".item.selected").length;

  // Trying to select
  if (!isSelected) {
    if (selectedCount >= limit) {
      alert(`You can only select Only ${limit} item(s) in this category.`);
      return;
    }
    itemDiv.classList.add("selected");
    button.textContent = "Deselect";
    addItemToTextarea(itemName);
  }
  // Deselect
  else {
    itemDiv.classList.remove("selected");
    button.textContent = "Select";
    removeItemFromTextarea(itemName);
  }
}

// Extract limit from h3 tag (e.g., "Paneer (any one)")
function getCategoryLimit(categoryDiv) {
  const h3 = categoryDiv.querySelector("h3").textContent;
  const match = h3.match(/\((.*?)\)/); // Extracts text inside brackets
  if (!match) return Infinity;

  const text = match[1].toLowerCase().trim();

  if (text.includes("one")) return 1;
  if (text.includes("two")) return 2;
  if (text.includes("three")) return 3;
  if (text.includes("four")) return 4;

  const num = parseInt(text);
  return isNaN(num) ? Infinity : num;
}

// (Other existing functions remain unchanged)
function addItemToTextarea(item) {
  const textarea = document.getElementById("selectedItems");
  let items = textarea.value ? textarea.value.split("\n") : [];
  if (!items.includes(item)) {
    items.push(item);
  }
  textarea.value = items.join("\n");
}

function removeItemFromTextarea(item) {
  const textarea = document.getElementById("selectedItems");
  let items = textarea.value ? textarea.value.split("\n") : [];
  items = items.filter(i => i !== item);
  textarea.value = items.join("\n");
}
