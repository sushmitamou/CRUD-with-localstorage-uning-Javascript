var id = document.getElementById("id");
var fullname = document.getElementById("fullname");
var email = document.getElementById("email");
var age = document.getElementById("age");
var designation = document.getElementById("designation");
var tablerows = document.getElementById("tablerows");
var filter = document.getElementById("filter");
var deleteId = document.getElementById("deleted-member-id");
var clearId = document.getElementById("clear-member-id");
var editId = document.getElementById("member_id");
var clear = document.getElementById("clear");
var selectedId = $('#table input:checked');

$(document).ready(function () {
    var age = "";
    var m = "";
    $('#age').datepicker({
        onSelect: function (value, ui) {
            var today = new Date();
            age = today.getFullYear() - ui.selectedYear;
            m = today.getMonth() - ui.selectedMonth;
            if (m < 0 || (m === 0 && today.getDate() < ui.selectedDate)) {
                age--;
            }
            $('#age').val(age);
        },
        changeMonth: true,
        changeYear: true,
        yearRange: '1975:2020',
    });

    $('#edit_age').datepicker({
        onSelect: function (value, ui) {
            var today = new Date();
            age = today.getFullYear() - ui.selectedYear;
            m = today.getMonth() - ui.selectedMonth;
            if (m < 0 || (m == 0 && today.getDate() < ui.selectedDate)) {
                age--;
            }
            $('#edit_age').val(age);
        },
        changeMonth: true,
        changeYear: true,
        yearRange: '1975:2020',
    });

    $('#clone_age').datepicker({
        onSelect: function (value, ui) {
            var today = new Date();
            age = today.getFullYear() - ui.selectedYear;
            m = today.getMonth() - ui.selectedMonth;
            if (m < 0 || (m == 0 && today.getDate() < ui.selectedDate)) {
                age--;
            }
            $('#clone_age').val(age);
        },
        changeMonth: true,
        changeYear: true,
        yearRange: '1975:2020',
    });

})
/**
 * Generating unique ID for new Input
*/
 function guid() {
     return parseInt(Date.now() + Math.random());
 }


loadEventListeners();

function loadEventListeners(){
    //show data in UI
    document.addEventListener('DOMContentLoaded', getTasks);
    //clear all from ls
    //clear.addEventListener('click', clearAll);
}


function addTask(){                  
   
   var obj = {   
        fullname    : document.getElementById('fullname').value,
        designation : document.getElementById('designation').value,
        age         : document.getElementById('age').value,
        email       : document.getElementById('email').value,              
    };
    
    addDataInLocalStorage(obj);
    clearForm();
    getTasks();
    $('#member-form-modal').modal('hide')
}

//counting row of table
function getTotalRowOfTable() {
    var table = document.getElementById('table');
    return table.rows.length-1;
}

//store data in local storage
function addDataInLocalStorage(newTask){
    
    var allMembers;

    if(localStorage.getItem('allMembers') === null){
        allMembers = [] ;
    }
    else{
        allMembers = JSON.parse(localStorage.getItem('allMembers'));  
    }

    newTask.id = guid();
    allMembers.push(newTask);
    localStorage.setItem('allMembers', JSON.stringify(allMembers));
}

function getTasks(){

    var allMembers;

    if(localStorage.getItem('allMembers') === null){
        allMembers = [] ;
    }
    else{
        allMembers = JSON.parse(localStorage.getItem('allMembers'));  
    }


    //data not found message with show data from LS
    if (!allMembers.length) {
        $('.show-table-info').removeClass('hide');
    } 
    else {
        $('.show-table-info').addClass('hide');

        // Clear previous data
        $("#allCards").find(".single-card").remove();

        allMembers.forEach(function(obj,index) {

            var allCard = document.getElementById('allCards');
            var singleCard = document.createElement('div');
            singleCard.className = 'single-card';
            
            var fullname = document.createElement('h4');
            fullname.className = 'fullname';
            fullname.appendChild(document.createTextNode(obj.fullname));
           
            var occupation = document.createElement('p');
            occupation.className = 'occupation';
            var icon = document.createElement('i');
            icon.className = 'fa fa-briefcase';
            occupation.appendChild(icon);
            occupation.appendChild(document.createTextNode(obj.designation));
            
        
            var age = document.createElement('p');
            age.className = 'age';
            var icon = document.createElement('i');
            icon.className = 'fa fa-child';
            age.appendChild(icon);
            age.appendChild(document.createTextNode(obj.age));
        
            var email = document.createElement('p');
            email.className = 'email';
            var icon = document.createElement('i');
            icon.className = "fa fa-envelope-square";
            email.appendChild(icon);
            email.appendChild(document.createTextNode(obj.email));
           
            var view = document.createElement('button');
            var guid = obj.id;
            view.addEventListener("click", function () {
                viewModal(guid);
            });
            view.className = "buttons";

            var icon = document.createElement('i');
            icon.className = "fa fa-eye";
            view.style.display = 'flex';
            view.style.color = '#fff';
            view.appendChild(icon);

            var edit = document.createElement('button');
            edit.className = "buttons";
            var icon = document.createElement('i');
            icon.className = "fa fa-user-edit";
            edit.addEventListener("click", function () {
                editModal(guid);
            });
            edit.appendChild(icon);

            var clone = document.createElement('button');
            clone.className = "buttons";
            var icon = document.createElement('i');
            icon.className = "fa fa-copy";
            clone.addEventListener("click", function () {
                cloneModal(guid);
            });
            clone.appendChild(icon);

            var remove = document.createElement('button');
            remove.className = "btn btn-sm btn-danger";
            var icon = document.createElement('i');
            icon.className = "fa fa-trash";
            remove.addEventListener("click", function () {
                showDeleteModal(guid);
            });
            remove.appendChild(icon);
        
            singleCard.appendChild(fullname);
            singleCard.appendChild(occupation);
            singleCard.appendChild(age);
            singleCard.appendChild(email);
            singleCard.appendChild(view);
            singleCard.appendChild(edit);
            singleCard.appendChild(clone);
            singleCard.appendChild(remove);
            allCard.appendChild(singleCard); 
    
    });
}
}


function showDeleteModal(id) {
    $('#deleted-member-id').val(id);

    $('#deleteDialog').modal();  
}

function deleteMemberData() {

    var id = deleteId.value;
    var data = localStorage.getItem('allMembers');
    var storageUsers = JSON.parse(data);

    var newData = [];

    newData = storageUsers.filter(function (element, index) {
        return element.id != id;
    });

    var data = JSON.stringify(newData);

    localStorage.setItem('allMembers', data);
    $("#table").find("tr:not(:first)").remove();
    $('#deleteDialog').modal('hide');
    getTasks();
    
}


//clear form data
function clearForm(){
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
    document.getElementById("designation").value = "";

}


function alterButtons(createBtn, editBtn) {
    document.getElementById("create-btn").style.display = createBtn;
    document.getElementById("update-btn").style.display = editBtn;
  }
  
  function makeFieldDisabled(value) {
    document.getElementById("view_fullname").disabled  = value;
    document.getElementById("view_email").disabled = value;
    document.getElementById("view_age").disabled = value;
    document.getElementById("view_designation").disabled = value;
  }

function viewModal(id){

    var allMembers;

    if(localStorage.getItem('allMembers') === null){
        allMembers = [] ;
    }
    else{
        allMembers = JSON.parse(localStorage.getItem('allMembers'));  
    }
    
    var member = allMembers.find(function (item) {
        return item.id == id;
    })

    view_fullname.value = member.fullname;
    view_email.value = member.email;
    view_age.value = member.age;
    view_designation.value = member.designation;
    
    $('#view-form-modal').modal();
}

function editModal(id) {

    var allMembers;
    if(localStorage.getItem('allMembers') === null){
        allMembers = [] ;
    }
    else{
        allMembers = JSON.parse(localStorage.getItem('allMembers'));  
    }
    
    var member = allMembers.find(function (item) {
        return item.id == id;
    })

    $('#edit_fullname').val(member.fullname);
    $('#edit_email').val(member.email);
    $('#edit_age').val(member.age);
    $('#edit_designation').val(member.designation);
    $('#member_id').val(id);
    
    $('#editmodal').modal();
}

function updateInfo(){
    var allMembers;
    if(localStorage.getItem('allMembers') === null){
        allMembers = [] ;
    }
    else{
        allMembers = JSON.parse(localStorage.getItem('allMembers'));  
    }
    var id = $('#member_id').val();
    
    var member = allMembers.find(function (item) {
        return item.id == id;
    })
    member.fullname = edit_fullname.value;
    member.email = edit_email.value;
    member.age = edit_age.value;
    member.designation =  edit_designation.value;

    var data = JSON.stringify(allMembers);
    localStorage.setItem("allMembers", data);

    $("#table").find("tr:not(:first)").remove();
    getTasks();
    $('#editmodal').modal('hide')
}

function cloneModal(id){

    var allMembers;
    if(localStorage.getItem('allMembers') === null){
        allMembers = [] ;
    }
    else{
        allMembers = JSON.parse(localStorage.getItem('allMembers'));  
    }
    
    var member = allMembers.find(function (item) {
        return item.id == id;
    })

    $('#clone_fullname').val(member.fullname);
    $('#clone_email').val(member.email);
    $('#clone_age').val(member.age);
    $('#clone_designation').val(member.designation);
    $('#clone_member_id').val(id);
    
    $('#clonemodal').modal();
}

function cloneInfo() {
    var allMembers;
    if(localStorage.getItem('allMembers') === null){
        allMembers = [] ;
    }
    else{
        allMembers = JSON.parse(localStorage.getItem('allMembers'));  
    }
    
    var obj = {   
        fullname   : clone_fullname.value,
        designation: clone_designation.value,
        age        : clone_age.value,    
        email      : clone_email.value,  
    };
  
    addDataInLocalStorage(obj);
    clearForm();
    getTasks();
    
    $('#clonemodal').modal('hide');

   
}




