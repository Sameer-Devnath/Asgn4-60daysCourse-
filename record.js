// fill in javascript code here

let form = document.querySelector('form');

let tbody = document.querySelector('tbody');

loadlocalstorageData();

form.addEventListener('submit', function(e){
    e.preventDefault();

    let name = document.getElementById('name').value;

    let employeeId = document.getElementById('employeeID').value;

    let department = document.getElementById('department').value;

    let experience = document.getElementById('exp').value;

    let emailAdd = document.getElementById('email').value;

    let mobile = document.getElementById('mbl').value;

    let role = calculateRole(experience);

    let newRow = `
    <tr>
    <td>${name}</td>
    <td>${employeeId}</td>
    <td>${department}</td>
    <td>${experience}</td>
    <td>${emailAdd}</td>
    <td>${mobile}</td>
    <td>${role}</td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
    </tr>
    `
    tbody.innerHTML += newRow;

    savetoLocalStorage();
    form.reset();
})

function calculateRole(experience) {
    if(experience > 5){
        return "Senior";
    }
    else if(experience >=2 && experience <= 5){
        return "Junior";
    }
    else{
        return "Fresher";
    }
}

function deleteRow(row){

    let r = row.closest("tr");
    r.parentNode.removeChild(r);
    savetoLocalStorage();
}

function savetoLocalStorage(){
    let rows = tbody.querySelectorAll("tr");

    const data = [];

    rows.forEach((row) => {
        let rowData = {

            name: row.cells[0].textContent,
            employeeId: row.cells[1].textContent,
            department: row.cells[2].textContent,
            experience: row.cells[3].textContent,
            emailAdd: row.cells[4].textContent,
            mobile: row.cells[5].textContent,
            role: row.cells[6].textContent
        }
        data.push(rowData);
    });

    localStorage.setItem("employeeData",JSON.stringify(data));

}

function loadlocalstorageData(){
    let storeData = JSON.parse(localStorage.getItem("employeeData"));

    storeData.forEach(data => {

        let newRow = `
        <tr>
        <td>${data.name}</td>
        <td>${data.employeeId}</td>
        <td>${data.department}</td>
        <td>${data.experience}</td>
        <td>${data.emailAdd}</td>
        <td>${data.mobile}</td>
        <td>${data.role}</td>
        <td><button onclick="deleteRow(this)">Delete</button></td>
        </tr>
        `
        tbody.innerHTML += newRow;
    })

}