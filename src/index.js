console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function () {
    pictures()
    breeds()
})

let breedlist = []

function pictures() {
    container = document.querySelector("#dog-image-container")
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imgUrl)
    .then(res => res.json())
    .then((json) => {
        let array = json.message
        array.forEach(url => {
            let img = document.createElement('img')
            img.src = url
            container.appendChild(img)
        });
    })
}

function breeds() {
    ul = document.querySelector('#dog-breeds')
    const breedUrl = "https://dog.ceo/api/breeds/list/all"
    fetch(breedUrl)
    .then(res => res.json())
    .then((json) => {
        breedList = Object.keys(json.message)
        updateBreedList(breedList)
        addBreedSelectListener()
        // debugger 
        // breedList.forEach(breed => {
        //     let li = document.createElement('li')
        //     li.innerText = breed 
        //     ul.appendChild(li)
        //     li.addEventListener("click", changeColor)
        // })
    })
    
}

function changeColor(event) {
    event.target.style.color = "red"
}

function selectBreedStartingWith(letter) {
    updateBreedList(breedList.filter(breed => breed.startsWith(letter)))
}

function updateBreedList(list) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breedList.forEach(breed => {
        let li = document.createElement('li')
        let ul = document.querySelector('#dog-breeds')
        li.innerText = breed
        ul.appendChild(li)
        li.addEventListener("click", changeColor)
    })
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
  }

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', (event) => {
        selectBreedStartingWith(event.target.value)
    })
}
