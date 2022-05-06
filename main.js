const input = document.getElementById('input');
const boton = document.getElementById('boton');
const bg = document.getElementById('elClima');
let lugar;

const temp = document.getElementById('temp');
const ciudad = document.getElementById('ciudad');
let lugares = document.getElementById('lugares');
let LocalLugar = lugares.firstElementChild;

const max = document.getElementById('max');
const min = document.getElementById('min');
const hum = document.getElementById('hum');
const ths = document.getElementById('ths');
const atp = document.getElementById('atp');
const wis = document.getElementById('wis');
const con = document.getElementById('con');
const icono = con.previousElementSibling;

const day = document.getElementById('day');
const hrs = document.getElementById('hrs');
const mns = document.getElementById('mns');


const API_KEY = '44026197d7fd01eb7a4d6c601245cfc9';

let WEA = `https://api.openweathermap.org/data/2.5/weather?lat=`;
let GEO = `http://api.openweathermap.org/geo/1.0/direct?q=`;

boton.addEventListener('click', ()=>{
    lugar = input.value;
    LocalSave(lugar);
    LatLon(lugar);
    LocalGet();
    input.value = '';
})

input.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13) {
        e.preventDefault();
        lugar = input.value;
        LocalSave(lugar);
        LatLon(lugar);
        LocalGet();
        input.value = '';
    }
    
})

function defP(def) {
    lugar = def;
    LatLon(def);
} 

function LatLon(lugar) {
    
    fetch(`${GEO}${lugar}&limit=10&appid=${API_KEY}`)
   .then ( function(response){
       return response.json();
    }). then ( function(json){
        ciudad.innerHTML = lugar.charAt(0).toUpperCase()+ lugar.slice(1);
        clima(json);
    })
   .catch (function(err){
        console. log("Algo mal", err);
    })
}

function clima(data) {
    if(data.lat==undefined || data.lon==undefined) {

        fetch(`${WEA}${data[0].lat}&lon=${data[0].lon}&appid=${API_KEY}&units=metric&lang=es`)
            .then ( function(response){
                return response.json();
            }). then ( function(json){
                MostrarC(json);
                bgVid(json);
            })
            .catch (function(err){
                console. log("Algo salió mal", err);
            })

    }
}

function LocalSave(lugar) {
    localStorage.setItem('Lugar', lugar);  
}

function LocalGet() {
    LocalLugar.innerHTML = localStorage.getItem('Lugar');
}

window.onload = LocalGet;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("No soportada en este browser");
    }    
}

function showPosition(position) {


    fetch(`${WEA}${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric&lang=es`)
    .then ( function(response){
                return response.json();
            }). then ( function(json){
                MostrarC(json);
                ciudad.innerHTML = json.name;
            })
            .catch (function(err){
                console. log("Algo salió mal", err);
            })
}

function MostrarC(data) {
    temp.innerHTML = data.main.temp + '°c';
    min.innerHTML = data.main.temp_min + '°c';
    max.innerHTML = data.main.temp_max + '°c';
    atp.innerHTML = data.main.pressure + 'hPa';
    hum.innerHTML = data.main.humidity + '%';
    ths.innerHTML = data.main.feels_like + '°c';
    wis.innerHTML = data.wind.speed + ' km/h';
    con.innerHTML = data.weather[0].description.charAt(0).toUpperCase()+ data.weather[0].description.slice(1);
    icono.src = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'.png';
}

function bgVid(data) {
    var player;
    let id;
    let defBg = document.getElementById('screen');
    defBg.style.background = 'none';

    switch(data.weather[0].description) {
        
        case 'cielo claro':
            id = 'QdaaJ7mkSBs';
            break;
        case 'algo de nubes':
            id = '6_up977in_w';
            break;
        case 'nubes dispersas':
            id = '7Iujb8pffCo';
            break;
        case 'muy nuboso':
            id = 'CC6cii_VjHs';
            break;
        case 'lluvia ligera':
            id = 'ZziY_U7hckc';
            break;
        case 'lluvia':
            id = 'GPGbP1Q_pu4';
            break;
        case 'tormenta':
            id = 'Uj0DuD92TIk';
            break;
        case 'nieve':
            id = 'hU_pIFsq-VM';
            break;
        case 'neblina':
            id = 'L5fCX1wQBcM';
            break;
        default:
            id = 'bcvfu0QtchA';
    }
    
    
    /*function onYouTubePlayerAPIReady() {
        console.log(id);
        player = new YT.Player('elClima', {
          height: '360',
          width: '640',
          videoId: 'M7lc1UVf-VE'
        });
      } */
      
    function onYouTubePlayerAPIReady(){

        player = new YT.Player("elClima", {
          videoId: id, // YouTube Video ID
          playerVars: {
            autoplay: 1, // Auto-play the video on load
            autohide: 1, // Hide video controls when playing
            disablekb: 1,
            controls: 0, // Hide pause/play buttons in player
            showinfo: 0, // Hide the video title
            modestbranding: 1, // Hide the Youtube Logo
            loop: 1, // Run the video in a loop
            playlist: id, // Run the video in a loop
            fs: 0, // Hide the full screen button
            rel: 0,
            enablejsapi: 1
        },
          events: {
            onReady: function (e) {
              e.target.mute();
              e.target.playVideo();
              e.target.setLoop(true);
            }
          }
        }); 
      };

      let pb1 = document.getElementById('elClima');

      if(pb1.tagName=="IFRAME"){
          document.getElementById("elClima").remove();
          let div = document.createElement('div');
          div.id = 'elClima';
          defBg.prepend(div);
      }
      onYouTubePlayerAPIReady();

      
}

function tDate() {
    let today = new Date();
    day.innerHTML = today.toDateString();
    hrs.innerHTML = today.getHours();
    mns.innerHTML = today.getMinutes();
}

//clear sky QdaaJ7mkSBs
//few clouds 6_up977in_w 
//Nubes 7Iujb8pffCo
//Cloudy CC6cii_VjHs
//Aguacero ZziY_U7hckc
//lluvia GPGbP1Q_pu4
//tormenta Uj0DuD92TIk
//nieve hU_pIFsq-VM
//neblina L5fCX1wQBcM
            //bg.style.background = '(imgs/fondo-base.jpg)'
window.onload = getLocation;
tDate();