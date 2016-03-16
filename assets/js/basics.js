Object.defineProperty(window, 'currentUser', {
	get : function () {
		var currentUser = window.sessionStorage.getItem('currentUser');
		return (currentUser) ? JSON.parse(currentUser) : currentUser;
	},
	set : function (currentUser) {
		window.sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
	}
});