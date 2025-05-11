function handleLoginClick() {
  const url = buildLoginUrl(getCredentials());
  sendRequest(url,handleServerResponse);
}
function handleServerResponse(xhr){
   if(xhr.status === 200){
      const response = JSON.parse(xhr.responseText);  //Parseamos la respuesta .json del server
      updateLoggedUser(response.data); //Esto te accede directamente al nombre
      
   }
   else{
      
}

//Envia la peticion al servidor y luego cuando detecta respuesta del servidor, ejecuta la función de callback
function sendRequest(url,callback){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() { //Cuando se detecte respuesta del servidor, se ejecutara la función de callback pasando el propio objeto xhr por parámetro
    callback(this);
  };   
  xhr.send();
}

// Obtiene las credenciales desde el formulario
function getCredentials() {
  const id   = document.getElementById('user-id').value;
  const pass = document.getElementById('user-pass').value;
  return { id, pass };
}

// Construye la URL de login
function buildLoginUrl({ id, pass }) {
  const base   = 'http://localhost:8000/login.php/students?';
  const params = `id=${encodeURIComponent(id)}&pass=${encodeURIComponent(pass)}`;
  return base + params;
}
document
  .getElementById('login-button')
  .addEventListener('click', handleLoginClick);

function updateLoggedUser(){
   // Ocultar login y mostrar dashboard
      document.getElementById('login-section').classList.add('hidden');
      const dash = document.getElementById('dashboard-section');
      dash.classList.remove('hidden');
}


  




