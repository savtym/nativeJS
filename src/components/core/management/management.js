export class Management {
	
	constructor(Native) {
		console.log('Management create!');
		this.counter = 1;
		Native.component('current-alerts', '/components/core/management/current-alerts/current-alerts.html');
	}


	func() {
		console.log(this.counter++);
	}
}
