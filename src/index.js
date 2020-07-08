console.log('%c HI', 'color: firebrick')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function loadImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(res => res.json())
    .then(responses => {
        responses.message.forEach(image => setImage(image))
    })
}

function setImage(image) {
    const imgdiv = document.querySelector("#dog-image-container")
    const img = document.createElement("img")
    img.src = image
    imgdiv.append(img)
}

document.addEventListener("DOMContentLoaded", () => {
    loadImages()
    loadBreeds()
    dropdown = document.querySelector("#breed-dropdown")
    dropdown.addEventListener("change", (event) => {
        filter(event.target.value)
    })
})

function filter(letter) {
    document.querySelector("#dog-breeds").innerText = null
    loadFilteredBreeds(letter)
}

function loadFilteredBreeds(letter) {
    fetch(breedUrl)
    .then(res => res.json())
    .then(response => {
        key_list = Object.keys(response.message)
        fltrd_key_list = key_list.filter(key => key.startsWith(letter))
        breeds_object = response.message
        fltrd_key_list.forEach(breed => addBreeds(breed))
    })
}

// function loadBreeds() {
//     fetch(breedUrl)
//     .then(res => res.json())
//     .then(response => {
//         Object.keys(response.message).forEach(addBreeds(key, index))
//   console.log(this[key]);
//     })
// }

function loadBreeds() {
    fetch(breedUrl)
    .then(res => res.json())
    .then(response => {
        key_list = Object.keys(response.message)
        breeds_object = response.message
        key_list.forEach(breed => addBreeds(breed))
    })
}

function addBreeds(breed) {
    list = document.querySelector("#dog-breeds")
    prefix_array = breeds_object[breed]
    if (prefix_array && prefix_array.length) {
        prefix_array.forEach(prefix => createDog(prefix +" "+ breed))
    } else {
        createDog(breed)
    }
}

function createDog(name) {
    const listItem = document.createElement("li")
    listItem.innerText = name
    list.append(listItem)
    listItem.addEventListener('click', (event) => {
        var randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        event.target.style.color = randomColor
        //console.log(event.target.innerText + "got clicked!")
        //event.target.fontcolor("blue")
    })
}