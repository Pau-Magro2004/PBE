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

function updateLoggedUser(data){  
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
//completar
}

document
  .getElementById('login-button')
  .addEventListener('click', handleLoginClick);        //Estas lineas lo que hacen es como el connect de python, hacer que se ejecuten esas funciones cuando se clicke en sus respectivos botones
document
  .getElementById('query-button')
  .addEventListener('click',handleQueryClick);


  


  




