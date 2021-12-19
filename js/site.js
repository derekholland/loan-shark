// fizz buzz
// write a short program that displays each number from 1-100
// for each multiple of 3, display "Fizz" instead of the number
// For each multiple of 5, display "Buzz" instead of the number
// For numbers which are multiples of both 3 and 5 display "FizzBuzz" instead of the number.

function getValues() {
  //get the user input for the fizz number
  let fizzValue = document.getElementById("fizzValue").value;
  console.log(fizzValue);

  //get the user input for the buzz number
  let buzzValue = document.getElementById("buzzValue").value;

  //Convert "fizzValue" to an integer using parseInt()
  fizzValue = parseInt(fizzValue);

  //Convert "buzzValue" to an integer using parseInt()
  buzzValue = parseInt(buzzValue);

  //validate that the data are integers
  if (Number.isInteger(fizzValue) && Number.isInteger(buzzValue)) {
    //pass fizzValue and buzzValue to the FizzBuzz function and strore result in variable
    let fbData = FizzBuzz(fizzValue, buzzValue);
    console.log(fbData);

    //pass fbData to the displayData function, display the fizzbuzz results to the page
    displayData(fbData);
  } else {
    // alert the user only integers must be entered
    alert("You must enter integers");
  }
}

function FizzBuzz(value1, value2) {
  //create empty array to store the fizzbuzz data
  let returnArray = [];

  // iterate through numbers 1-100, checking for fizz buzz values, push numbers and fizzbuzz values into the returnArray
  for (let i = 0; i <= 100; i++) {
    // if i divisible by 3 and 5
    if (i % value1 == 0 && i % value2 == 0) {
      // fizzbuzz
      returnArray.push("FizzBuzz");
    }
    // if i is divisible by only 3
    else if (i % value1 == 0) {
      //fizz
      returnArray.push("Fizz");
    }
    // if i is divisible by only 5
    else if (i % value2 == 0) {
      //Buzz
      returnArray.push("Buzz");
      // not divisible by 3 or 5
    } else {
      // push the  index
      returnArray.push(i);
    }
  }

  //DO:
  //Finally return the variable "returnArray"
  return returnArray;
}

//custom display function
function displayData(fbData) {
  //get the table body element from the page
  let tableBody = document.getElementById("results");
  //get the template row
  let templateRow = document.getElementById("fbTemplate");
  //clear table first
  tableBody.innerHTML = "";

  //loop over the array and create a table row for each item.
  for (let i = 1; i <= fbData.length; i += 5) {
    //add the className to the element
    //imports template as a document fragment to make a copy of the template in memory so it can be modified and added into the table tag in the HTML, content is the tr tag nested inside the template
    let tableRow = document.importNode(templateRow.content, true);
    // grab the tds and put them into the array
    let rowCols = tableRow.querySelectorAll("td");
    // add the respective class to each column to change the styling
    // set the data for each column
    rowCols[0].classList.add(fbData[i]);
    rowCols[0].textContent = fbData[i];
    //
    rowCols[1].classList.add(fbData[i + 1]);
    rowCols[1].textContent = fbData[i + 1];
    //
    rowCols[2].classList.add(fbData[i + 2]);
    rowCols[2].textContent = fbData[i + 2];
    //
    rowCols[3].classList.add(fbData[i + 3]);
    rowCols[3].textContent = fbData[i + 3];
    //
    rowCols[4].classList.add(fbData[i + 4]);
    rowCols[4].textContent = fbData[i + 4];
    // add the template to the document
    tableBody.appendChild(tableRow);
  }
}
