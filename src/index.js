console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

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

