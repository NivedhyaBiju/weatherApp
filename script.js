const apiKey=`8d6454a89dff871786a0307b0dbebbee`;
async function fetchWeatherData(city){
    try{

    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    if (!response.ok){
        throw new Error("Unable to fetch weather data");
    }
    const data=await response.json();
    console.log(data);
    updateWeatherUI(data);
    }
    catch(error){
        console.error(error);
    }
}

const cityElement=document.querySelector(".city");
const temperature=document.querySelector(".temp");
const feelsLike=document.querySelector(".feels-like");
const pressure=document.querySelector(".pressure");
const humidity=document.querySelector(".humidity");
const windSpeed=document.querySelector(".wind-speed");
const sunrise=document.querySelector(".sunrise");
const sunset=document.querySelector(".sunset");

const descriptionText=document.querySelector(".description-text");
const date=document.querySelector(".date");
const descriptionIcon=document.querySelector('.description i');


function updateWeatherUI(data){
    cityElement.textContent=data.name;
    temperature.textContent=`${Math.round(data.main.temp)}°`;

    feelsLike.textContent=`${data.main.feels_like}°`;
    pressure.textContent=`${data.main.pressure} hPa`;
    humidity.textContent=`${data.main.humidity}%`;
    windSpeed.textContent=`${data.wind.speed} km/h`;

    const sunriseIST = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata'});
    const sunsetIST = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata'});
    sunrise.textContent = sunriseIST;
    sunset.textContent = sunsetIST;

    
    descriptionText.textContent=data.weather[0].description;
    const currentDate=new Date();
    date.textContent=currentDate.toDateString();
    const weatherIconName=getWeatherIconName(data.weather[0].main)
    descriptionIcon.innerHTML=`<i class="material-icons">${weatherIconName}</i>`
}

const formElement=document.querySelector(".search-form");
const inputElement=document.querySelector(".city-input");

formElement.addEventListener("submit", function(e){
    e.preventDefault();
    const city=inputElement.value;
    if(city!==""){
        fetchWeatherData(city);
        inputElement.value="";
    }
})

function getWeatherIconName(weatherCondition){
    const iconMap={
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorms: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help"
}
