let productName = document.getElementById("productName");
let productPrice = document.getElementById("productPrice");
let productCategory = document.getElementById("productCategory");
let productDesc = document.getElementById("productDesc");
let productsContainer = [];
let myAlert = document.getElementById("alert");
//initialized a variable with the given RegEx exepression=============
let regex = /^[A-Z][a-z]{0,9}\s?[A-Z]?[a-z]{0,9}\s?[A-Z]?[a-z]{0,9}$/;
//go to the local storage and check for the key myStorage if not found create a key with an empty array=======================================
if (localStorage.getItem("myStorage") == null) {
  productsContainer = [];
} else {
  productsContainer = JSON.parse(localStorage.getItem("myStorage"));
  display();
}
//on clicking on the submit button we call the validationFunction() if true create an object, add it to the array and into the local storage. Clear the inputs and display the stored array ========================
let products;
document.getElementById("updateButton").onclick = function addAndSubmit() {
  if (validationFunction() == true) {
    products = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDesc.value,
    };
    productsContainer.push(products);
    localStorage.setItem("myStorage", JSON.stringify(productsContainer));
    clearInputs();
    display();
  }
};
//clearInputs() function clear the input's content after submitting
function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}
//display() function displays each row of the table with the depending to its data========================================================
function display() {
  let temporaryContainer = "";
  for (let i = 0; i < productsContainer.length; i++) {
    temporaryContainer +=
      `<tr>
    <td>` +
      (i + 1) +
      `</td>
    <td>` +
      productsContainer[i].name +
      `</td>
    <td>` +
      productsContainer[i].price +
      `</td>
    <td>` +
      productsContainer[i].category +
      `</td>
    <td>` +
      productsContainer[i].description +
      `</td>
    <td>
      <button onclick="editItem(` +
      i +
      `)" type="button" class="btn btn-outline-warning">
        edit product
      </button>
    </td>
    <td>
      <button onclick="deleteItem(` +
      i +
      `)" type="button" class="btn btn-outline-danger">
        delete
      </button>
    </td>
  </tr>`;
  }
  document.getElementById("eachRow").innerHTML = temporaryContainer;
}
//deleteItem() deletes the selected item after pressing the delete button and calls the display function to display the new rows from the local storage after the latest delete update =======================
function deleteItem(deletedProduct) {
  productsContainer.splice(deletedProduct, 1);
  localStorage.setItem("myStorage", JSON.stringify(productsContainer));
  display();
}
let returnedIndex = 1;
function editItem(itemEdited) {
  //this will be called when edit item button is pressed and the inputs are filled with :
  productName.value = productsContainer[itemEdited].name;
  productPrice.value = productsContainer[itemEdited].price;
  productCategory.value = productsContainer[itemEdited].category;
  productDesc.value = productsContainer[itemEdited].description;
  document.getElementById("updateButton").innerHTML = "update";
  //the button name is changed to update
  returnedIndex = itemEdited; //the index is stored to be used by other functions
  typingAndSaving(); //after adding your values this is called
}
// ================================
function typingAndSaving() {
  //onclicking the submit button :
  document.getElementById(
    "updateButton"
  ).onclick = function RestoreSubmitText() {
    //the values is added to the array using the caught index,stored displayed and the values are cleared
    productsContainer[returnedIndex].name = productName.value;
    productsContainer[returnedIndex].price = productPrice.value;
    productsContainer[returnedIndex].category = productCategory.value;
    productsContainer[returnedIndex].description = productDesc.value;
    localStorage.setItem("myStorage", JSON.stringify(productsContainer));
    display();
    clearInputs();
    document.getElementById("updateButton").innerHTML = "Submit"; //the button name is also changed
    mainEffect(); //this is the reset function used to reset the button's usage
  };
  // ============================================
  function mainEffect() {
    //the reset function to allow you to enter your data and save it to the storage as before
    document.getElementById("updateButton").onclick = function addAndSubmit() {
      products = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDesc.value,
      };
      productsContainer.push(products);
      localStorage.setItem("myStorage", JSON.stringify(productsContainer));
      clearInputs();
      display();
    };
  }
}

// ==============================================

function searchItem(searchedItem) {
  cartoona = "";
  for (let i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name
        .toLowerCase()
        .includes(searchedItem.toLowerCase()) == true ||
      productsContainer[i].price
        .toLowerCase()
        .includes(searchedItem.toLowerCase()) == true
    ) {
      cartoona +=
        `<tr>
  <td>` +
        (i + 1) +
        `</td>
  <td>` +
        productsContainer[i].name +
        `</td>
  <td>` +
        productsContainer[i].price +
        `</td>
  <td>` +
        productsContainer[i].category +
        `</td>
  <td>` +
        productsContainer[i].description +
        `</td>
  <td>
    <button onclick="editItem(` +
        i +
        `)" type="button" class="btn btn-outline-warning">
      edit product
    </button>
  </td>
  <td>
    <button onclick="deleteItem(` +
        i +
        `)" type="button" class="btn btn-outline-danger">
      delete
    </button>
  </td>
</tr>`;
    }
    document.getElementById("eachRow").innerHTML = cartoona;
  }
}
//in the following function check the index of the select box's option and initialize a var called comparison. The function compare takes two parameters a and b and returns the comparison value which is then passed to the sort function which sorts the array of options
function checkSort() {
  if (document.getElementById("sorting").selectedIndex == "0") {
    let comparison = 0;
    function compare(a, b) {
      if (a.name > b.name) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    }
    productsContainer.sort(compare);
    display();
  } else if (document.getElementById("sorting").selectedIndex == "1") {
    let comparison2 = 0;
    function compare(a, b) {
      if (a.price < b.price) {
        comparison2 = 1;
      } else {
        comparison2 = -1;
      }
      return comparison2;
    }
    productsContainer.sort(compare);
    display();
  }
}
function validationFunction() {
  if (regex.test(productName.value) == true) {
    productName.classList.add("is-valid");
    productName.classList.remove("is-invalid");
    myAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    myAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

productName.addEventListener("keyup", function () {
  validationFunction();
  if (productName.value == "") {
    productName.classList.remove("is-valid");
    productName.classList.remove("is-invalid");
    myAlert.classList.replace("d-block", "d-none");
  }
});
