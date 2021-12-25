// Mortgage Loan Calculator

// output should include the following
// the month  (corresponding to the 1st month of payment, through the total number of months )
// the payments amount
// the principal paid this month
// the interest paid this month
// the total interest paid this month
// the remaining loan balance at the end of the month

// Write a mortgage loan calculator application that takes in three parameters:
// 1. The amount of money loaned in dollars (balance)
// 2. The time over which the loan will be repaid, in months (term)
// 3. The percentage rate at which interest will accrue on the loan (rate)

// write a mortgage loan calculator that takes loan amount, months, and interest rate and prints out the amorization schedule which includes month by month the month, payment, principal, interest, total interest, and balance remaining

// refresh button
function refreshApp() {
  location.reload();
}

// write a function that gets all of the values
function getValues() {
  // get the loan value
  let balance = document.getElementById("loanValue").value;
  // get the term value
  let term = document.getElementById("termValue").value;
  // get the interest rate value
  let rate = document.getElementById("interestValue").value;
  // convert values to integers
  balance = parseInt(balance);
  term = parseInt(term);
  rate = parseInt(rate);
  // test if values are integers
  if (
    Number.isInteger(balance) &&
    Number.isInteger(term) &&
    Number.isInteger(rate)
  ) {
    // call the calculate function and save returned results to a variable
    mortgageData = calculateValues(balance, term, rate);
  } else {
    alert("You must enter only integers");
  }
  // pass the mortgageData variable to displayData to show the results on the screen
}

function calculateValues(balance, term, rate) {
  // create the array of data showing the amorization schedule for each month
  let mortgageData;
  // Total Monthly Payment = (amount loaned) * (interestRate/1200) / (1 – (1 + interestRate/1200)
  let monthlyPayment =
    (balance * (rate / 1200)) / (1 - (1 + rate / 1200) ** -term);
  console.log(`monthly payment is ${monthlyPayment}`);
  // Remaining Balance before the very first month equals the amount of the loan.
  let remainingBalance = balance;
  console.log(`remaining balance is: ${remainingBalance}`);
  // Interest Payment = Previous Remaining Balance * rate/1200
  let interestPayment = remainingBalance * (rate / 1200);
  console.log(`interest payment is: ${interestPayment}`);
  // Principal Payment = Total Monthly Payment - Interest Payment
  let principalPayment = monthlyPayment - interestPayment;
  console.log(`principal payment is: ${principalPayment}`);
  // At end each month, Remaining Balance = Previous Remaining Balance - principal payments
  let endOfMonthBalance = remainingBalance - principalPayment;
  console.log(
    `The balance at the end of each month is is: ${endOfMonthBalance}`
  );
  // create the array of data showing the amorization schedule for each month
}

//custom display function
function displayData(mortgageData) {
  //get the table body element from the page
  let tableBody = document.getElementById("results");
  //get the template row
  let templateRow = document.getElementById("fbTemplate");
  //clear table first
  tableBody.innerHTML = "";

  //loop over the array and create a table row for each item.
  for (let i = 1; i <= mortgageData.length; i += 5) {
    //add the className to the element
    //imports template as a document fragment to make a copy of the template in memory so it can be modified and added into the table tag in the HTML, content is the tr tag nested inside the template
    let tableRow = document.importNode(templateRow.content, true);
    // grab the tds and put them into the array
    let rowCols = tableRow.querySelectorAll("td");
    // add the respective class to each column to change the styling
    // set the data for each column
    rowCols[0].classList.add(mortgageData[i]);
    rowCols[0].textContent = mortgageData[i];
    //
    rowCols[1].classList.add(mortgageData[i + 1]);
    rowCols[1].textContent = mortgageData[i + 1];
    //
    rowCols[2].classList.add(mortgageData[i + 2]);
    rowCols[2].textContent = mortgageData[i + 2];
    //
    rowCols[3].classList.add(mortgageData[i + 3]);
    rowCols[3].textContent = mortgageData[i + 3];
    //
    rowCols[4].classList.add(mortgageData[i + 4]);
    rowCols[4].textContent = mortgageData[i + 4];
    // add the template to the document
    tableBody.appendChild(tableRow);
  }
}
