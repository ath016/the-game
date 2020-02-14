// number table
let table = document.querySelector('table');
// number elements
let numbers = document.querySelectorAll("td");
// number board
let board = document.querySelector('.row');
// list on number board
let lists = document.querySelectorAll('ul');
// focus on specific list
let focusList = undefined;
// tracks moves
let history = [];
// track location
let historyPt = -1;


// toggle play field
function toggleMat() {
	if(table.style.display == 'none') {
		table.style.display = 'table';
		board.style.display = 'none';
	} // end of if
	
	else {
		table.style.display = 'none';
		board.style.display = 'block';
	} // end of else
} // end of toggle play mat

// add last element
function addNumber(list, number) {
	const last = document.createElement('li')
	last.innerText = number;
	last.onclick = (event) => {
		focusList = event.target.parentElement;
		toggleMat();
	};
	list.appendChild(last);
	
	// write history
	history.length = historyPt + 1;
	history.push({list:list, number:number});
	historyPt++;
} // end of add last element

function subtractNumber() {
	// check empty history
	if(historyPt < 0) return;
	// condition number
	numbers[history[historyPt].number - 1].onclick = handleNumber;
	numbers[history[historyPt].number - 1].style.background = '#F29F05';
	// remove list item
	history[historyPt].list.lastChild.remove();
	// descrese history
	historyPt--;
} // subtract number

// handle number
function handleNumber() {
	const listNumber = Number(focusList.lastChild.innerText);
	const tableNumber = Number(this.innerText);
	const direction = focusList.classList[0];
	
	// check valid click
	const bool = Math.abs(listNumber - tableNumber) == 10 ||
				(listNumber < tableNumber && direction == 'ascending') ||
				(listNumber > tableNumber && direction == 'descending')
	
	if(bool && tableNumber != '') {
		addNumber(focusList, this.innerText);
		toggleMat();
		this.onclick = undefined;
		this.style.background = '#591902';
	} // end of if
} // end of handle number

// initialize
function init() {
	// set up table
	table.style.display = 'none';
	numbers.forEach((number) => {
		number.onclick = handleNumber;
	});
	
	// add inital values
	addNumber(lists[0], '1');
	addNumber(lists[1], '1');
	addNumber(lists[2], '100');
	addNumber(lists[3], '100');
	
	// reset history
	history = [];
	historyPt = -1;
} // end of init

// start
init();
