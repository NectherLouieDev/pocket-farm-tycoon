// ===============================
// FarmKo Farmer Profile Functions
// ===============================

// Farmer Data (can be connected later to database or API)
const farmer = {
    name: "Juan Dela Cruz",
    role: "Organic Farmer",
    yearsFarming: 15,
    crops: 8,
    buyers: 120,
    about: "Dedicated smallholder farmer practicing sustainable and organic farming methods. Passionate about soil health, food security, and environmental stewardship.",
    skills: ["Rice", "Vegetables", "Corn", "Organic Farming", "Composting", "SALT"],
    followers: 0
};

// ===============================
// Load Farmer Profile Data
// ===============================
function loadFarmerProfile() {
    document.getElementById("farmerName").textContent = farmer.name;
    document.getElementById("farmerRole").textContent = farmer.role;
    document.getElementById("yearsFarming").textContent = farmer.yearsFarming;
    document.getElementById("cropsCount").textContent = farmer.crops;
    document.getElementById("buyersCount").textContent = farmer.buyers;
    document.getElementById("aboutText").textContent = farmer.about;

    // Load Skills Tags
    const skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = "";

    farmer.skills.forEach(skill => {
        const tag = document.createElement("div");
        tag.className = "tag";
        tag.textContent = skill;
        skillsContainer.appendChild(tag);
    });
}

// ===============================
// Follow Farmer Function
// ===============================
function followFarmer() {
    farmer.followers++;
    alert("You are now following " + farmer.name + "!\nTotal Followers: " + farmer.followers);
}

// ===============================
// Message Farmer Function
// ===============================
function messageFarmer() {

    alert("Compose your message");
}

// ===============================
// View Products (Future Feature)
// ===============================
function viewProducts() {
    
     window.location.href = "../profile_products/index.html";
}

// ===============================
// Initialize Profile on Page Load
// ===============================
window.onload = loadFarmerProfile;
