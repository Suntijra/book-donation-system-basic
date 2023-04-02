
// Get the JWT token from local storage
const token = localStorage.getItem('token');

// Send an AJAX request to the server
fetch(localStorage.getItem('url_endpoint') + '/api/admin/protected', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
  .then(response => response.json())
  .then(data => {
   let msg = data.message
   if (msg === "bad"){
    window.location.href = '../loginadmin.html'
    console.log('auth bad')
   }
   else{
    console.log('auth success')
   }
  })
  .catch(error => console.log(error));