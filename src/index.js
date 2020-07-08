console.log('%c HI', 'color: firebrick')


let breeds = []
// let filteredBreeds = []

document.addEventListener("DOMContentLoaded",function(){
    fetchImages();
    fetchBreeds()
});

function change_color(e){
    e.target.style.color = 'hidden';
  }
  
  
function fetchImages(){
    const url = "https://dog.ceo/api/breeds/image/random/4"
    fetch(url)
    .then(res =>  res.json())
    .then(data => {
        data.message.forEach(img => createImage(img))
    })
    
}

function createImage(imageUrl){
    const image = document.createElement("img")
    image.src = imageUrl
    const imageArea = document.querySelector("div#dog-image-container")
    imageArea.appendChild(image)
}

function fetchBreeds(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
    .then(res =>  res.json())
    .then(data => {
        breeds = Object.keys(data.message);
        breeds.forEach(breed => createBreed(breed))
        // dropdownSelect()
        updateBreeds(breeds)
        dropdownListener()
    })
    
}

function updateBreeds(breeds){
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => createBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
  }


function filterBreeds(letter) {
    updateBreeds(breeds.filter(breed => breed.startsWith(letter)));
}

function dropdownListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        filterBreeds(event.target.value);
    });
}
  
function createBreed(breedName) {
    let list = document.querySelector("ul#dog-breeds");
    let li = document.createElement('li');
    li.innerText = breedName;
    list.appendChild(li)
    
    li.addEventListener('click', changeColor);
    breeds.push(breedName)
}   

function changeColor(event){
    event.target.style.color = 'red'
}

// function dropdownSelect(){
//     console.log("Filtering")
//     const dropdown = document.querySelector('#breed-dropdown')
//     dropdown.addEventListener('change', function(event){
//         filterBreeds(event.target.value)
//     })
// }

// function filterBreeds(letter){
//     filteredBreeds = breeds.slice()
//     removeBreeds()
//     filteredBreeds.forEach(breed => updateBreeds(breed))
// }

// function removeBreeds(){
//     let ul = document.querySelector('#dog-breeds');
//     removeChildren(ul);
// }

// function updateBreeds(breed){
//     let list = document.querySelector("ul#dog-breeds");
//     let li = document.createElement('li');
//     li.innerText = breed;
//     list.appendChild(li)
//     li.addEventListener('click', changeColor);

// }

// function removeChildren(element) {
//     console.log("removing")
//     let child = element.lastElementChild;
//     while (child) {
//       element.removeChild(child);
//       child = element.lastElementChild;
//     }
//   }