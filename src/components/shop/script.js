
let headerTitle = "Seed Shop";

let coins = 100;
let inventory = 0;

/* -----------------------------
   SHOP DATA (separated)
--------------------------------*/

const seeds = [
  {
    id: "rice",
    title: "Rice Seeds",
    price: 5
  },
  {
    id: "corn",
    title: "Corn Seeds",
    price: 8
  },
  {
    id: "wheat",
    title: "Wheat Seeds",
    price: 6
  },
  {
    id: "mango",
    title: "Mango Seeds",
    price: 10
  }
];

/* -----------------------------
   RENDER SHOP
--------------------------------*/

const shopGrid = document.getElementById("shopGrid");

function renderShop() {
  shopGrid.innerHTML = "";

  seeds.forEach(seed => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${seed.title}</h3>
      <div class="price">Price: ${seed.price} coins</div>
      <button data-id="${seed.id}">Buy</button>
    `;

    const button = card.querySelector("button");
    button.addEventListener("click", () => {
      buySeed(seed.id);
    });

    shopGrid.appendChild(card);
  });
}

/* -----------------------------
   GAME LOGIC
--------------------------------*/

function buySeed(seedId) {
  const seed = seeds.find(s => s.id === seedId);

  if (!seed) return;

  if (coins >= seed.price) {
    coins -= seed.price;
    inventory += 1;

    updateUI();
  } else {
    alert("Not enough coins");
  }
}

function updateUI() {
  document.getElementById("header-title").textContent = headerTitle;
  document.getElementById("coins").textContent = coins;
  document.getElementById("inventory").textContent = inventory;
}

/* -----------------------------
   INIT
--------------------------------*/

var testBtn = document.getElementById("testBtn");
testBtn.addEventListener("click", onTestBtnClicked);

function onTestBtnClicked() {
  testBtn.textContent = "HAHAHA";
  alert("TeST BTN");
}

renderShop();
updateUI();
