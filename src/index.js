console.log('%c HI', 'color: firebrick')

function fetchImgs() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    return fetch(imgUrl)
    .then( res => {return res.json()} )
    .then(addImgs)
}

function addImgs(json) {
    for (const img of json['message']) {
        let loc = document.getElementById('dog-image-container')
        let image = document.createElement('img')
        loc.append(image)
        image.src = img
    }
}

function fetchBreeds(letterDrop) {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl).then(res => res.json()).then((json, letterDrop) => addBreeds(json, letterDrop))
}

function dropper(){
    let dropDown = document.getElementById('breed-dropdown')
    
    dropDown.addEventListener('select', function(){
        event.preventDefault
        let letterDrop = dropDown.value 
        fetchBreeds(letterDrop)
        })
}



function addBreeds(breeds, letterDrop) {
    let hash = breeds['message']
    let loc = document.getElementById('dog-breeds')
    
    for (const x in hash) {
        let breedTag = document.createElement('li')
        for (const breed of x) {
            breedTag.innerText += `${breed}`
        }
        if (breedTag.innerText.charAt(0) == letterDrop) {
              loc.appendChild(breedTag)
        }
        breedTag.addEventListener("click", function(){
            console.log('you hit me')
            breedTag.style = "color: red"
        })
    }
    
}

fetchImgs()
dropper()