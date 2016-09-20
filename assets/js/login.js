/**
 * 
 */
$.ajax ({
	url: 'server/logincheck.php',
	method: 'POST',
	dataType: 'JSON',
	success: function(reply) {
		if (reply == 'there is a user') {
		window.location.href = 'http://localhost/ITtalents/Filesystem/main.html';
		}
	}
})

$(function () {
	$('form').on('submit', function (e) {
		e.preventDefault();
		var data = {
				'username': $('#userNM').val(),
				'password': $('#passWD').val(),
		};
		var request = $.ajax({
			method: 'POST',
			dataType: 'JSON',
			data: data,
			url: 'server/login.php'
			
		}).then(function (d) {
			
			if (d == 'success'){
				window.location.href = 'http://localhost/ITtalents/Filesystem/main.html';
				
			} else {
				alert('Invalid username/password combination');
			}
			});
		
	});
});