let selectedItems = [];

function toggleSelect(button) {
  const card = button.closest(".card");
  const itemName = card.getAttribute("data-name");

  if (button.classList.contains("selected")) {
    button.classList.remove("selected");
    button.textContent = "Select";
    selectedItems = selectedItems.filter(item => item !== itemName);
  } else {
    button.classList.add("selected");
    button.textContent = "Unselect";
    selectedItems.push(itemName);
  }

  document.getElementById("selectedItems").value = selectedItems.join(", ");
}


function showCategory(category) {
  document.querySelectorAll(".category").forEach(sec => sec.style.display = "none");
  document.getElementById(category).style.display = "grid";
}

function submitOrder(event) {
  event.preventDefault();
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;
  const Address = document.getElementById("customerAddress").value;
  const items = document.getElementById("selectedItems").value;

  if (!items) {
    alert("Please select at least one food item!");
    return;
  }

  alert(`Order Submitted!\n\nName: ${name}\nPhone: ${phone} \nAddress: ${Address} \nItems: ${items}`);

  // Clear everything
  selectedItems = [];
  document.getElementById("customerName").value = "";
  document.getElementById("customerPhone").value = "";
  document.getElementById("customerAddress").value = "";
  document.getElementById("selectedItems").value = "";

  document.querySelectorAll(".select-btn").forEach(btn => {
    btn.classList.remove("selected");
    btn.textContent = "Select";
  });
}

// Show veg by default
showCategory("veg");
