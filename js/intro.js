function addTask(){
    
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    var designation = document.getElementById('designation');
    var email = document.getElementById('email');
    var age = document.getElementById('age');
    
    var allCard = document.getElementById('allCards');
    var singleCard = document.createElement('div');
    singleCard.className = 'single-card';
    
    var fullname = document.createElement('h4');
    fullname.className = 'fullname';
    fullname.appendChild(document.createTextNode(firstname.value + ' ' + lastname.value));
   
    var occupation = document.createElement('p');
    occupation.className = 'occupation';
    var icon = document.createElement('i');
    icon.className = 'fa fa-briefcase';
    occupation.appendChild(icon);
    occupation.appendChild(document.createTextNode(designation.value));
    

    var age = document.createElement('p');
    age.className = 'age';
    var icon = document.createElement('i');
    icon.className = 'fa fa-child';
    age.appendChild(icon);
    age.appendChild(document.createTextNode(age.value));

    var email = document.createElement('p');
    email.className = 'email';
    var icon = document.createElement('i');
    icon.className = "fa fa-envelope-square";
    email.appendChild(icon);
    email.appendChild(document.createTextNode(email.value));
   

    singleCard.appendChild(fullname);
    singleCard.appendChild(occupation);
    singleCard.appendChild(age);
    singleCard.appendChild(email);
    allCard.appendChild(singleCard);
    
    
}
