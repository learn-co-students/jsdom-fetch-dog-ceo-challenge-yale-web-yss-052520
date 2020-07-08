console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

var all_breeds = []

fetch(imgUrl  
).then(res => res.json())
.then(res => images(res))

fetch(breedUrl  
    ).then(res => res.json())
    .then(res => load_breeds(res))

function images(res){
    const list = document.querySelector("#dog-image-container")
    const images = res.message
    images.forEach(image => {
    
        const img = document.createElement("img")
        img.src = image
        list.appendChild(img)
    })
}
function load_breeds(res){
    console.log(res)
    
    all_breeds = Object.keys(res.message)
    console.log(all_breeds)
    display_breeds(all_breeds)
}

function display_breeds(breed_list){
    // debugger
    const list = document.querySelector("#dog-breeds")
    list.innerHTML = ""
    for (const breed of breed_list){
        const li = document.createElement("li")
        li.innerText = breed

        li.addEventListener("click", function(){
            li.style = "color: red;"
        })
        list.appendChild(li)
    }
}
const selection = document.querySelector("#breed-dropdown")

selection.addEventListener("change", function(){
    const filtered_breeds = all_breeds.filter(breed => breed[0] == selection.value)
    display_breeds(filtered_breeds)
    
})