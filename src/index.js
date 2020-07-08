console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedJSON = 'https://dog.ceo/api/breeds/list/all'

window.addEventListener('load', function () {
    fetch(imgUrl)
    .then(res => res.json())
    .then(function(json) {
        dogdiv = document.getElementById("dog-image-container")
        json["message"].forEach(function(img_url) {
            let img = document.createElement("IMG")
            img.src = img_url
            dogdiv.appendChild(img)
        })
    })
})

window.addEventListener('load', function () {
    fetch(breedJSON)
    .then(res => res.json())
    .then(function(json) {
        breedUL = document.getElementById("dog-breeds")
        // json["message"].forEach(function(breedJSON) {
        //     let breed = document.createElement("LI")
        //     breed.innerText = 
        //     dogdiv.appendChild(img)
        // })

        for (var key in json["message"]) {
            let breed = document.createElement("LI")
            breed.innerText = key
            breedUL.appendChild(breed)
        }
    })
    .then(function() {
        let list_lis = document.querySelectorAll("li")
        for (let i = 0; i < list_lis.length; i++) {
            list_lis[i].addEventListener('click', function() {
                list_lis[i].style.color = "red"
            })
        }
    })
    .then(function(){
        let dropdown = document.querySelector("select")
        dropdown.onchange = function(){
            selected_char = dropdown.value
            let list_lis = document.querySelectorAll("li")
            for (let i = 0; i < list_lis.length; i++) {
                if (list_lis[i].innerText[0] != selected_char) {
                    list_lis[i].style.display = "none"
                } else {
                    list_lis[i].style.display = "list-item"
                }
            }
        }
    })
})

