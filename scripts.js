"use strict";

/* Each ItemPurchase object represents a single transaction */
class ItemPurchase {
    constructor(price, category, description = '') {    // if a description isn't provided, default to an empty string
        this.price = price;
        this.category = category;
        this.description = description;
    }
}

let transactionHistory = [];

let totalBudget = 0;
let totalSpent = 0;

let categoryBudget = [0, 0, 0, 0];
let categorySpent = [0, 0, 0, 0];

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "150px";
    document.getElementById("main").style.marginRight = "150px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

/* Sets the weekly budget to the number that the user enters, then sets category budgets based on that */
function weeklyBudget() {
    totalBudget = document.getElementById("userBudget").value;
    document.getElementById('budgetDisplay').innerHTML = `$${totalBudget}`;
    categoryBudget = [0.1 * totalBudget,    // Entertainment
        0.3 * totalBudget,                  // Food
        0.1 * totalBudget,                  // Clothing
        0.5 * totalBudget];                 // Bills
    for (let i = 0; i < categoryBudget.length; i++) {
        updateCategory(i);                  // update each category line on the page
    }
}

/* Updates the total amount available to spend on the webpage */
function decreaseTotal() {
   const newtotal =  totalBudget - totalSpent;
   document.getElementById('budgetDisplay').innerHTML = `$${newtotal}`;
} 

const form = document.querySelector('.form');   // this is the "Enter a transaction" form

/* When the user clicks Submit, process the transaction */
form.addEventListener('submit', e => {
    e.preventDefault();

    const price = Number(document.querySelector('#moneySpent').value);

    if (price > 0) {
        totalSpent +=  price;   // update total budget
        moneyLeft();            // update progress bar
        decreaseTotal();        // decreases transactions from total on top center of page

        const selectedCategory = document.querySelector('#categoryDropdown');
        const categoryName = selectedCategory.options[selectedCategory.selectedIndex].text;
        
        const latestTransaction = new ItemPurchase(price, categoryName);
        transactionHistory.unshift(latestTransaction);      // add latest transaction to the start of array
        console.log(transactionHistory);

        // find correct array index for categoryBudget/categorySpent based on dropdown box
        const selectedIndex = selectedCategory.selectedIndex;
        updateCategory(selectedIndex, latestTransaction.price);
    }
    overBudget();
});

/* updates the amount spent in the proper category, then displays it on the page */
function updateCategory(category, price = 0) {
    categorySpent[category] += price;

    let priceDisplay;       // priceDisplay is which line of category spending to update in the HTML

    switch (category) {
        case 0:
            priceDisplay = document.querySelector('#dollarsCategory1');
            break;
        case 1:
            priceDisplay = document.querySelector('#dollarsCategory2');
            break;
        case 2:
            priceDisplay = document.querySelector('#dollarsCategory3');
            break;
        case 3:
            priceDisplay = document.querySelector('#dollarsCategory4');
            break;
    }

    // update the HTML line, using toFixed(2) to put it in money format
    priceDisplay.innerHTML = `$${categorySpent[category].toFixed(2)} / $${categoryBudget[category].toFixed(2)}`;
}

/* Calculates what percentage of total budget has been spent and updates the progress bar */
function moneyLeft() {
    const remainingPercent = totalSpent / totalBudget * 100;
    document.getElementById("myBar").style.width = `${remainingPercent}%`;
    if (totalBudget < totalSpent) {
        document.getElementById("myBar").style.width = '100%';
    }
} 

let moo = new Audio("./sounds/Cow.mp3")
let heard = new Audio("./sounds/SmallHerd.mp3")

/* Alerts the user if their spending reaches or exceeds the total budget */
function overBudget(){
    if (totalSpent == totalBudget){
        document.getElementById("cashCow").style.display = "contents";
        moo.play();
    } else if (totalSpent > totalBudget){
        document.getElementById("alertCow").style.display = "contents";
        document.getElementById("cashCow").style.display = "none";
        heard.play();
    }
}