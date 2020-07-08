console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
fetch(imgUrl)
        .then( res => res.json() )
        .then(displayImages)


function displayImages(json) {
    const container = document.querySelector('#dog-image-container')
    const images = json.message
    images.forEach(image => {
        const imageTag = document.createElement('img')
        imageTag.src = image
        container.append(imageTag)
    }) 
    
}

const breedUrl = 'https://dog.ceo/api/breeds/list/all'

fetch(breedUrl)
        .then( res => res.json() )
        .then(listBreeds)

function listBreeds(json) {
    const breedList = document.querySelector('#dog-breeds')
    const breeds = json.message
    // debugger
    // breeds.keys.forEach(breed =>{
    //     const LiTag = document.createElement('li')
    //     LiTag.innerText = breeds[breed]
    //     breedList.append(LiTag)
    // })
    for (const breed in breeds) {
        const LiTag = document.createElement('li')
        LiTag.innerText = breed
        LiTag.addEventListener('click', () => {LiTag.style = "color: blue"})
        breedList.append(LiTag)
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    let dropDown = document.querySelector('#breed-dropdown')
    dropDown.addEventListener("change", filterBreeds)
})


function filterBreeds() {
    const letter = event.target.value
    const breedList = document.querySelector('#dog-breeds')
    fetch(breedUrl)
        .then( res => res.json() )
        // .then(listBreeds.filter(breed => breed.startsWith(letter)))
        .then( json => {
            // debugger
            const breeds = json.message
            const filteredBreeds = []
            for (const breed in breeds) {
                // debugger
                if (breed.startsWith(letter)) {
                    filteredBreeds.push(breed)
                }
            }
             while (breedList.firstChild) {
                 breedList.removeChild(breedList.firstChild);
            }
            console.log(breedList)
            filteredBreeds.forEach( breed => {
                const LiTag = document.createElement('li')
                LiTag.innerText = breed
                LiTag.addEventListener('click', () => {LiTag.style = "color: blue"})
                breedList.append(LiTag)
            })
        })
}