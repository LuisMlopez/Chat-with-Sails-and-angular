function addUser(user) {

  // Get a handle to the user list <select> element
  var select = $('#users-list');

  // Create a new <option> for the <select> with the new user's information
  var option = $('<option id="user-'+user.surname+'" value="'+user.id+'">'+ user.name +'</option>');

  // Add the new <option> element
  select.append(option);
}

// Add multiple users to the users list.
function updateUserList(users) {
  var select = $('#users-list').html('');
  // users.forEach(function(user) {
  //   if (user.id !== window.currentUser.id && user.online) {
  //     addUser(user);  
  //   }    
  // });
}