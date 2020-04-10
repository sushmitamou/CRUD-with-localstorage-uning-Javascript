var id = document.getElementById("id");
var firstname = document.getElementById("firstname");
var lastname = document.getElementById("lastname");
var email = document.getElementById("email");
var age = document.getElementById("age");
var designation = document.getElementById("designation");
var tablerows = document.getElementById("tablerows");
var filter = document.getElementById("filter");
var deleteId = document.getElementById("deleted-member-id");
var editId = document.getElementById("member_id");
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
}

function addTask(tableIndex){                  
  var table   = document.querySelector('table tbody');
  newRow      = table.insertRow(table.length);


  cell1 = newRow.insertCell(0);
  cell2 = newRow.insertCell(1);
  cell3 = newRow.insertCell(2);
  cell4 = newRow.insertCell(3);
  cell5 = newRow.insertCell(4);
  cell6 = newRow.insertCell(5);
  cell7 = newRow.insertCell(6);


  cell1.innerHTML = tableIndex;
  cell2.innerHTML = firstname.value;
  cell3.innerHTML = lastname.value;
  cell4.innerHTML = email.value;
  cell5.innerHTML = age.value;
  cell6.innerHTML = designation.value;
  var guid = id;
 
  cell7.innerHTML ='<button class="btn btn-sm btn-default" onclick="viewModal('+ guid +');">View</button> ' +
        '<button class="btn btn-sm btn-primary" onclick="editModal(' + guid + ')">Edit</button> ' +
        '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
   
   var obj = {    
        firstname  : firstname.value,
        lastname   : lastname.value,
        email      : email.value,
        age        : age.value,
        designation: designation.value,       
    };
    
    console.log(obj);
    
    addDataInLocalStorage(obj);
    clearForm();

}

//counting row of table
function getTotalRowOfTable() {
    var table = document.getElementById('table');
    return table.rows.length;
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

        cell1.innerHTML = index + 1;
        cell2.innerHTML = obj.firstname;
        cell3.innerHTML = obj.lastname;
        cell4.innerHTML = obj.email;
        cell5.innerHTML = obj.age;
        cell6.innerHTML = obj.designation;  
        var guid = obj.id;  
        cell7.innerHTML = '<button class="btn btn-sm btn-default" onclick="viewModal('+ guid +');">View</button>' +
        '<button class="btn btn-sm btn-primary" onclick="editModal('+ guid +')" >Edit</button> ' +
        '<button class="btn btn-sm btn-danger" onclick="showDeleteModal(' + guid + ')">Delete</button>';
        
    });
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

// function filterTask(){

//     $("#table").find("tr:not(:first)").remove();

//     var searchKeyword = $('#member_search').val();
//    // var members = getFormattedMembers();

//    var data  = localStorage.getItem('tasks');
//    var tasks = JSON.parse(data);


//     var filteredMembers = tasks.filter(function (item, index) {
//         return item.firstname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//             item.lastname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//             item.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//             item.designation.toLowerCase().includes(searchKeyword.toLowerCase())
//     });

//     if (!filteredMembers.length) {
//         $('.show-table-info').removeClass('hide');
//     } else {
//         $('.show-table-info').addClass('hide');
//     }

//     filteredMembers.forEach(function (item, index) {
//          addTask(item, index + 1);
       
//      })
    
// }


// function filterTask(e){
//     // const text = e.target.value.toLowerCase();

//     //  document.querySelector('tasks').forEach(function(task){
//     //      const item = task.firstChild.textContent;

//     //      if(item.toLowerCase().indexOf(text) != -1){
//     //          task.style.display = 'block';
//     //      }
//     //      else{
//     //          task.style.display = 'none';
//     //      }
//     // });
// }

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
    email.value = member.email;
    age.value = member.age;
    designation.value = member.designation;
    
    $('#member-form-modal').modal();
}

function editModal(id){

    makeFieldDisabled(false);
    alterButtons('none', null);

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
    email.value = member.email;
    age.value = member.age;
    designation.value = member.designation;
    editId.value = id;
    
    $('#member-form-modal').modal();
}

function updateInfo(){
    var tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [] ;
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));  
    }
    var id = editId.value;
    
    var member = tasks.find(function (item) {
        return item.id == id;
    })
    member.firstname = firstname.value ;
    member.lastname = lastname.value;
    member.email = email.value;
    member.age = age.value;
    member.designation =  designation.value;

    var data = JSON.stringify(tasks);
    localStorage.setItem("tasks", data);

    $("#table").find("tr:not(:first)").remove();
    getTasks();
    $('#member-form-modal').modal('hide')
}