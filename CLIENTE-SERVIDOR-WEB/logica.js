function handleLoginClick(callback) {
  const url = buildLoginUrl(getCredentials());
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() { //Cuando se detecte respuesta del servidor, se ejecutara la funcíon pasando el propio objeto xhr por parámetro
     handleServerResponse(this,callback);
  };   
  xhr.send();
}
//Esta función es la que ha de tener el callback, es decir, tanto para las querys como para logearte ejecutarás esta función con la diferencia que la función de callback será una u otra
function handleServerResponse(xhr,callback){
   if(xhr.status === 200){
      const response = JSON.parse(xhr.responseText);  //Parseamos la respuesta .json del server
      callback(response.data);                        //Esto te accede directamente al nombre      
   }
   else{
      
}

//Envia la peticion al servidor y luego cuando detecta respuesta del servidor, ejecuta la función de callback
function sendRequest(url,callback){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() { //Cuando se detecte respuesta del servidor, se ejecutara la función de callback pasando el propio objeto xhr por parámetro
     handleServerResponse(this,callback);
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
document
  .getElementById('query-button')
  .addEventListener('click',handleQueryClick);
function updateLoggedUser(username){
  
      document.getElementById('login-section').classList.add('hidden');        //Escondemos la página de log in
      const query_page = document.getElementById('query-section');             //Obtenemos una referencia a la pagina de querys
      query_page.classList.remove('hidden');                                   //Hacemos visible la página de querys

      const label = document.getElementById('welcome-label');
      label.textContent= `Welcome ${username}`!;                              //Ponemos el texto en el label del HTML  
}


  




