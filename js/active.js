(function() {
    includeHTML();
})()

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("data-include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            elmnt.removeAttribute("data-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }


function home(){
    //document.getElementById('home').style.borderBottom = '1px solid #fff';
    document.getElementById('home').addClass('active');
}
function info(){
    document.getElementById('info').addClass('active');
}
function about(){
    document.getElementById('active').addClass('active');
}

function about(){
    document.getElementById('intro').addClass('active');
}

//loadEventListeners();

// function loadEventListeners(){
//     const navBar = document.querySelector('.fa-bars');
//     navBar.addEventListener('click', showNav);
// }

// function showNav(){
//     const secondary = document.querySelector('.secondary');
//     const nav = document.querySelector('.secondary ul');
//     nav.style.display = 'flex';

//     const close = document.querySelector('.fa-times ');
//     close.style.display = 'flex';

//     const navBar = document.querySelector('.fa-bars');
//     navBar.style.display = 'none';
   

//     close.addEventListener ('click', hideNav);
//     var close = document.createElement('a');
//     close.className = 'close';
//     var icon = document.createElement('i');
//     icon.className = 'fa fa-times';
//     close.appendChild(icon);
//     secondary.appendChild(close);

//     close.addEventListener('click', hideNav);
// }

// function hideNav(){
//     const nav = document.querySelector('.secondary ul');
//     nav.style.display = 'none';
    
//     const close = document.querySelector('.fa-times ');
//     close.style.display = 'none';

//     const navBar = document.querySelector('.fa-bars');
//     navBar.style.display = 'flex';
    
// }



//nav toggle
