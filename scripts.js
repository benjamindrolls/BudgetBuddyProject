"use strict";

/* Each ItemPurchase object represents a single transaction */
class ItemPurchase {
    constructor(price, category, description = '') {    // if a description isn't provided, default to an empty string
        this.price = price;
        this.category = category;
        this.description = description;
    }
}

/* creates a variable with empty array to display history of transactions 
to be added by user later */
let transactionHistory = [];

/* starts remaining total at zero, and then increases as total budget is entered */
let totalBudget = 0;
let totalSpent = 0;

/* starts category totals at zero in array, which increases as total budget
and transactions are entered */
let categoryBudget = [0, 0, 0, 0];
let categorySpent = [0, 0, 0, 0];

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "150px";
    document.getElementById("main").style.marginRight = "150px";
}

/* Set the width of the side navigation to 0 and the left margin of the 
page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
}

/* Sets the weekly budget to the number that the user enters, then sets 
/* category budgets based on that */
function weeklyBudget() {
    // value is determined by number entered in input box
    totalBudget = document.getElementById("userBudget").value;
    document.getElementById('budgetDisplay').innerHTML = `$${totalBudget}`;
    /* creates array that prints suggested percents for each category */
    categoryBudget = [0.1 * totalBudget,    // Entertainment
                      0.3 * totalBudget,    // Food
                      0.1 * totalBudget,    // Clothing
                      0.5 * totalBudget];   // Bills
    for (let i = 0; i < categoryBudget.length; i++) {
        updateCategory(i);                  /* updates each category line on the page */
    }
    document.getElementById("moneySpent").disabled = false; /* enables transactions
    to be entered in input */
}

/* Updates the total amount available to spend on the webpage */
function decreaseTotal() {
   const newtotal = totalBudget - totalSpent;
   document.getElementById('budgetDisplay').innerHTML = `$${newtotal}`;
} 

/* this is the "Enter a transaction" form. form starts on line 47 in html*/
const form = document.querySelector('.form');   

/* When the user clicks Submit, process the transaction */
form.addEventListener('submit', e => {
    e.preventDefault();

    /* is the "Number" class predetermined in JS to only receive numbers,
    similar to the number input in html? */
    const price = Number(document.querySelector('#moneySpent').value);

    if (price > 0) {
        totalSpent +=  price;   // updates total budget
        updateProgressBar();    // updates progress bar
        decreaseTotal();        // decreases transactions from total on top center of page
        overBudget();           // displays cow if at or over total budget

        /* Receives selected category and declares new variable */
        const selectedCategory = document.querySelector('#categoryDropdown');
        const categoryName = selectedCategory.options[selectedCategory.selectedIndex].text;
        
        /* declares a new variable and adds transaction history array to list
        based on the itempurchase constructor */
        const latestTransaction = new ItemPurchase(price, categoryName);
        transactionHistory.unshift(latestTransaction);      // add latest transaction to the start of array

        // finds correct array index for categoryBudget/categorySpent based on dropdown box
        const selectedIndex = selectedCategory.selectedIndex;
        updateCategory(selectedIndex, latestTransaction.price);

        updateHistory();        // update transaction history box
    }
});

/* updates the amount spent in the proper category, then displays it on the page */
function updateCategory(category, price = 0) {
    categorySpent[category] += price;

    let priceDisplay;  // priceDisplay is which line of category spending to update in the HTML

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

    if (categorySpent[category] > categoryBudget[category]) {
        priceDisplay.classList.add('over-category-budget');
    } else if (categorySpent[category] >= 0.75 * categoryBudget[category]) {
        priceDisplay.classList.add('near-category-budget');
    }
}

/* Updates the content of the "Your Recent Transactions" modal box */
function updateHistory() {
    // category in first column
    const categoryHTML = document.createElement('p');
    categoryHTML.innerText = transactionHistory[0].category;    // newest transaction is always element 0
    let column = document.querySelector('#transaction-category');
    column.insertBefore(categoryHTML, column.firstChild);       // insert at the top of box

    // price in second column
    const priceHTML = document.createElement('p');
    priceHTML.innerText = `$${transactionHistory[0].price.toFixed(2)}`;     // newest transaction is always element 0
    column = document.querySelector('#transaction-price');
    column.insertBefore(priceHTML, column.firstChild);          // insert at the top of box
}

/* Updates the content of the "Your Recent Transactions" modal box */
function updateHistory() {
    const categoryHTML = document.createElement('p');
    categoryHTML.innerText = transactionHistory[0].category;
    let column = document.querySelector('#transaction-category');
    column.insertBefore(categoryHTML, column.firstChild);

    const priceHTML = document.createElement('p');
    priceHTML.innerText = `$${transactionHistory[0].price.toFixed(2)}`;
    column = document.querySelector('#transaction-price');
    column.insertBefore(priceHTML, column.firstChild);
}

/* Calculates what percentage of total budget has been spent and updates the progress bar */
function updateProgressBar() {
    const remainingPercent = totalSpent / totalBudget * 100;
    document.getElementById("myBar").style.width = `${remainingPercent}%`;
    if (totalBudget < totalSpent) {
        document.getElementById("myBar").style.width = '100%';
    }
} 

/* Alerts the user if their spending reaches or exceeds the total budget */
function overBudget(){
    //plays cow sounds and displays cash cow telling you that you are spending to much
    const moo = new Audio("./sounds/Cow.mp3")
    const heard = new Audio("./sounds/SmallHerd.mp3")

    if (totalSpent == totalBudget){
        document.getElementById("cashCow").style.display = "contents";
        moo.play();
    } else if (totalSpent > totalBudget){
        document.getElementById("alertCow").style.display = "contents";
        document.getElementById("cashCow").style.display = "none";
        heard.play();
    } else {
        document.getElementById("alertCow").style.display = "none";
        document.getElementById("cashCow").style.display = "none";
    }
}

//disables transaction text box so the user has to enter weekly income first
function enterBudget() {
    if (totalBudget > 0) {
        return true;
    } else {
        alert("Please enter a weekly budget before continuing.")
        document.getElementById("moneySpent").disabled = true;
    }
}


// Get the modal
let modal = document.getElementById("welcome");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

function getModal () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

////////////////////////////////////////////////////////
// Get the modal
let purchaseModal = document.getElementById("transactionList");

let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let spanPan = document.getElementsByClassName("close")[1];

btn.onclick = function() {
  purchaseModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanPan.onclick = function() {
  purchaseModal.style.display = "none";
}

// When the user clicks anywhere outside of either modal, close it
window.onclick = function(event) {
    if (event.target == modal || event.target == purchaseModal) {
      modal.style.display = "none";
      purchaseModal.style.display = "none";
    }
  }