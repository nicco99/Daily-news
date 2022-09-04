document.addEventListener("DOMContentLoaded", fetching)
//fetching all data
function fetching () {
    return fetch("https://newsapi.org/v2/everything?sources=techcrunch&apiKey=c579139b2ea142239473bb34044c4f34")
    .then(resp => resp.json())
    .then(data=>{
         let objData =data.articles;
objData.map((item)=>
{
        let main =  document.getElementById("main")
        let card = document.createElement("div") 
        card.classList = "flexbox p2 col-lg-5 col-md-8 col-sm-10"
        card.innerHTML = `
        <div class="cards bg-white" style="align-items: center;,justify-content: space-around;">
            <h4>${item.title}</h4>
            <h5><b>Date:</b> ${item.publishedAt}</h5>
            <img class="p-2" src="${item.urlToImage}" height="150px" width="400px%" alt="news"/>
            <p class="card-text">${item.description}</p>
            <a href="${item.url}" class="btn btn-primary">view more</a>
        </div><br/><br/>
        `
       return main.appendChild(card)
})

        
    }
        ).catch((e)=>e.message)



} 
          

document.getElementById("headlines").addEventListener("click", fetchHeadlines)

function fetchHeadlines() {
    return fetch("https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=c579139b2ea142239473bb34044c4f34")
           .then(resp=>resp.json())
           .then(data=>{
            let newData = data.articles;
            newData.map((item)=> {
                let url = item["urlToImage"];
                let title= item["title"]
                let description = item["description"]
                console.log(url,title)
                let newDiv = document.createElement("div")
                newDiv.innerHTML = `
                <div class="cards bg-white" style="align-items: center;,justify-content: space-around;">
                <h3 class="p-2 justify-content-center">${title}</h3>
                <h4 class="p-2 justify-content-center">Date:<i>${item.publishedAt}</i></h4>
                <img class="p-2 justify-content-center" alt="Image not Supported" src="${url}" width="80%" height="300px"/>
                <p class="p-2 justify-content-center">${description}</p>
                </div>
                `
                document.getElementById("headline-modal").appendChild(newDiv)
            }

            )
           
           })

         
           
           
}

document.getElementById("business-news").addEventListener("click", fetchBusiness)


function fetchBusiness() {
    return fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=c579139b2ea142239473bb34044c4f34")
           .then(resp=>resp.json())
           .then(data=>{
            let newData = data.articles;
            newData.map((item)=> {
                let url = item["urlToImage"];
                let title= item["title"]
                let description = item["description"]
                console.log(url,title)
                let newDiv = document.createElement("div")
                newDiv.innerHTML = `
                <h3 class="p-2 justify-content-center">${title}</h3>
                <h4 class="p-2 justify-content-center">Date:<i>${item.publishedAt}</i></h4>
                <img class="p-2 justify-content-center" alt="Image not Supported" src="${url}" width="80%" height="300px"/>
                <p class="p-2 justify-content-center">${description}</p>
                `
                document.getElementById("business-modal").appendChild(newDiv)
            }

            )
           
           })
}


//filtering
document.querySelector("#search-btn").addEventListener("submit", (e)=>e.preventDefault)

function fetchSearch() {
    
    return fetch("https://newsapi.org/v2/everything?sources=techcrunch&apiKey=c579139b2ea142239473bb34044c4f34")
           .then(resp=>resp.json())
           .then(data=>{
            let newData = data.articles;
            
            let searchValue = document.querySelector("#search-btn input").value
          
              for(let item of newData) {
                  if(item.title.includes(`${searchValue}`)){
                let url = item["urlToImage"];
                let title= item["title"]
                let description = item["description"]
                let newDiv = document.createElement("div")
                newDiv.innerHTML = `
                <h3 class="p-2 justify-content-center">${title}</h3>
                <h4 class="p-2 justify-content-center">Date:<i>${item.publishedAt}</i></h4>
                <img class="p-2 justify-content-center" alt="Image not Supported" src="${url}" width="80%" height="300px"/>
                <p class="p-2 justify-content-center">${description}</p>
                `

                let searchDiv = document.getElementById("search")
                searchDiv.textContent= ""
                return searchDiv.appendChild(newDiv)
            
            }else {
                let h1 = document.createElement("h1")
                h1.textContent=`No item found under ${searchValue}`
                return document.getElementById("search").appendChild(h1)
            
            }
        }
            
           
           })
}

document.getElementById("show").addEventListener("click",fetchSearch)


//form data
const form = document.getElementById("news")
form.addEventListener("submit", collectData);

function collectData(e) {
e.preventDefault()
const formData = new FormData(form)
const data = Object.fromEntries(formData)

return fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify(data)
})
.then(resp=>resp.json())
.then(data=>{
    return alert("details submitted successfully")
})


}