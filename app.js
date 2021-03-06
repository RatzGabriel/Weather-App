window.addEventListener('load',()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');
    let windzpeed = document.querySelector('.windSpeed');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            fetch(api)
            .then(data => {
                return data.json();
            })
            .then(data => {
                console.log(data)
                
                const {temperature,summary, icon,windSpeed } = data.currently;
                //Set Dom Elements  from the Api
                temperatureDegree.textContent= temperature;
                temperatureDescription.textContent=summary;
                windzpeed.textContent = `${windSpeed} Windspeed`;
                locationTimezone.textContent = data.timezone;
                //Formula for celcius
                let celsius = (temperature -32) * (5/9);
                //Set Icon
                setIcons(icon,document.querySelector('.icon'));

                //Change temperature to Celsius / Fahrenheit
                temperatureSection.addEventListener('click',function(){
                    if(temperatureSpan.textContent==="F"){
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent=Math.floor(celsius);
                    }else {
                        temperatureSpan.textContent="F";
                        temperatureDegree.textContent=temperature;
                    }
                })
            });
        });
    



    }
    function setIcons(icon, iconID){
            const skycons = new Skycons({color:"white"});
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID,Skycons[currentIcon]);
    }
});








