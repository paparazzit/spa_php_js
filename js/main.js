let mainTbody = document.querySelector("#mainTbody");
let editTbody = document.querySelector("#editTbody");
let allViews = document.querySelectorAll("section.view");
let editAccountForm = document.querySelector("#edit_acc_form");
let edit_form_wrapper = document.querySelector("#edit_form_wrapper");
// BUTTONS
let buttons = document.querySelectorAll(".btn_view");
let saveAcc = document.querySelector("#saveAcc");

// INPUTS
let nameInput = document.querySelector('input[name="name"]');
let depositInput = document.querySelector('input[name="deposit"]');
let cCardInput = document.querySelector('input[name="credit_card"]');

// DATA
let accounts = {};
// let accounts = {};

buttons.forEach((btn) => {
	btn.addEventListener("click", prikazi);
});

saveAcc.addEventListener("click", addNewAccount);

function prikazi(e) {
	let currentView = e.target.getAttribute("data-view");

	for (let i = 0; i < allViews.length; i++) {
		allViews[i].style.display = "none";
		if (allViews[i].id === currentView) {
			allViews[i].style.display = "block";
		}
	}
	if (currentView === "edit_delete_view") {
		editTable();
	}
}

function displayControl(currentView) {
	for (let i = 0; i < allViews.length; i++) {
		allViews[i].style.display = "none";
		if (allViews[i].id === currentView) {
			allViews[i].style.display = "block";
		}
	}
}

createTable();

function createTable() {
	let xml = new XMLHttpRequest();

	xml.open("GET", "backend/getAllAccounts.php");
	xml.onreadystatechange = function () {
		if (xml.readyState === 4 && xml.status === 200) {
			accounts = JSON.parse(xml.responseText);
			let text = ``;
			accounts.forEach((account) => {
				text += `
            <tr>
            <td>${account.name}</td>
            <td>${account.deposit}</td>
            <td>${account.credit_card}</td>
            </tr>
                `.trim();
			});
			mainTbody.innerHTML = text;
		}
	};
	xml.send();
}

function editTable() {
	let text = ``;
	accounts.forEach((account) => {
		text += `
        <tr data-id="${account.id}">
            <td>${account.name}</td>
            <td>${account.deposit}</td>
            <td>${account.credit_card}</td>
            <td> <button class="btn btn-warning btn-sm edit_btn" data-edit="${account.id}"  >edit</button></td>
            <td><a href="backend/deleteAccount.php?id=${account.id}" class="btn btn-danger btn-sm delete_btn" id="${account.id}">Delete</a> </td>
            </tr>
                `.trim();
	});
	editTbody.innerHTML = text;
	let delete_btns = document.querySelectorAll(".delete_btn");
	let edit_btns = document.querySelectorAll(".edit_btn");

	// edit btns
	edit_btns.forEach((edit_btn, index) => {
		edit_btn.addEventListener("click", () => {
			let currencAccount = accounts[index];
			let text = ``;

			displayControl("edit_acc_form");
			text += `
			    <input type ="hidden" value = "${currencAccount.id}"/>
			    <input type="text" id="editNameinput" value ="${currencAccount.name}" name ="name"  class="form-control"/> <br>
			    <input type="text" id="editDepositinput" value ="${currencAccount.deposit}" name ="deposit"  class="form-control"/> <br>
			    <input type="text" id="editCcardinput" value ="${currencAccount.credit_card}" name ="credit_card" class="form-control" /> <br>
			    <button class="btn btn-primary form-control" id="updateAcc">
							Save
						</button>
			    `;
			edit_form_wrapper.innerHTML = text;
			let updateAcc = document.querySelector("#updateAcc");
			updateAcc.addEventListener("click", () => {
				let nameUpdate = document.querySelector("#editNameinput");
				let depositUpdate = document.querySelector("#editDepositinput");
				let credit_card_Update = document.querySelector("#editCcardinput");

				let name = nameUpdate.value;
				let id = currencAccount.id;
				let deposit = depositUpdate.value;
				let credit_card = credit_card_Update.value;

				let fd = new FormData();
				fd.append("name", name);
				fd.append("id", id);
				fd.append("deposit", deposit);
				fd.append("credit_card", credit_card);

				xml = new XMLHttpRequest();
				xml.open("POST", "backend/editAccount.php");
				xml.onreadystatechange = function () {
					createTable();
					displayControl("mainView");
				};
				xml.send(fd);
			});
		});
	});
	// DELETE BTNS
	delete_btns.forEach((delete_btn, index) => {
		delete_btn.addEventListener("click", (e) => {
			e.preventDefault();
			let accountname = accounts[index].name;
			let potvrdi = confirm("Delete this account?: " + accountname);
			if (potvrdi) {
				location.href = e.target.getAttribute("href");
			}
		});
	});
}

function addNewAccount() {
	let name = nameInput.value;
	let deposit = depositInput.value;
	let credit_card = cCardInput.value;
	let fd = new FormData();

	fd.append("name", name);
	fd.append("deposit", deposit);
	fd.append("credit_card", credit_card);

	let xml = new XMLHttpRequest();
	xml.open("POST", "backend/saveAccount.php");
	xml.onreadystatechange = function () {
		if (xml.readyState === 4 && xml.status === 200) {
			if (xml.responseText === "OK") {
				createTable();
				allViews[0].style.display = "block";
				allViews[1].style.display = "none";
			}
		}
	};
	xml.send(fd);
}
