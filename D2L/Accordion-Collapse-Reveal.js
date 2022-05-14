function showContent() {

	for (var i = 0; i < document.getElementsByClassName('collapse').length; i++) {
		console.log(document.getElementsByClassName('collapse')[i]);
		document.getElementsByClassName('collapse')[i].classList.add('show');
		document.getElementsByClassName('btn btn-link')[i].setAttribute('aria-expanded', 'true');
	}

};



function hideContent {

	for (var i = 0; i < document.getElementsByClassName('collapse').length; i++) {
		console.log(document.getElementsByClassName('collapse')[i]);
		document.getElementsByClassName('collapse')[i].classList.remove('show');
		document.getElementsByClassName('btn btn-link')[i].setAttribute('aria-expanded', 'false');
	}
};


