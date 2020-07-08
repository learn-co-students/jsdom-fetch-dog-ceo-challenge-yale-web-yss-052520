console.log('%c HI', 'color: firebrick')

async function getPicture(){

    let response = await fetch("https://dog.ceo/api/breeds/image/random/4")
    let pictures = await response.json()
    showPicture(pictures["message"])
}

function showPicture(pictures) {
    pictures.forEach(picture => {
        renderPicture(picture)
    })
}

function renderPicture(picture){ 
    const img = document.createElement("img")
    const div = document.getElementById("dog-image-container")
    img.src = picture
    div.appendChild(img)
}

async function fetchDogs() { 
    let response = await fetch('https://dog.ceo/api/breeds/list/all')
    let dogs = await response.json()                                                               
    listDogs(Object.entries(dogs.message))
}

function listDogs(breeds) {
    breeds.forEach(breed => 
        addDogs(breed))
}

function addDogs(breed) { 
    const dog_breed = document.getElementById("dog-breeds")
    const li = document.createElement("li")
    li.innerHTML = breed[0]
    const ul = document.createElement("ul")
    for(let i = 0; i < breed[1].length; i++){
        let sli = document.createElement("li") 
        sli.innerHTML = breed[1][i]
        ul.appendChild(sli)
    }
    li.appendChild(ul)
    dog_breed.appendChild(li)
    li.addEventListener("click", function(){
        event.target.style = "color: green"
    })
}

async function filterDogs(){

    document.getElementById("breed-dropdown").addEventListener("change", async function(){
        document.getElementById("dog-breeds").innerHTML = ""
        var dropdown = document.getElementById("breed-dropdown");
        var letter = dropdown.options[dropdown.selectedIndex].text;
        console.log(letter)
        let response = await fetch('https://dog.ceo/api/breeds/list/all')
        let dogs = await response.json()
        //debugger
        listDogs(Object.entries(dogs.message).filter(function(entry){
            return entry[0][0] === letter
        }))
    
    })}

getPicture()
fetchDogs()
filterDogs()








