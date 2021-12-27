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
    // call the calculate function and save returned results to a variable
    pageData = calculateValues(loan, term, rate);
    // pass display data to the display function
    displayData(pageData);
  } else {
    alert("You must enter only integers");
  }
}

function calculateValues(loan, term, rate) {
  // create the array of data showing the amorization schedule for each month
  let mortgageData = [];

  // Total Monthly Payment = (amount loaned) * (interestRate/1200) / (1 – (1 + interestRate/1200)
  let monthlyPayment =
    (loan * (rate / 1200)) / (1 - (1 + rate / 1200) ** -term);
  // Remaining Balance before the very first month equals the amount of the loan.
  let remainingBalance = loan;
  //These variables are predicated on the remaining Balance changing for each iteration
  // Interest Payment = Previous Remaining Balance * rate/1200
  let interestPayment = 0;
  // Principal Payment = Total Monthly Payment - Interest Payment
  let principalPayment = 0;
  let totalInterest = 0;
  let totalCost = 0;
  let totalPrincipal = 0;

  // loop through the length of the term and calculate monthly data
  for (let i = 1; i <= term; i++) {
    // At end each month, Remaining Balance = Previous Remaining Balance - principal payments
    remainingBalance = remainingBalance - principalPayment;
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
    mortgageData.push(month);
  }

  // add up total costs
  totalCost += totalInterest + loan;

  // let headerData = {
  //   monthlyPayment: `$${monthlyPayment.toFixed(2)}`,
  //   totalPrincipal: `$${totalPrincipal.toFixed(2)}`,
  //   totalInterest: `$${totalInterest.toFixed(2)}`,
  //   totalCost: `$${totalCost.toFixed(2)}`,
  // };
  //push the header data object to the mortgage data array
  // mortgageData.push(headerData);

  return mortgageData;
}

//custom display function
function displayData(pageData) {
  console.log(pageData);
  //get the table body element from the page
  let tableBody = document.getElementById("results");
  //get the template row
  let templateRow = document.getElementById("lsTemplate");
  let fullTable = document.getElementById("table");
  //clear table first
  // tableBody.innerHTML = "";

  // // change the header Data
  // // get the header object
  // let header = pageData[pageData.length - 1];
  // // get the monthly payment
  // let headerPayment = document.getElementById("monthlyPayment");
  // // set the inner HTML to the monthly payment
  // headerPayment.innerHTML = header.monthlyPayment;
  // // get the total principal
  // let headerPrincipal = document.getElementById("totalPrincipal");
  // // set the inner HTMl
  // headerPrincipal.innerHTML = header.totalPrincipal;
  // let headerInterest = document.getElementById("totalInterest");
  // // set the inner HTML
  // headerInterest.innerHTML = header.totalInterest;
  // let headerCost = document.getElementById("totalCost");
  // // set the inner HTML
  // headerCost.innerHTML = header.totalCost;

  // loop over the array and create a table row for each item.
  for (let i = 0; i < pageData.length; i++) {
    //   //add the className to the element
    //   //imports template as a document fragment to make a copy of the template in memory so it can be modified and added into the table tag in the HTML, content is the tr tag nested inside the template
    let tableRow = document.importNode(templateRow.content, true);
    //   // grab the tds and put them into the array
    let rowCols = tableRow.querySelectorAll("td");
    //   // add the respective class to each column to change the styling
    //   // set the data for each column
    // rowCols[0].classList.add(pageData[i]);

    rowCols[0].textContent = pageData[i].month;
    //   //
    // rowCols[1].classList.add(mortgageData[i + 1][i + 1]);
    rowCols[1].textContent = pageData[i + 1].payment;
    //   //
    // rowCols[2].classList.add(pageData[i + 2][i + 2]);
    rowCols[2].textContent = pageData[i + 2].interest;
    //   //
    // rowCols[3].classList.add(pageData[i + 3][i + 3]);
    rowCols[3].textContent = pageData[i + 3].principal;
    //   //
    // rowCols[4].classList.add(pageData[i + 4][i + 4]);
    rowCols[4].textContent = pageData[i + 4].total;
    //   //
    // rowCols[4].classList.add(pageData[i + 5][i + 5]);
    // rowCols[4].textContent = pageData[i + 5][i + 5];

    // add the template to the document
    tableBody.appendChild(tableRow);
    fullTable.classList.remove("invisible");
  }
}
