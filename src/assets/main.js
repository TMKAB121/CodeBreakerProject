var answer = document.getElementById('answer');
var attempt = document.getElementById('attempt');

function guess() {
	//console.log(answer.value);
    let input = document.getElementById('user-guess').value;
    //add functionality to guess function here
	if(answer.value == undefined || attempt.value == undefined){
		setHiddenFields();
	}
	if(!validateInput(input)){
		return false;
	} else{
		attempt.value += 1;
	}
	if(getResults(input)){
		setMessage('You Win! :)');
		showAnswer(true);
		showReplay();
	} else if (!getResults(input) && attempt.value => 10){
		setMessage('You Lose! :(');
		showAnswer(false);
		showReplay();
	} else {
		setMessage('Incorrect, try again.');
		console.log(attempt.value);
	}
}

//implement new functions here
function setHiddenFields(){
	let random = Math.random() * 10000;
	answer.value = Math.floor(random);
	answer.value = answer.value.toString();
	while(answer.length < 4){
		answer.value = '0' + answer.value;
	}
	attempt.value = 0;
	//console.log(attempt.value);
	//console.log(random);
	//console.log(answer.value);;
}

function setMessage(msg){
	document.getElementById('message').innerHTML = msg;
}

function validateInput(input){
	let a = input.toString();
	if (a.length == 4){
		return true;
	} else{
		setMessage('Guesses must be exactly 4 characters long.');
		return false;
	}
}

var running_results = '';
function getResults(input){
	//console.log(input);
	let res = input.toString();
	let correct_num = 0;
	let running_results = '';
	running_results += '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	for (let i = 0; i<4; i++){
		let int = res[i];
		//console.log(int);
		//console.log(answer.value[i]);
		if (int == answer.value[i]){
			running_results += '<span class="glyphicon glyphicon-ok"></span>';
			correct_num ++;
		} else if (answer.value.includes(int)){
			running_results += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			running_results += '<span class="glyphicon glyphicon-remove"></span>';
		}
	
	}
	running_results += '</div>';
	document.getElementById('results').innerHTML = running_results;
	if (correct_num == 4){
		return true;
	} else {
		return false;
	}
}

function showAnswer(input){
	document.getElementById('code').innerHTML = answer.value;
	if (input == true){
		document.getElementById('code').className += ' success';
	} else {
		document.getElementById('code').className += ' failure';
	}
}

function showReplay(){
	document.getElementById('guessing-div').style.display = 'none';
	document.getElementById('replay-div').style.display = 'block';
}