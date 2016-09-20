/**
 * 
 */
$(function () {
	$('form').on('submit', function (e) {
		e.preventDefault();
		var data = {
				'username': $('#userNM').val(),
				'password': $('#passWD').val(),
				'mail': $('#mail').val()
		};
		var request = $.ajax({
			method: 'POST',
			dataType: 'JSON',
			data: data,
			url: 'server/register.php',
			complete: function () {
				window.location.href = 'http://localhost/ITtalents/Filesystem/index.html';
			}
		});
	});
});