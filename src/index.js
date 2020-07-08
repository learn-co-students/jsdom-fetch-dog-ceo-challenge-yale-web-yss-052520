console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function(){
    
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(resp => resp.json())
        .then(images => addImages(images))

    async function breedsHelper() {
        
        // Used async/await because we need to complete the request-response 
        // cycle before retrieving the NodeList of "li" elements.
        const listFetch = await fetch("https://dog.ceo/api/breeds/list/all")
        .then(resp => resp.json())
        .then(breeds => addBreeds(breeds))
        
        const allBreeds = document.querySelectorAll('li')
        console.log(allBreeds)
        allBreeds.forEach(breed => {
            breed.className = breed.innerText[0]
            breed.addEventListener('click', function() {
                breed.style.color = 'cyan'
            })
        })

        //Challenge 4
        const dropdown = document.getElementById("breed-dropdown")
        console.log(dropdown)
        dropdown.addEventListener("change", function(){
            const filterValue = dropdown.value
            allBreeds.forEach(breed => {
                if (filterValue != "all") {
                    if (breed.className != filterValue) {
                        breed.style.display = "none"
                    }
                    else {
                        breed.style.display = "list-item"
                    }
                }
                else {
                    breed.style.display = "list-item"
                }
            })
        })
    }
    

    function addBreeds(breeds) {
        const allBreeds = breeds['message']
        for (const breed in allBreeds) {
            const breedPair = {[breed]: allBreeds[breed]}
            addBreed(breedPair)
        }
    }

    // Pass a single key-value pair
    function addBreed(breed) {
        const div = document.getElementById("dog-breeds")
        if (Object.values(breed)[0].length == 0) {
            const li = document.createElement("li")
            li.innerText = Object.keys(breed)[0]
            div.append(li)
        }
        else {
            const genericBreed = Object.keys(breed)[0]
            const specificBreeds = Object.values(breed)[0]
            specificBreeds.forEach(function(value) {
                const li = document.createElement("li")
                li.innerText = value + " " + genericBreed
                div.append(li)
            })
        }
    }
    
    function addImages(images) {
        images['message'].forEach(image => addImage(image))
    }
    
    function addImage(image) {
        const div = document.getElementById('dog-image-container')
        const img = document.createElement('img')
        img.src = image
        div.append(img)
    }

    breedsHelper()
})

