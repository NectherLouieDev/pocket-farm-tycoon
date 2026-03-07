let headerTitle = "Seed Shop";

let coins = 100;
let inventory = 0;

/* -----------------------------
   SHOP DATA
--------------------------------*/

const seeds = [
  {
    id: "rice",
    title: "Rice",
    price: 5,
    image: "./images/rice.png",
    growth: "5 min",
    yield: "8 Rice"
  },
  {
    id: "corn",
    title: "Corn",
    price: 8,
    image: "./images/corn.png",
    growth: "8 min",
    yield: "12 Corn"
  },
  {
    id: "wheat",
    title: "Wheat",
    price: 6,
    image: "./images/wheat.png",
    growth: "6 min",
    yield: "10 Wheat"
  },
  {
    id: "mango",
    title: "Mango",
    price: 10,
    image: "./images/mango.png",
    growth: "12 min",
    yield: "3 Mango"
  },
  {
    id: "banana",
    title: "Banana",
    price: 17,
    image: "./images/banana.png",
    growth: "12 min",
    yield: "3 Banana"
  }
];

/* -----------------------------
   RENDER SHOP
--------------------------------*/

const shopGrid = document.getElementById("shopGrid");

function renderShop() {
  shopGrid.innerHTML = "";

  seeds.forEach(seed => {
    const item = document.createElement("div");
    item.className = "card shop-item";

    item.innerHTML = `
      <div class="text-center mb-1">
        <img src="${seed.image}" alt="${seed.title}" class="crop-icon">
      </div>

      <h4 class="text-center mb-1">${seed.title}</h4>

      <div class="crop-details mb-2">
        <div class="crop-row">
          <span>Cost</span>
          <span class="crop-value">${seed.price}</span>
        </div>
        <div class="crop-row">
          <span>Growth</span>
          <span class="crop-value">${seed.growth}</span>
        </div>
        <div class="crop-row">
          <span>Yield</span>
          <span class="crop-value">${seed.yield}</span>
        </div>
      </div>

      <div class="text-center">
        <button class="btn btn-primary" data-id="${seed.id}">
          Buy
        </button>
      </div>
    `;

    item.querySelector("button").addEventListener("click", () => {
      buySeed(seed.id);
    });

    shopGrid.appendChild(item);
  });
}

/* -----------------------------
   GAME LOGIC
--------------------------------*/

function buySeed(seedId) {
  const seed = seeds.find(s => s.id === seedId);
  if (!seed) return;

  if (coins < seed.price) {
    alert("Not enough coins");
    return;
  }

  coins -= seed.price;
  inventory += 1;

  updateUI();
}

function updateUI() {
  // Header title is now static in HTML (Seed Shop),
  // so we only update stats.
  document.getElementById("coins").textContent = coins;
  document.getElementById("inventory").textContent = inventory;
}

/* -----------------------------
   TEST BUTTON (keep working)
--------------------------------*/

const testBtn = document.getElementById("testBtn");

if (testBtn) {
  testBtn.addEventListener("click", onTestBtnClicked);
}

function onTestBtnClicked() {
  testBtn.textContent = "HAHAHA";
  alert("TeST BTN");
}

/* -----------------------------
   INIT
--------------------------------*/

renderShop();
updateUI();