let coins = 100;
let inventory = 0;

function buySeed(price) {
  if (coins >= price) {
    coins -= price;
    inventory += 1;
    document.getElementById("coins").textContent = coins;
    document.getElementById("inventory").textContent = inventory;
  } else {
    alert("Not enough coins");
  }
}
