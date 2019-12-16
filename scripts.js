//have a variable for budget and then have it displayed

//researching progress bar, looks like the java will control how much width the bar will take up
/**
 * @src for progress bar https://www.w3schools.com/howto/howto_js_progressbar.asp
 */
//take user input for purchase, category drop down and option description and store them
//purchase amount stored into an category arrays to be displayed
//create a class for itemPurchase with constructors of price and description
//setting price = price and description = ""

//create arrays for all category's and use either a if statement or a switch case to determine what array info will be sorted

//create function to that loops over every arrays and finds dollar amounts, to total them up
//function paramter would the array

//function(array.bill)

//look into spread operator

//take data for budget and user input and display dollars spent for each category


class BudgetTracker {
    constructor(price, description = '') {
        this.price = price;
        this.description = description;
    }
}

let test2 = new BudgetTracker()
let test = new BudgetTracker()

console.log(test2)
console.log(test)

console.log('test')

var items = [];

function getTransaction(){
    transactionValue = document.getElementById('moneySpent').value;
    items.push(transactionValue);  
    console.log(items);
}
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

//let test = 0;

