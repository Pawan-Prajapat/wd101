let userForm = document.getElementById("user-form");
// // retrive entryies from local web storeage

const retriveEntries = () =>{
        let entries = localStorage.getItem("user-entries");
        if(entries){
                entries = JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
}


let userEntries=retriveEntries();


const displayEntries=()=>{
    const entries = retriveEntries();
    const tableEntries = entries.map((entry)=>{
        const nameCell = `<td >${entry.name}</td>`;
        const emailCell = `<td >${entry.email}</td>`;
        const passwordCell = `<td >${entry.password}</td>`;
        const dobCell = `<td class=>${entry.dob}</td>`;
        const acceptTermsCell = `<td >${entry.acceptedTermsAndconditions}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");
    const table = `<table class="table-auto w-full"><tr>
    <th >Name</th>
    <th>Email</th>
    <th >Password</th>
    <th >dob</th>
    <th>accepted terms?</th>
    </tr>${tableEntries}</table>`;
    
    let details = document.getElementById("user-entries");
    details.innerHTML=table;
}





// Save details 
const saveUserForm = (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        const dobInput = document.getElementById("dob");
        dobInput.setCustomValidity("Age must be between 18 and 55 years old.");
        dobInput.reportValidity()
        return; 
    }
    const entry={
        name,
        email,
        password,
        dob,
        acceptedTermsAndconditions
    };
    userEntries.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(userEntries));
    displayEntries();
}
userForm.addEventListener("submit",saveUserForm);
displayEntries();

