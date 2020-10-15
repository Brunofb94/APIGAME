var ul = document.getElementById("games");
var li = document.getElementsByTagName("li");

function filterFunction() {
    var input = document.getElementById("myInput");

     filter = input.value.toUpperCase();


    for (i = 0; i < li.length; i++) {
        txtvalue = li[i].textContent || li[i].innerText;

        if (txtvalue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        }else{
            li[i].style.display = "none";
        }
    }
}

var modal = document.querySelector("#Mod")

modal.addEventListener("click", (eve) => {
    eve.preventDefault();
    var dis = document.querySelector("#alone").style.display = "block";

    dis.focus();

})

var close = document.getElementById("modal-closed");

close.addEventListener("click", (event) => {
    event.preventDefault()

    var dis = document.querySelector("#alone").style.display = "none";

})

var closeEdit = document.getElementById("modal-closed-edit");

closeEdit.addEventListener("click", (e) => {
    e.preventDefault()

    dis = document.querySelector("#lops").style.display = "none";

})