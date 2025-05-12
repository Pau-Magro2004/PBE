function handleLoginClick() {
  const url =  buildLoginUrl(getCredentials);
  const com = serverCommunication(url,updateLoggedUser);
}
function handleQueryClick() {
  const url =
  const com = serverCommunication(url,updateSentQuery);
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

class serverCommunication {
  constructor(url,callback){
    this.url = url;
    this.callback = callback;
    this.xhr = null;    
  }
  sendRequest(){
     xhr = new XMLHttpRequest();
     xhr.open('GET', this.url, true);
     xhr.onload =  () => {
      this.handleServerResponse();
    };
     xhr.send();    
  }
  handleServerResponse(){
   if(this.xhr.status === 200){
      const response = JSON.parse(this.xhr.responseText);  //Parseamos la respuesta .json del server
      this.callback(response.data);                        //Esto te accede directamente al nombre      
   }
   else{
      
    }
  }
}
function updateLoggedUser(username){  
      document.getElementById('login-section').classList.add('hidden');        //Escondemos la página de log in
      const query_page = document.getElementById('query-section');             //Obtenemos una referencia a la pagina de querys
      query_page.classList.remove('hidden');                                   //Hacemos visible la página de querys
      const label = document.getElementById('welcome-label');
      label.textContent= `Welcome ${username}`!;                              //Ponemos el texto en el label del HTML  
}
function updateSentQuery(data){

}

document
  .getElementById('login-button')
  .addEventListener('click', handleLoginClick);        //Estas lineas lo que hacen es como el connect de python, hacer que se ejecuten esas funciones cuando se clicke en sus respectivos botones
document
  .getElementById('query-button')
  .addEventListener('click',handleQueryClick);


  


  




