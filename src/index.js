console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded', function() {

  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  const imgDiv = document.getElementById("dog-image-container")
  const breedsList = document.querySelector("#dog-breeds")
  const dropDown = document.querySelector("#breed-dropdown")
  
  fetch(imgUrl)
  .then(res => res.json())
  .then(function(json){
      // console.log(json["message"][0])
    urlArray = json["message"]
    urlArray.forEach(function(url){
      img = document.createElement('img')
      img.src = url
      imgDiv.append(img)
    })
  })

  fetch(breedUrl)
  .then(res => res.json())
  .then(function(json){
     let breeds = Object.keys(json['message'])
     console.log(breeds)
     breeds.forEach(function(breed){
        let li = document.createElement("li")
        li.innerText = breed
        breedsList.append(li)
        
        li.addEventListener("click", function(){
            li.style.color = "green"
        }) 
     })
  })

  dropDown.addEventListener("change", (event) => {
    // console.log(event.target.value)
    let letter = event.target.value 
    console.log(`${letter}`)  // this seems to work //aw yee
    while (breedsList.firstChild) {
      breedsList.removeChild(breedsList.firstChild);
    }
    
    fetch(breedUrl)
    .then(res => res.json())
    .then(function(json){
       let breeds = Object.keys(json['message'])
       console.log(breeds)
       breeds.forEach(function(breed){
         if (breed[0] == letter){
          let list = document.createElement("li")
          list.innerText = breed
          breedsList.append(list)
          
          list.addEventListener("click", function(){
              list.style.color = "green"
          }) 
        }
    })
    })
  })
})