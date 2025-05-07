function handleLoginClick() {
   // Capturamos los valores del formulario
  const id = document.getElementById('user-id').value;
  const pass = document.getElementById('user-pass').value;  
  const url = `http://localhost:8000/login.php`    //Creamos la URL: http://localhost:8000/login.php/students?id='id'$pass='pass
              + `/students?`
              + `id=${id}`
              + `&pass=${pass}`;
  //Creamos el objeto xhr
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);                //Indicamos que la petición se hará mediante el método GET true = asíncrono (no bloqueante)

}


document
  .getElementById('login-button')
  .addEventListener('click', handeLoginClick);


  




