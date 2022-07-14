// Im not using it in the code but if there were more elements it would be better to have them grouped here
const elements = {
	tbody: () => document.querySelector("tbody"),
	terms: () => document.getElementById("terms-error"),
};

function onFormSubmit(event, form) {
	// To stop the page from refreshing since thats the default behavior when a form is submitted
	event.preventDefault();

	const { day, date, timeStart, timeEnd, topic, draft, terms } = form;

	const data = {
		date: date.value,
		timeStart: timeStart.value,
		timeEnd: timeEnd.value,
		topic: topic.value,
	};

	// Check for errors
	let error = false;
	Object.entries(data).map(([key, value]) => {
		if (value === "") {
			form[key].classList.add("error");
			form[key].classList.remove("good");
			error = true;
			console.log(value);
		}
	});

	if (!terms.checked) {
		error = true;
		document.getElementById("terms-error").removeAttribute("hidden");
	}

	// So it does not append an empty string
	if (error) return;

	// Select Table Body
	const tbody = document.querySelector("tbody");

	// Create Table Row
	const tr = document.createElement("tr");

	// Iterate through the data object
	Object.entries(data).map(([key, value]) => {
		// Create Table Data (Column)
		const td = document.createElement("td");

		if (key === "date") {
			const tds = elements.tbody().querySelectorAll("td");

			/*
			let skipTdDate = false;

			// Iterate through all the table data elements
			for (const [num, td] of tds.entries()) {
				// Check if their textContent === to the one passed from the form
				if (checkForEqualDates(td, value)) {
					// If so increase the rowspan so the new table data goes to the same date
					td.rowSpan += 1;

					// Set this to true
					skipTdDate = true;
				}
			}

			if (skipTdDate) {
				td.remove();
			} else {
				td.innerHTML = `${day.value} <br> <b>${changeDateFormat(
					value
				)}</b>`;
			}

			*/

			td.innerHTML = `${day.value} <br> <b>${changeDateFormat(
				value
			)}</b>`;
		} else {
			// Set Table Data (Column)
			td.textContent = value;
			// I am not using .innerHTML here because it is dangerous since the user can write something that could break the app
		}

		// Append Table Data (Column) to Table Row
		tr.appendChild(td);
	});

	// Append Table Row to Table Body
	tbody.appendChild(tr);

	// Clear Inputs
	form.reset();
	// document.querySelector("form").reset();
}

/*
function checkForEqualDates(td, value) {
	return td.textContent
		.split(" ")
		.find((date) => date === changeDateFormat(value));
}
*/

function changeDateFormat(date) {
	const [year, month, day] = date.split("-");
	return `${day}.${month}.${year}`;
}

function onInputChange(event) {
	if (event.target.type === "checkbox") {
		document.getElementById("terms-error").setAttribute("hidden", "hidden");
	} else {
		event.target.classList.add("good");
	}
}