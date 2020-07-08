let all_dogs = [];
document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    update_dom(imgUrl, add_images);
    update_dom(breedUrl, add_breeds);
    
    const dropdown = document.getElementById("breed-dropdown");
    dropdown.onchange = function(){
        let lists = document.getElementById("dog-breeds");
        lists.innerHTML = ''
        display_dogs(all_dogs.filter(dog => dog.split("")[0] == this.value))
    }
})

function update_dom(url, process_fn) {
    fetch(url)
    .then(resp => resp.json())
    .then(json => process_fn(json));
}

function add_images(json) {
    const imgContainer = document.getElementById("dog-image-container");

    for (const element of json.message){
        const img = document.createElement('img');
        img.src = element;
        imgContainer.append(img)
    }
}

function add_breeds(json) {
    for (const species in json.message){
        let breeds = json.message[`${species}`];
        get_breeds(species, breeds);
        // display_dogs(all_dogs)
    }
    display_dogs(all_dogs)
}

function get_breeds(species, breeds){
    let lists = document.getElementById("dog-breeds");
    let li_tag = document.createElement('li');
    let button = document.createElement('button');
    if (breeds.length == 0){
        all_dogs.push(species);
    } else {
        for (const breed of breeds){
            all_dogs.push(`${breed} ${species}`)
        }
    }
}

function display_dogs(dogs){
    let lists = document.getElementById("dog-breeds");
    for (const dog of dogs){
        let li_tag = document.createElement('li');
        let button = document.createElement('button');
        button.onclick = function(event){
            button.style.color = "green"
        }
        button.innerText = dog;
        li_tag.append(button);
        lists.append(li_tag);
    }
}




