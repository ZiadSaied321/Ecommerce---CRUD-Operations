
const productNameInput = document.getElementById("productName");
const productPriceInput = document.getElementById("productPrice");
const productCategoryInput = document.getElementById("productCategory");
const productDescriptionInput = document.getElementById("productDescription");
const productImage = document.getElementById("imgUrl");

var productContainer = [];
(localStorage.getItem("ProductsData") == null) ? null : displayProducts();

function addProduct() {
    if(productNameInput.value != "" && productPriceInput.value != 0){
    var product = {
        productName: productNameInput.value,
        productPrice: productPriceInput.value,
        productCategory: productCategoryInput.value,
        productDescription: productDescriptionInput.value
    };
    productContainer.push(product);
    localStorage.setItem("ProductsData", JSON.stringify(productContainer));
    clearForm();
    displayProducts();
}
else{
    alert("please fill all fields to add product");
}
}

function clearForm() {
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
}

function displayProducts() {
    productContainer = JSON.parse(localStorage.getItem("ProductsData"));
    var tableBodyData = "";
    for (var item = 0; item < productContainer.length; item++) {
        tableBodyData +=
            `<tr>
        <td>${item}</td>
        <td>`+ productContainer[item].productName + `</td>
        <td>`+ productContainer[item].productPrice + `</td>
        <td>`+ productContainer[item].productCategory + `</td>
        <td>`+ productContainer[item].productDescription + `</td>
        <td><button onclick="updateProduct(${item});" class="btn update-btn">ubdate</button></td>
        <td><button onclick="deleteProduct(${item});" class="btn delete-btn">delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = tableBodyData;
}

function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("ProductsData", JSON.stringify(productContainer));
    displayProducts();
}
function updateProduct(index) {
    productNameInput.value = productContainer[index].productName;
    productPriceInput.value = productContainer[index].productPrice;
    productCategoryInput.value = productContainer[index].productCategory;
    productDescriptionInput.value = productContainer[index].productDescription;
    productContainer.splice(index, 1);
    localStorage.setItem("ProductsData", JSON.stringify(productContainer));
    displayProducts();
}

function searchProduct(searchTerm) {
    var tableBodyData = "";
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].productName.toLowerCase().includes(searchTerm)) {
            console.log('done');
            tableBodyData +=
                `<tr>
        <td>${i}</td>
        <td>`+ productContainer[i].productName + `</td>
        <td>`+ productContainer[i].productPrice + `</td>
        <td>`+ productContainer[i].productCategory + `</td>
        <td>`+ productContainer[i].productDescription + `</td>
        <td><button onclick="updateProduct(${i});" class="btn btn-outline-warning">ubdate</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger">delete</button></td>
        </tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = tableBodyData;
}