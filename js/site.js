// Mortgage Loan Calculator

// write a mortgage loan calculator that takes loan amount, months, and interest rate and prints out the amorization schedule which includes month by month the month, payment, principal, interest, total interest, and balance remaining

// refresh button
function refreshApp() {
  location.reload();
}

// write a function that gets all of the values
function getValues() {
  // get the loan value
  let loan = document.getElementById("loanValue").value;
  // get the term value
  let term = document.getElementById("termValue").value;
  // get the interest rate value
  let rate = document.getElementById("interestValue").value;
  // convert values to integers
  loan = parseInt(loan);
  term = parseInt(term);
  rate = parseInt(rate);
  // test if values are integers
  if (
    Number.isInteger(loan) &&
    Number.isInteger(term) &&
    Number.isInteger(rate)
  ) {
    // call the calculate function
    calculateValues(loan, term, rate);
  } else {
    alert("You must enter only integers");
  }
}

function calculateValues(loan, term, rate) {
  // create the array of data showing the amorization schedule for each month
  let scheduleData = [];
  // Total Monthly Payment = (amount loaned) * (interestRate/1200) / (1 – (1 + interestRate/1200)
  let monthlyPayment =
    (loan * (rate / 1200)) / (1 - (1 + rate / 1200) ** -term);
  // Remaining Balance before the very first month equals the amount of the loan.
  let remainingBalance = loan;
  //Create variables to store the calculations
  let interestPayment = 0;
  let principalPayment = 0;
  let totalInterest = 0;
  let totalCost = 0;
  let totalPrincipal = 0;

  // loop through the length of the term and calculate monthly data
  for (let i = 1; i <= term; i++) {
    // At end each month, Remaining Balance = Previous Remaining Balance - principal payments
    remainingBalance = remainingBalance - principalPayment;
    // keep from going below zero
    if (remainingBalance <= 0) {
      remainingBalance = 0;
    }
    // calculate interestPayment
    interestPayment = remainingBalance * (rate / 1200);
    // calculate principal payment
    principalPayment = monthlyPayment - interestPayment;
    // add up the total interest
    totalInterest += interestPayment;
    // add up the total principal
    totalPrincipal += principalPayment;
    //create data objects for each month
    const month = {
      month: i,
      payment: monthlyPayment.toFixed(2),
      interest: interestPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      total: remainingBalance.toFixed(2),
    };
    // push each month object to the scheduleData array
    scheduleData.push(month);
  }

  // add up total costs
  totalCost += totalInterest + loan;
  // creat an object to store the data for the main page header
  let headerData = {
    monthlyPayment: `$${monthlyPayment.toFixed(2)}`,
    totalPrincipal: `$${totalPrincipal.toFixed(2)}`,
    totalInterest: `$${totalInterest.toFixed(2)}`,
    totalCost: `$${totalCost.toFixed(2)}`,
  };
  //pass data to displayData to output results on the screen
  displayData(scheduleData, headerData);
}

//custom display function
function displayData(scheduleData, headerData) {
  // get the monthly payment
  let headerPayment = document.getElementById("monthlyPayment");
  // set the inner HTML to the monthly payment
  headerPayment.innerHTML = headerData.monthlyPayment;
  // get the total principal
  let headerPrincipal = document.getElementById("totalPrincipal");
  // set the inner HTMl
  headerPrincipal.innerHTML = headerData.totalPrincipal;
  let headerInterest = document.getElementById("totalInterest");
  // set the inner HTML
  headerInterest.innerHTML = headerData.totalInterest;
  let headerCost = document.getElementById("totalCost");
  // set the inner HTML
  headerCost.innerHTML = headerData.totalCost;

  //get the table body element from the page
  let tableBody = document.getElementById("results");
  //get the template row
  let templateRow = document.getElementById("lsTemplate");
  // get the full table element to change the visibility and show the results
  let fullTable = document.getElementById("table");
  // loop over the array and create a table row for each item.
  for (let i = 0; i < scheduleData.length; i++) {
    //   //add the className to the element
    //   //imports template as a document fragment to make a copy of the template in memory so it can be modified and added into the table tag in the HTML, content is the tr tag nested inside the template
    let tableRow = document.importNode(templateRow.content, true);
    //   // grab the tds and put them into the array
    let rowCols = tableRow.querySelectorAll("td");

    // set the data for each column

    rowCols[0].textContent = scheduleData[i].month;

    rowCols[1].textContent = scheduleData[i].payment;

    rowCols[2].textContent = scheduleData[i].interest;

    rowCols[3].textContent = scheduleData[i].principal;

    rowCols[4].textContent = scheduleData[i].total;

    // add the template to the document
    tableBody.appendChild(tableRow);
    fullTable.classList.remove("invisible");
  }
}
