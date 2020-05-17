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

function filterTask() {
    $("#table").find("tr:not(:first)").remove(); 

    var searchKeyword = $('#member_search').val();

    var tasks2;
    
    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }

    var filteredMembers = tasks2.filter(function (item, index){
    return  item.fullname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.designation.toLowerCase().includes(searchKeyword.toLowerCase())
    });

    if (!filteredMembers.length) {
        $('.show-table-info').removeClass('hide');
    } else {
        $('.show-table-info').addClass('hide');
    }
    console.log(filteredMembers);
    


    filteredMembers.forEach(function (item, index) {

        newRow= table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell2 = newRow.insertCell(1);
        cell3 = newRow.insertCell(2);
        cell4 = newRow.insertCell(3);
        cell5 = newRow.insertCell(4);
        cell6 = newRow.insertCell(5);
        cell7 = newRow.insertCell(6);

        cell1.innerHTML = '<input type="checkbox" class="check" id="child">';
        cell2.innerHTML = index+1;
        cell3.innerHTML = item.fullname;
        cell4.innerHTML = item.email;
        cell5.innerHTML = item.age;
        cell6.innerHTML = item.designation; 
        var guid = item.id;
        cell7.innerHTML ='<button class="btn btn-sm btn-light" style="margin-right:5px" onclick="viewModal('+ guid +');">View</button> ' +
                '<button class="btn btn-sm btn-primary" onclick="editModal(' + guid + ')">Edit</button> ' +
                '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')">Clone</button> ' +
                '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
            
    })
}

function addTask(){                  
    var allCard = document.getElementById('allCards');
    var singleCard = document.createElement('div');
    singleCard.className = 'single-card';
    
    var fullname = document.createElement('h4');
    fullname.className = 'fullname';
    fullname.appendChild(document.createTextNode(document.getElementById('fullname').value));
   
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
    age.appendChild(document.createTextNode(document.getElementById('age').value));

    var email = document.createElement('p');
    email.className = 'email';
    var icon = document.createElement('i');
    icon.className = "fa fa-envelope-square";
    email.appendChild(icon);
    email.appendChild(document.createTextNode(document.getElementById('email').value));

    // button view, edit, clone, delete
    var view = document.createElement('button');
    view.className = "buttons";
    var icon = document.createElement('i');
    icon.className = "fa fa-eye";
    view.style.display = 'flex';
    view.style.color = '#fff';
    view.appendChild(icon);
    // var guid = obj.id;
    // view.addEventListener('click', viewModal(guid));

    var edit = document.createElement('button');
    edit.className = "buttons";
    var icon = document.createElement('i');
    icon.className = "fa fa-user-edit";
    edit.appendChild(icon);

    var clone = document.createElement('button');
    clone.className = "buttons";
    var icon = document.createElement('i');
    icon.className = "fa fa-copy";
    clone.appendChild(icon);

    var remove = document.createElement('button');
    remove.className = "btn btn-sm btn-danger";
    var icon = document.createElement('i');
    icon.className = "fa fa-trash";
    remove.appendChild(icon);
   // button view, edit, clone, delete

    // var buttons =  '<button class="btn btn-sm btn-info" style="margin-right:5px" onclick="viewModal('+ guid +');"><i class="fas fa-eye"></i></button> ' +
    //     '<button class="btn btn-sm btn-primary" onclick="editModal(' + guid + ')"><i class="far fa-user-edit"></i></button> ' +
    //     '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')"><i class="far fa-copy"></i></button> ' +
    //     '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')"><i class="far fa-trash"></i></button>';


    singleCard.appendChild(fullname);
    singleCard.appendChild(occupation);
    singleCard.appendChild(age);
    singleCard.appendChild(email);
    singleCard.appendChild(view);
    singleCard.appendChild(edit);
    singleCard.appendChild(clone);
    singleCard.appendChild(remove);
    allCard.appendChild(singleCard);
   
   var obj = {   
        fullname   : document.getElementById('fullname').value,
        designation : designation.value,
        age        : document.getElementById('age').value,
        email      : document.getElementById('email').value,
               
    };
    
    //console.log(obj);
    
    addDataInLocalStorage(obj);
    clearForm();
    $('#member-form-modal').modal('hide')
}

//counting row of table
function getTotalRowOfTable() {
    var table = document.getElementById('table');
    return table.rows.length-1;
}

//store data in local storage
function addDataInLocalStorage(newTask){
    
    var tasks2;

    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }

    newTask.id = guid();
    tasks2.push(newTask);
    localStorage.setItem('tasks2', JSON.stringify(tasks2));
}

function getTasks(){

    var tasks2;

    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }


    //data not found message with show data from LS
    if (!tasks2.length) {
        $('.show-table-info').removeClass('hide');
    } 
    else {
        $('.show-table-info').addClass('hide');
        
        tasks2.forEach(function(obj,index){

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
            view.className = "buttons";
            var icon = document.createElement('i');
            icon.className = "fa fa-eye";
            view.style.display = 'flex';
            view.style.color = '#fff';
            view.appendChild(icon);
            // var guid = obj.id;
            // view.addEventListener('click', viewModal(guid));

            var edit = document.createElement('button');
            edit.className = "buttons";
            var icon = document.createElement('i');
            icon.className = "fa fa-user-edit";
            edit.appendChild(icon);

            var clone = document.createElement('button');
            clone.className = "buttons";
            var icon = document.createElement('i');
            icon.className = "fa fa-copy";
            clone.appendChild(icon);

            var remove = document.createElement('button');
            remove.className = "btn btn-sm btn-danger";
            var icon = document.createElement('i');
            icon.className = "fa fa-trash";
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
        // var guid = obj.id;  
        // cell8.innerHTML = '<button class="btn btn-sm btn-info" style="margin-right:5px" onclick="viewModal('+ guid +');">View</button>' +
        // '<button class="btn btn-sm btn-primary" onclick="editModal('+ guid +')" >Edit</button> ' +
        // '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')">Clone</button> ' +
        // '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';   
    
    });
}
}


function showDeleteModal(id) {
    $('#deleted-member-id').val(id);

    $('#deleteDialog').modal();  
}

function deleteMemberData() {

    var id = deleteId.value;
    var data = localStorage.getItem('tasks2');
    var storageUsers = JSON.parse(data);

    var newData = [];

    newData = storageUsers.filter(function (element, index) {
        return element.id != id;
    });

    var data = JSON.stringify(newData);

    localStorage.setItem('tasks2', data);
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

    var selectedRow = null;
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

    makeFieldDisabled(true);
    alterButtons('none', 'none');

    var tasks2;

    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }
    
    var member = tasks2.find(function (item) {
        return item.id == id;
    })

    fullname.value = member.fullname;
    email.value = member.email;
    age.value = member.age;
    designation.value = member.designation;
    
    $('#view-form-modal').modal();
}

function editModal(id){

    var tasks2;
    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }
    
    var member = tasks2.find(function (item) {
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
    var tasks2;
    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }
    var id = $('#member_id').val();
    
    var member = tasks2.find(function (item) {
        return item.id == id;
    })
    member.fullname = edit_fullname.value;
    member.email = edit_email.value;
    member.age = edit_age.value;
    member.designation =  edit_designation.value;

    var data = JSON.stringify(tasks2);
    localStorage.setItem("tasks2", data);

    $("#table").find("tr:not(:first)").remove();
    getTasks();
    $('#editmodal').modal('hide')
}

function cloneModal(id){

    var tasks2;
    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }
    
    var member = tasks2.find(function (item) {
        return item.id == id;
    })

    $('#clone_fullname').val(member.fullname);
    $('#clone_email').val(member.email);
    $('#clone_age').val(member.age);
    $('#clone_designation').val(member.designation);
    $('#clone_member_id').val(id);
    
    $('#clonemodal').modal();
}

function cloneInfo(){
    var tasks2;
    if(localStorage.getItem('tasks2') === null){
        tasks2 = [] ;
    }
    else{
        tasks2 = JSON.parse(localStorage.getItem('tasks2'));  
    }
    var id = $('#clone_member_id').val();
    
    var allCard = document.getElementById('allCards');
    var singleCard = document.createElement('div');
    singleCard.className = 'single-card';
    
    var fullname = document.createElement('h4');
    fullname.className = 'fullname';
    fullname.appendChild(document.createTextNode(fullname.value));
   
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
    // var guid = id;
   
    // cell8.innerHTML ='<button class="btn btn-sm btn-info" style="margin-right:5px" onclick="viewModal('+ guid +');">View</button> ' +
    //       '<button class="btn btn-sm btn-primary" onclick="editModal(' + guid + ')">Edit</button> ' +
    //       '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')">Clone</button> ' +
    //       '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
     
     var obj = {   
          fullname  : clone_fullname.value,
          designation: clone_designation.value,
          age        : clone_age.value,    
          email      : clone_email.value,  
      };
    
      addDataInLocalStorage(obj);
      clearForm();
      
    $('#clonemodal').modal('hide');
}


function SelectAll(){
    var parent = document.getElementById('parent');
    var input = document.getElementsByTagName('input');

    if(parent.checked === true){
        for (var i = 0; i<input.length; i++){
            if(input[i].type == "checkbox" && input[i].checked == false && input[i].id == "child"){
                input[i].checked = true;
            }
        }
    }

    if(parent.checked === false){
        for (var i = 0; i<input.length; i++){
            if(input[i].type == "checkbox" && input[i].checked == true && input[i].id == "child"){
                input[i].checked = false;
            }
        }
    }
}


function showSelectedRows(id) {
    $('#clear-member-id').val(id);
    
    //$('#table input:checked').val(id);
    //debugger;
    $('#clearDialog').modal();  
}
function deleteSelectedRow(){
    var check = document.getElementsByClassName('check');
    var data = localStorage.getItem('tasks2');
    var storageUsers = JSON.parse(data);
    var newData = [];
    newData = storageUsers.filter(function (element, index) {
        return element.id != id;
    });
    console.log(newData);
    debugger;
   
}
