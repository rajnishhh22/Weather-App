const userTab = document.querySelector('[data-userWeather]')
const searchTab = document.querySelector("[data-searchWeather]")
const grantAccess = document.querySelector(".grantAccess-container")
const searchForm = document.querySelector(".searchWeather-container")
const loading = document.querySelector(".loading-container")
const weatherInfoCont = document.querySelector(".userInfoContainer")

let currentTab = userTab;
const APIkey = '659169c7691bc1a15f9afd6b63b52d00';
currentTab.classList.add("currentTab")




function switchTab(clickedTab){
    if(clickedTab!=currentTab){
       
        currentTab.classList.remove("currentTab")

        currentTab=clickedTab

        currentTab.classList.add('currentTab')
    
    if(!searchForm.classList.contains("active")){
        // make visible to search form but we to invisible all other 
        searchForm.classList.add("active")
        grantAccess.classList.remove('active')
        weatherInfoCont.classList.remove('active')
    }
    else{
        searchForm.classList.remove("active")
        weatherInfoCont.classList.remove("active")
        getfromSessionStorage();
    }

}

}



userTab.addEventListener("click",()=>{
    switchTab(userTab)
})

searchTab.addEventListener("click",()=>{
    switchTab(searchTab)
})

// session storage

function getfromSessionStorage(){
    const local = sessionStorage.getItem("user-cordinates")
    if(!local){
        grantAccess.classList.add("active");
    }
    else{
        const cordinates= JSON.parse();
        fetchuserWeatherInfo(cordinates)
    }
}

async function fetchuserWeatherInfo(cordinates){
    const {lat, lon}= cordinates;
    grantAccess.classList.remove("active")
    loading.classList.add("active")

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
        let data = await response.json()

        loading.classList.remove("active")
        weatherInfoCont.classList.add("active")

        renderWeather(data)
    }
    catch(err){
        
    }
}

function renderWeather(data){
    let name = document.querySelector("[data-cityName]")
    let flag = document.querySelector("[data-countryFlag]")
    let weatherDesc = document.querySelector("[data-weatherDesc]")
    let weatherSymbol = document.querySelector("[ data-weatherIcon]")
    let temp = document.querySelector("[data-weatherTemp]")
    
    let windspeed =document.querySelector("[data-windspeed]")
    let humidity = document.querySelector("[data-humidity]")
    let clouds = document.querySelector("[data-clouds]")

    name.innerText = data?.name
    console.log(name)
    // flag.src = `https://flagcdn.com/144x108/${`weatherInfo?.sys?.country.toLowerCase()`}.png`;
    weatherDesc.innerText = data?.weather?.[0]?.description
    console.log(weatherDesc)
    // weatherSymbol.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.textContent =  `${data?.main?.temp} °C`
    console.log(temp)
    windspeed.innerText = `${data?.wind?.speed}m/s`
    humidity.innerText = `${data?.main?.humidity}%`
    clouds.innerText = `${data?.main?.clouds?.all}%`

}

function getlocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{

    }
}

function showPosition(position){
    const userCordinates ={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-cordinates",JSON.stringify(userCordinates))
    fetchuserWeatherInfo(userCordinates)

}

const grantAccessButton = document.querySelector("[grantAccessButton]")
grantAccessButton.addEventListener("click",getlocation)


const searchButton = document.querySelector("[data-formsearch]")
const searchInput = document.querySelector("[searchInput]")
searchButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let cityName = searchInput.value
    if(cityName === ""){
        return ;
    }
    else{
        fetchSearchWeatherInfo(cityName)
    }

})

async function fetchSearchWeatherInfo(city){
    loading.classList.add("active")
    weatherInfoCont.classList.remove("active")
    grantAccess.classList.remove("active")
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
        const data = await response.json();
        loading.classList.remove("active")
        weatherInfoCont.classList.add("active")
        renderWeather(data)
    }
    catch(err){

    }
    



}


