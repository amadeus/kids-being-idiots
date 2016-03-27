(function(){

function Idiots(){
	this.idiot = document.createElement('div');
	this.idiot.className = 'idiot';
	document.body.appendChild(this.idiot);

	if (this.touch) {
		document.body.className += ' touch';
	}

	// We only need to do this once...
	this.request = new window.XMLHttpRequest();
	this.request.addEventListener(
		'readystatechange',
		this._handleReadyStateChange.bind(this)
	);
	this.request.open('POST', '/idiots', true);
	this.request.setRequestHeader('Accept', 'application/json');
	this.request.setRequestHeader('Content-Type', 'application/json');
	this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	this.request.send();
}

Idiots.prototype = {

	touch: ('ontouchend' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch) ?  true : false,

	getRandomInt: function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	getRandomIdiot: function(){
		var index = this.getRandomInt(0, this.idiots.length),
			idiot = this.idiots.splice(index, 1)[0];
		this._idiots.push(idiot);
		if (this.idiots.length === 0) {
			this.idiots = this._idiots;
			this._idiots = [];
		}
		return idiot;
	},

	_handleReadyStateChange: function(){
		if (this.request.readyState !== 4) {
			return;
		}
		this.idiots = JSON.parse(this.request.responseText);
		this._idiots = [];
		if (!this.idiots.length) {
			return;
		}
		if (this.touch) {
			document.body.addEventListener(
				'touchend',
				this.showIdiot.bind(this),
				false
			);
		} else {
			document.body.addEventListener(
				'keyup',
				this._handleKeyUp.bind(this),
				false
			);
		}
		this.showIdiot();
	},

	showIdiot: function(){
		var newIdiot = this.getRandomIdiot();
		this.currentIdiot = newIdiot;
		this.idiot.style.backgroundImage = 'url(' + this.currentIdiot + ')';
	},

	_handleKeyUp: function(event){
		if (event.keyCode === 70) {
			this.toggleFullscreen();
			return;
		}
		if (event.keyCode === 32) {
			this.showIdiot();
			return;
		}
	},

	toggleFullscreen: function(){
		if (this.idiot.className === 'idiot actual-size') {
			this.idiot.className = 'idiot';
		} else {
			this.idiot.className = 'idiot actual-size';
		}
	}
};

new Idiots();

})();
