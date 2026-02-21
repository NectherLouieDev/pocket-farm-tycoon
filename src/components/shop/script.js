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
    item.className = "shop-item";

    item.innerHTML = `
      <img src="${seed.image}" alt="${seed.title}">
      <div class="shop-item-info">
        <h3>${seed.title}</h3>
        <p>Cost: <strong>${seed.price}</strong> coins</p>
        <p>Growth Time: <strong>${seed.growth}</strong></p>
        <p>Yield: <strong>${seed.yield}</strong></p>
      </div>
      <button data-id="${seed.id}">BUY</button>
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