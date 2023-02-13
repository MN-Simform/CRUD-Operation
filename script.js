//Function Of Form Validation
function formValidate() {
    let id = document.getElementById("pid").value;
    let nm = document.getElementById("name").value;
    let img = document.getElementById("image").value;
    let price = document.getElementById("price").value;
    let des = document.getElementById("des").value;

    let idPattern = /[0-9]/;
    let pricePattern = /[0-9]/;


    if (id == "" | nm == "" | img == "" | price == "" | des == "") {
        alert("Field cannot be empty!");
        return false;
    }
    if (!id.match(idPattern)) {
        alert("Id Contains Only Numeric Data");
        return false;
    }
    if (price <= 0 | !price.match(pricePattern)) {
        alert("Price Only Contains Positive Number");
        return false;
    }
    return true;
}

// Function Of Display Data In Table
function dispData() {
    let dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }
    let html = "";
    dataList.forEach(function (key, index) {
        html += "<tr class='productItems'>";
        html += "<td>" + key.id + "</td>";
        html += "<td>" + key.nm + "</td>";
        html += "<td><img style='height:40px; width:50px'src='" + key.img + "'></td>";
        html += "<td>" + key.price + "</td>";
        html += "<td>" + key.des + "</td>";
        html += `<td><button id="updt" onclick="updateData(${index})" class="btn btn-warning btn-sm">Edit</button>
                    <button onclick="deleteData(${index})" class="btn btn-danger btn-sm">Delete</button>`;
        html += "</tr>"
    });
    document.querySelector("#table tbody").innerHTML = html;
}
document.onload = dispData();

// Function Of Passing Data Into Local Storage
function submitData() {
    if (formValidate() == true) {
        let id = document.getElementById("pid").value;
        let nm = document.getElementById("name").value;
        let img = document.getElementById("image").files[0].name;
        // let img = document.getElementById("image").value;
        let price = document.getElementById("price").value;
        let des = document.getElementById("des").value;

        let dataList;
        if (localStorage.getItem("dataList") == null) {
            dataList = [];
        }
        else {
            dataList = JSON.parse(localStorage.getItem("dataList"));
        }
        dataList.push({
            id: id,
            nm: nm,
            img: img,
            price: price,
            des: des,
        });

        localStorage.setItem("dataList", JSON.stringify(dataList));
        dispData();

        document.getElementById("pid").value = "";
        document.getElementById("name").value = "";
        document.getElementById("image").value = "";
        document.getElementById("price").value = "";
        document.getElementById("des").value = "";
    }
}

// Function Of Updating Data 
function updateData(index) {
    let confirmation = confirm("Image Cannot Be Update");
    if (confirmation == true) {
        document.getElementById("Submit").style.display = "none";
        document.getElementById("Update").style.display = "block";

        let dataList;
        if (localStorage.getItem("dataList") == null) {
            dataList = [];
        }
        else {
            dataList = JSON.parse(localStorage.getItem("dataList"));
        }
        document.getElementById("pid").value = dataList[index].id;
        document.getElementById("name").value = dataList[index].nm;
        // document.getElementById("image").files[0].name = dataList[index].img;
        document.getElementById("price").value = dataList[index].price;
        document.getElementById("des").value = dataList[index].des;

        document.querySelector("#Update").onclick = function () {
            dataList[index].id = document.getElementById("pid").value;
            dataList[index].nm = document.getElementById("name").value;
            // dataList[index].img = document.getElementById("image").files[0].name;
            dataList[index].price = document.getElementById("price").value;
            dataList[index].des = document.getElementById("des").value;

            localStorage.setItem("dataList", JSON.stringify(dataList));
            dispData();

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}

// Function Of Deleting Data
function deleteData(index) {
    let confirmation = confirm("Do You Want To Delete This Item?");
    let dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }
    if (confirmation == true) {
        dataList.splice(index, 1);
        localStorage.setItem("dataList", JSON.stringify(dataList));
        dispData();
    }
}

// Function Of Filter Products By Id
function filter() {
    let filter = document.getElementById("filterProduct").value;
    let productItems = document.querySelectorAll(".productItems");

    for (let i = 0; i < productItems.length; i++) {
        let matchId = productItems[i].getElementsByTagName("td")[0];

        if (matchId) {
            let txtval = matchId.innerHTML || matchPro.innerHTML;

            if (txtval.indexOf(filter) > -1) {
                productItems[i].style.display = "";
            }
            else {
                productItems[i].style.display = "none";
            }
        }
    }
}

// Function Of Sorting Data By Id, Name And Price 
function sortData() {
    let dataList;
    let opt = document.getElementById("sorting").value;
    console.log(opt);
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }
    switch (opt) {
        case "sortById":
            dataList.sort(byId);
            break;

        case "sortByName":
            dataList.sort(byName);
            break;

        case "sortByPrice":
            dataList.sort(byPrice);
            break;
    }
    localStorage.setItem("dataList", JSON.stringify(dataList));
    dispData();
    console.log(dataList);
}

function byId(a, b) {
    return parseInt(a.id) - parseInt(b.id);
}

function byName(a, b) {
    if (a.nm > b.nm) {
        return 1;
    }
    else if (b.nm > a.nm) {
        return -1;
    }
    else {
        return 0;
    }
}

function byPrice(a, b) {
    return parseInt(a.price) - parseInt(b.price);
}