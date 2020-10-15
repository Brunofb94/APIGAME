/*var idinput = document.querySelector("#id").innerHTML =
              Math.floor(Math.random() * 10);*/

function login(){
    var emailField = document.getElementById("email");
    var pwdField = document.getElementById("pwd");

    var email = emailField.value;
    var pwd = pwdField.value;

    axios.post("http://localhost:8088/auth",{
        email,
        pwd
    }).then(res => {
        var token = res.data.token;
        localStorage.setItem("token", token)
        axiosConfig.headers.authorization =  "Bearer  " +  localStorage.getItem("token");
        alert("logado")
    }).catch(err => {
        alert("login is incorrect")
    })
}

var axiosConfig = {
    headers: {
        Authorization: "Bearer  " + localStorage.getItem("token")
    } 
}

function createGame() {
    var idInput = document.querySelector("#id")
    var titleInput = document.querySelector("#title");
    var yearInput = document.querySelector("#year")
    var priceInput = document.querySelector("#price");

    //idInput.innerHTML = Math.floor((Math.random() * 100) + 1);

    var ts = idInput.value;
    console.log("this is id " + ts)

    var game = {
        id: idInput.value,
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value

    }
    console.log(game);
    axios.post("http://localhost:8088/game", game).then(response => {
        var alertdiv = document.querySelector("#testando").style.display = "block";

        if (response.statusCode == 200) {
            alert("Game created with success")
        }

    }).catch(err => {
        console.log(err)
    })
}

//
function deleteGame(listitem) {
    var id = listitem.getAttribute("data-id");
    axios.delete("http://localhost:8088/game/" + id).then(() => {
        alert("Game was delete");
    }).catch((error) => {
        console.log(error)
    });
    console.log(id)
}
//
function loadForm(listItem) {
  var  hidden = document.querySelector("#lops").style.display = "block";
   
    var id = listItem.getAttribute("data-id", games.id)
    var title = listItem.getAttribute("data-title", games.title);
    var year = listItem.getAttribute("data-year", games.year);
    var price = listItem.getAttribute("data-price", games.price);

    var idfield = document.querySelector("#idEdit");
    var titleField = document.querySelector("#titleEdit");
    var yearEdit = document.querySelector("#yearEdit");
    var priceEdit = document.querySelector("#priceEdit");

    idfield.value = id;
    titleField.value = title;
    yearEdit.value = year;
    priceEdit.value = price;


}
function updateGame() {
    var idInput = document.getElementById("idEdit")
    var titleInput = document.querySelector("#titleEdit");
    var yearInput = document.querySelector("#yearEdit")
    var priceInput = document.querySelector("#priceEdit");



    var game = {
        //id: idinput.value,
        title: titleInput.value,
        price: priceInput.value,
        year: yearInput.value

    }

    var id = idInput.value;

    axios.put("http://localhost:8088/game/" + id, game).then(response => {

        if (response.statusCode == 200) {
            alert("Game changed with success")
        }

    }).catch(err => {
        console.log(err)
    })
}

//
axios.get("http://localhost:8088/games").then(response => {
    var Games = response.data;
    var list = document.getElementById("games");
    //var tt = document.getElementById("tt")
    Games.forEach(element => {
        var item = document.createElement("li");
        item.setAttribute("data-id", element.id);
        item.setAttribute("data-title", element.title);
        item.setAttribute("data-year", element.year);
        item.setAttribute("data-price", element.price);

        item.innerHTML = "ID - " + element.id + ".|   " + "| Name:  " + element.title + "   |  Price:    " + " $ "
            + element.price + "  |  " + " " + "Year:  " + element.year;

        var deleteBtn = document.createElement("a");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", function () {
            //item.remove();
            deleteGame(item);
        });

        var editBtn = document.createElement("a");
        editBtn.innerHTML = "Edit";

        

        //
       /* var tred = document.createElement("tr")
        var tdid = document.createElement("td")
        var tdnome = document.createElement("td")
        var tdyear = document.createElement("td")
        var tdprice = document.createElement("td")
        var tdedit = document.createElement("button")

        tdid.textContent = element.id;
        tdnome.textContent = element.title;
        tdyear.textContent = element.year;
        tdprice.textContent = element.price;
        tdedit.textContent = editBtn;

        tred.appendChild(tdid);
        tred.appendChild(tdnome);
        tred.appendChild(tdyear);
        tred.appendChild(tdprice);
        tred.appendChild(tdedit)
        tt.appendChild(tred);*/
        

        editBtn.addEventListener("click", () => {
            loadForm(item);
        });
        editBtn.href = "#lops"
        list.appendChild(item).className = "list-group-item";
        item.appendChild(deleteBtn).className = "list-group-item list-group-item-danger";
        item.appendChild(editBtn).className = "list-group-item list-group-item-warning";
        console.log(element);
    });
    // console.log(games)
}).catch((error) => {
    console.log(error)
})
console.log(axios)