var id = document.getElementById("id");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
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

    var tasks;
    
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }

    var filteredMembers = tasks.filter(function (item, index){
    return  item.firstname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.lastname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
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
        cell3.innerHTML = item.firstname + item.lastname;
        cell4.innerHTML = item.designation;
        cell5.innerHTML = item.age;
        cell6.innerHTML = item.email;
         
        var guid = item.id;
        cell7.innerHTML ='<button class="btn btn-sm btn-light" style="margin-right:5px" onclick="viewModal('+ guid +');">View</button> ' +
                '<button class="btn btn-sm btn-primary" onclick="editModal(' + guid + ')">Edit</button> ' +
                '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')">Clone</button> ' +
                '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
            
    })
}

function addTask(){                  
  var table   = document.querySelector('table tbody');
  newRow      = table.insertRow(table.length);


  cell1 = newRow.insertCell(0);
  cell2 = newRow.insertCell(1);
  cell3 = newRow.insertCell(2);
  cell4 = newRow.insertCell(3);
  cell5 = newRow.insertCell(4);
  cell6 = newRow.insertCell(5);
  cell7 = newRow.insertCell(6);


  cell1.innerHTML = '<input type="checkbox" class="check" id="child">';
  cell2.innerHTML = getTotalRowOfTable();
  cell3.innerHTML = firstname.value + lastname.value;
  cell4.innerHTML = designation.value;
  cell5.innerHTML = age.value;
  cell6.innerHTML = email.value;  //$('#age').val(age);

  var guid = id;
 
  cell7.innerHTML ='<button class="btn btn-sm btn-info" style="margin-right:5px" onclick="viewModal('+ guid +');">View</button> ' +
        '<button class="btn btn-sm btn-primary" onclick="editModal(' + guid + ')">Edit</button> ' +
        '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')">Clone</button> ' +
        '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
   
   var obj = {   
        fullname   : firstname.value + lastname.value,
        designation: designation.value,  
        age        : age.value,
        email      : email.value,     
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
    
    var tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }

    newTask.id = guid();
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks(){

    var tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }


    //data not found message with show data from LS
    if (!tasks.length) {
        $('.show-table-info').removeClass('hide');
    } 
    else {
        $('.show-table-info').addClass('hide');
        
        tasks.forEach(function(obj,index){

        var table   = document.querySelector('table tbody');
        newRow      = table.insertRow(table.length);

        cell1 = newRow.insertCell(0);
        cell2 = newRow.insertCell(1);
        cell3 = newRow.insertCell(2);
        cell4 = newRow.insertCell(3);
        cell5 = newRow.insertCell(4);
        cell6 = newRow.insertCell(5);
        cell7 = newRow.insertCell(6);

        cell1.innerHTML = '<input type="checkbox" class="check" id="child">';
        cell2.innerHTML = getTotalRowOfTable();
        cell3.innerHTML = obj.firstname + obj.lastname;
        cell4.innerHTML = obj.designation; 
        cell5.innerHTML = obj.age;
        cell6.innerHTML = obj.email;
         
        var guid = obj.id;  
        cell7.innerHTML = '<button class="btn btn-sm btn-info" style="margin-right:5px" onclick="viewModal('+ guid +');">View</button>' +
        '<button class="btn btn-sm btn-primary" onclick="editModal('+ guid +')" >Edit</button> ' +
        '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')">Clone</button> ' +
        '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';   
    
    });
}
}


function showDeleteModal(id) {
    $('#deleted-member-id').val(id);

    $('#deleteDialog').modal();  
}

function deleteMemberData() {

    var id = deleteId.value;
    var data = localStorage.getItem('tasks');
    var storageUsers = JSON.parse(data);

    var newData = [];

    newData = storageUsers.filter(function (element, index) {
        return element.id != id;
    });

    var data = JSON.stringify(newData);

    localStorage.setItem('tasks', data);
    $("#table").find("tr:not(:first)").remove();
    $('#deleteDialog').modal('hide');
    getTasks();
    
}


//clear form data
function clearForm(){
    document.getElementById("firstname").value = "";
    document.getElementById("lastname").value = "";
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
    document.getElementById("firstname").disabled  = value;
    document.getElementById("lastname").disabled = value;
    document.getElementById("email").disabled = value;
    document.getElementById("age").disabled = value;
    document.getElementById("designation").disabled = value;
  }

function viewModal(id){

    makeFieldDisabled(true);
    alterButtons('none', 'none');

    var tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    
    var member = tasks.find(function (item) {
        return item.id == id;
    })

    firstname.value = member.firstname;
    lastname.value = member.lastname;
    designation.value = member.designation;
    age.value = member.age;
    email.value = member.email;

    
    $('#member-form-modal').modal();
}

function editModal(id){

    var tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    
    var member = tasks.find(function (item) {
        return item.id == id;
    })

    $('#edit_firstname').val(member.firstname);
    $('#edit_lastname').val(member.lastname);
    $('#edit_email').val(member.email);
    $('#edit_age').val(member.age);
    $('#edit_designation').val(member.designation);
    $('#member_id').val(id);
    
    $('#editmodal').modal();
}

function updateInfo(){
    var tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    var id = $('#member_id').val();
    
    var member = tasks.find(function (item) {
        return item.id == id;
    })
    member.firstname = edit_firstname.value ;
    member.lastname = edit_lastname.value;
    member.designation =  edit_designation.value;
    member.age = edit_age.value;
    member.email = edit_email.value;

    var data = JSON.stringify(tasks);
    localStorage.setItem("tasks", data);

    $("#table").find("tr:not(:first)").remove();
    getTasks();
    $('#editmodal').modal('hide')
}

function cloneModal(id){

    var tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    
    var member = tasks.find(function (item) {
        return item.id == id;
    })

    $('#clone_firstname').val(member.firstname);
    $('#clone_lastname').val(member.lastname);
    $('#clone_email').val(member.email);
    $('#clone_age').val(member.age);
    $('#clone_designation').val(member.designation);
    $('#clone_member_id').val(id);
    
    $('#clonemodal').modal();
}

function cloneInfo(){
    var tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    var id = $('#clone_member_id').val();
    
    var table   = document.querySelector('table tbody');
    newRow      = table.insertRow(table.length);
  
  
    cell1 = newRow.insertCell(0);
    cell2 = newRow.insertCell(1);
    cell3 = newRow.insertCell(2);
    cell4 = newRow.insertCell(3);
    cell5 = newRow.insertCell(4);
    cell6 = newRow.insertCell(5);
    cell7 = newRow.insertCell(6);
  
    cell1.innerHTML = '<input type="checkbox" class="check" id="child">';
    cell2.innerHTML = getTotalRowOfTable();
    cell3.innerHTML = clone_firstname.value + clone_lastname.value;
    cell4.innerHTML = clone_designation.value;
    cell5.innerHTML = clone_age.value;
    cell6.innerHTML = clone_email.value;  //$('#age').val(age);

    var guid = id;
   
    cell7.innerHTML ='<button class="btn btn-sm btn-info" style="margin-right:5px" onclick="viewModal('+ guid +');">View</button> ' +
          '<button class="btn btn-sm btn-primary" onclick="editModal(' + guid + ')">Edit</button> ' +
          '<button class="btn btn-sm btn-success" onclick="cloneModal(' + guid + ')">Clone</button> ' +
          '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
     
     var obj = {   
          fullname   : clone_firstname.value + clone_lastname.value,
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
    var data = localStorage.getItem('tasks');
    var storageUsers = JSON.parse(data);
    var newData = [];
    newData = storageUsers.filter(function (element, index) {
        return element.id != id;
    });
    console.log(newData);
    debugger;
   
}
