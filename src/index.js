console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    
    function fetchImgs() {
        fetch (imgUrl)
        .then(response => response.json())
        .then(responses => {responses.message.forEach(dogimg => renderImg(dogimg))
        })
    }

    function renderImg(dogimg) {
    let imgdiv = document.querySelector("#dog-image-container")
    let img = document.createElement("img")
    img.src = dogimg
    imgdiv.append(img)
    }

    function loadbreeds() {
        const breedUrl = 'https://dog.ceo/api/breeds/list/all'
        fetch(breedUrl)
        .then(res => res.json())
        // .then(console.log)
        .then(results => {

            dogbreeds = Object.keys(results.message);
            dogbreedList(dogbreeds)
            addBreedListener();
        });
    }

    function dogbreedList(dogbreeds) {
        let ul = document.querySelector('#dog-breeds');
        removeChildren(ul);
        dogbreeds.forEach(dogbreed => addDogBreed(dogbreed))
    }

    function addDogBreed(dogbreed) {
        let ul = document.querySelector('#dog-breeds');
        let li = document.createElement('li');
        li.innerText = dogbreed;
        li.style.cursor = 'pointer';
        ul.appendChild(li);
        li.addEventListener('click', updateColor);
    }

    function updateColor(event) {
        event.target.style.color = 'blue';
    }

    function addBreedListener() {
        let breedDropdown = document.querySelector('#breed-dropdown');
        breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
  });
    }

    function selectBreedsStartingWith(letter) {
        dogbreedList(dogbreeds.filter(dogbreed => dogbreed.startsWith(letter)));
    }

    function removeChildren(element) {
        let child = element.lastElementChild;
        while (child) {
          element.removeChild(child);
          child = element.lastElementChild;
        }
    }


    fetchImgs()
    loadbreeds()
})