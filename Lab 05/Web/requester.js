//Function getting hour from the devide is executing from.
function getDeviceHour() {
  let printFecha;
  var fecha = new Date();
  hour = fecha.getHours(); 
  minutes = fecha.getMinutes(); 
  seconds = fecha.getSeconds(); 

//Add format to clock
  str_seconds = new String(seconds)
  if(str_seconds.length == 1) 
  seconds = "0" + seconds; 

  str_minutes = new String(minutes) 
  if (str_minutes.length == 1) 
  minutes = "0" + minutes; 

  str_hour = new String(hour) 
  if (str_hour.length == 1) 
  hour = "0" + hour; 

  printFecha = hour + ":" + minutes + ":" + seconds; 

  document.getElementById('deviceHour').innerHTML = printFecha;
}

//Getting the hour via a request made to the server.
//Using fetch to get a response and convert it to JSON
function getServerHour() {
  fetch('http://localhost:3000/hrsrv')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      //Using desJSON function to provide the date.
      var fecha = desJSON(myJson); 
      document.getElementById('serverHour').innerHTML = fecha;
    });
}

//Take a JSON object and convert it to string format
function desJSON(jsonObj) {
  let printFecha = "";
  let hour = jsonObj.Hour;
  let minutes = jsonObj.Minutes;
  let seconds = jsonObj.Seconds;
  
  //Add format to clock
  str_seconds = new String(seconds)
  if(str_seconds.length == 1) 
  seconds = "0" + seconds; 

  str_minutes = new String(minutes) 
  if (str_minutes.length == 1) 
  minutes = "0" + minutes; 

  str_hour = new String(hour) 
  if (str_hour.length == 1) 
  hour = "0" + hour;

  printFecha = String(hour) + ":" + String(minutes) + ":" + String(seconds);
  return printFecha;
}
setInterval(getDeviceHour, 1000)
setInterval(getServerHour, 1000)
