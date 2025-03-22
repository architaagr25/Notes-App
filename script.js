const notescontainer = document.querySelector(".notes-container");
const createbtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

//this is to show the previously saved notes on the browser
function shownotes(){
    notescontainer.innerHTML = localStorage.getItem("notes");
    notes = document.querySelectorAll(".input-box");
    
    //delete icon
    notes.forEach(note => {
        if (!note.querySelector("img")) {
            let img = document.createElement("img");
            img.src = "images/delete.png";
            note.appendChild(img);
        }
    });

    // Attach event listeners to the delete icons 
    //THIS WILL DELETE THE NOTE WHEN DEL ICON IS CLICKED 
    notescontainer.addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") {
            e.target.parentElement.remove();
            updatestorage();
        }
    });

    // Attach event listeners to the input boxes for updating storage
    //THIS WILL SAVE CONTENT ON NOTES
    notes.forEach(n => {
        n.onkeyup = function() {
            updatestorage();
        }
    });


    document.addEventListener("keydown", event =>{
        if(event.key == "Enter"){
            document.execCommand("insertLineBreak");
            event.preventDefault();
        }
    })
}

shownotes();

//this is to store the notes so that they don't disappear on refreshing
function updatestorage(){
    localStorage.setItem("notes", notescontainer.innerHTML);
}

//this will create the input boxes when create note is clicked
createbtn.addEventListener("click", ()=>{
    let inputbox= document.createElement("p");
    let img = document.createElement("img");
    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notescontainer.appendChild(inputbox).appendChild(img);
    updatestorage();
})

