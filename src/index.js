console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded',function(){
    fetchImage()
    fetchBreed(0)
    
    const selector = document.querySelector('select#breed-dropdown')
    const letterArray = ['a', 'b', 'c', 'd','e', 'f', 'g', 'h', 'i', 'j', 'k','l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'] 
    for (let lett of letterArray) {
        const option = document.createElement("option")
        option.innerText = lett
        option.value = lett 
        selector.appendChild(option) 
    }
    
    selector.addEventListener('change', function() {
        let newValue = selector.value 
        fetchBreed(newValue) 
    })
})

function fetchImage(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(results => {
        renderImage(results)
    })
} 

function fetchBreed(letter){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(results => {
        renderBreed(results, letter)
    })
} 

function renderImage(results){ 
    const imgDiv = document.querySelector('div#dog-image-container') 
    
    for (let i = 0; i < 4; i++){
        const img = document.createElement('img')
        img.src = results.message[i]
        imgDiv.appendChild(img) 
    }

}

function renderBreed(results, letter){ 
    const breeds = document.querySelector('div#dog-image-container') 
    let breedData = results['message']
    const ul = document.querySelector('ul#dog-breeds')
    ul.innerHTML = " " 
    
    for (let breeds in breedData){
        if (breedData[breeds].length > 0 ){
            for (let breed of breedData[breeds]){ 
            if (breed.split("")[0]== letter || letter == 0){
                let li = document.createElement('li') 
                li.className = "dog" 
                li.innerText = breed +  " " + breeds
                ul.append(li)} 
            } 
        }
        if (breedData[breeds].length == 0 ){
            if (breeds.split("")[0]== letter || letter == 0){
                let li = document.createElement('li')
                li.innerText = breeds
                li.className = "dog"
                ul.append(li)
            }
        }
    } 

    ul.addEventListener('click', function(){
        if (event.target.className == 'dog'){
            let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            event.target.style = `color: ${randomColor}` 
        }
    })

    if (ul.innerText == ""){
        let li = document.createElement('li')
        li.innerText = "Sorry, no breeds to display!" 
        li.style = "color: red; font-size: 250px;"
        ul.append(li) 
        alert('NOOOO')
    }
}