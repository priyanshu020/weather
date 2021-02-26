window.addEventListener('load', ()=> {
    let lat;
    let long;
    let temperatureDescription= document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let locationIcon= document.querySelector('.location-icon');
    let temperature= document.querySelector('.temperature');
    let temperatureSpan= document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long= position.coords.longitude;
            lat= position.coords.latitude;

            const api= `http://api.weatherapi.com/v1/current.json?key=3d136a7fffaf43b5942151846212302&q=${lat},${long}&aqi=no`;
            fetch(api)
                .then(res=> {
                    return res.json()
                })
                .then(data=> {

                    const { temp_f }= data.current;
                    const { text }= data.current.condition;
                    const { tz_id }= data.location;
                    const { icon }= data.current.condition;

                    // Set DOM elements from the API
                    temperatureDegree.textContent= temp_f;
                    temperatureDescription.textContent= text;
                    locationTimezone.textContent= tz_id;
                    locationIcon.innerHTML= `<img src="${icon}">`;

                    // Change temperature to Celcius/Fahrenheit
                    temperature.addEventListener('click', ()=> {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent= "C";
                                // Formula for Celsius
                                let celsius= (temp_f - 32) * (5 / 9);
                            temperatureDegree.textContent= Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent= "F";
                            temperatureDegree.textContent= temp_f;
                        }
                    })
                });
        });
    }
});