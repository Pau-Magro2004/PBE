function handleLoginClick() {
  const creds = getCredentials();
  const url = buildLoginUrl(creds);
  performRequest(url,updateLoggedUser);
}
function handleQueryClick() {
  const query = document.getElementById('user-query').value;
  const url = buildQueryUrl(query);
  performRequest(url,updateSentQuery);
}
function performRequest(url,callback){
   const com = new ServerCommunication(url,callback);
   com.sendRequest();
}

// Obtiene las credenciales desde el formulario
function getCredentials() {
  const id   = document.getElementById('user-id').value;
  const pass = document.getElementById('user-pass').value;
  return { id, pass };
}

// Construye la URL de login
function buildLoginUrl({ id, pass }) {
  const base   = 'http://localhost:8000/Servidor/login.php/students?';
  const params = `id=${encodeURIComponent(id)}&pass=${encodeURIComponent(pass)}`;
  return base + params;
}
function buildQueryUrl(query) {
  const base = 'http://localhost:8000/Servidor/querys.php/${query}?';
  let constraints;
  switch (query) {
    case "marks": constraints = ""; break;
    case "timetables": constraints = "day=now&hour[gt]=now"; break;
    case "tasks": constraints = "date[gte]=now"; break;
    default: constraints = null; // Invalid table
   }
return base + constraints;
}
  

class ServerCommunication {
  constructor(url,callback){
     this.url = url;
     this.callback = callback;
     this.xhr = null;    
  }
  sendRequest(){
     this.xhr = new XMLHttpRequest();
     this.xhr.open('GET', this.url, true);
     this.xhr.onload =  () => {
      this.handleServerResponse();
     };
     this.xhr.onerror = () => {
      console.error('Error de conexión');
     };
     this.xhr.send();    
  }
  handleServerResponse(){
    const xhr = this.xhr;
    if(xhr.status === 200){
      try{
        const response = JSON.parse(xhr.responseText);       //Parseamos la respuesta .json del server
        if (response.status === 'id_matched'){
          this.callback(response.data);}
        else{
          this.callback(null);}
      }catch(e){
        console.error('Error al procesar JSON:', e);
      }
    }
    else{
       console.error(`Error del servidor: ${xhr.status}`);
     }
   }
}
function updateLoggedUser(username){  
     if (username === null){ //Si no coincide con nada en la base de datos
        const error_login = document.getElementById('login-message')
        error_login.textContent = 'Usuario o contraseña incorrectos';
        error_login.classList.remove('hidden');   
        error_login.classList.add('error'); //Para el css            
     }
     else{
        document.getElementById('login-section').classList.add('hidden');        //Escondemos la página de log in
        const query_page = document.getElementById('query-section');             //Obtenemos una referencia a la pagina de querys
        query_page.classList.remove('hidden');                                   //Hacemos visible la página de querys
        const label = document.getElementById('welcome-label');
        label.textContent= `Welcome ${username}`!;                              //Ponemos el texto en el label del HTML  
     }
}
function updateSentQuery(data){

}

document
  .getElementById('login-button')
  .addEventListener('click', handleLoginClick);        //Estas lineas lo que hacen es como el connect de python, hacer que se ejecuten esas funciones cuando se clicke en sus respectivos botones
document
  .getElementById('query-button')
  .addEventListener('click',handleQueryClick);


  


  




