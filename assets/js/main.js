/**
 * 
 */
var array;
var file;
var formData;
var name;
var resp;
var folderParent = null;
$.ajax ({
	dataType: "JSON",
	url:'server/logincheck.php',
	method: "POST",
	success: function (reply){
		if (reply == 'no user') {
			window.location.href = 'http://localhost/ITtalents/Filesystem/index.html';
		}
	}
		
})


$(function() {
	
	// Getting user data
	
	$.ajax({
		url : 'server/userstuff.php',
		dataType : 'JSON',
		method : 'POST',
		success : function(d) {
			array = d;
			// Looping through the array with results and getting the name and
			// the paths for
			// every item
			
			for (var int = 0; int < d.length; int++) {
				var temp = d[int][0].split('.');
				var format = temp[temp.length - 1];
				var fileName = $('<span></span>').text(d[int][0]);
				var fileNametwo = $('<p></p>').text(d[int][0]);
				var formatclass;
				var iconformat;

				switch (format) {
				case 'txt':
					formatclass = "fa fa-file-text-o"
					break;
				case 'jpg':
					formatclass = "fa fa-file-image-o";
					break;
				case 'png':
					formatclass = "fa fa-file-image-o";
					break;
				}
				
				switch (format) {
				case 'txt':
					iconformat = "icon fa fa-file-text-o fa-3x"
					break;
				case 'jpg':
					iconformat = "icon fa fa-file-image-o fa-3x";
					break;
				case 'png':
					iconformat = "icon fa fa-file-image-o fa-3x";
					break;
				}
				
				var icon = $('<i></i>').addClass(formatclass);
				var listNext = $('<li></li>');
	
				listNext.attr('id', 'file_' + int)
				listNext.attr('style','cursor:pointer');
				listNext.attr('format', format);
				listNext.append(icon);
				listNext.append(fileName);
				$('ol').append(listNext);	
				
				var div = $('<div></div>').addClass(iconformat);
				var parent = $('<div></div>').addClass('file');
				parent.attr('id', 'file_' + int+'-' +int)
				parent.attr('style','cursor:pointer');
				parent.append(div);
				parent.append(fileNametwo);
				$('#content').append(parent);
				
				
		}
			var olCount = $('#treealike li');
			var link;
			function generate_handler( j ) {
			    return function(event) { 
			    	link = d[j][1];
					$('#in').css('background', '100% no-repeat url("' +link+'")');
					$('#in').css('background-size','cover');
					$('#in').show()
			    };
			}
			for (var int = 0; int < olCount.length; int++) {
				$('#file_' + int).on('click',generate_handler(int));
				$('#file_' + int + '-' +int).on('click',generate_handler(int));
			}
	}
	});
	// Crate folder infromation 
	$('#folder').submit(function(e){
		e.preventDefault();
		var name = $('#selectfolder').val();
		
		var data = { 'foldername': name, 'parent': folderParent};
		$.ajax ({
			url: 'server/folder.php',
			dataType: 'json',
			method: 'POST',
			data: data,
			success: function (reply){
				if (reply == 'Done'){
					window.location.href = 'http://localhost/ITtalents/Filesystem/main.html';
				}
			}
		})
	});
	
	
	// Add button
	$('#add').on('click', function() {
		$('#uploads').show();
	});
	$('#add').attr('style','cursor:pointer');
	//Logout button
	$('#logout').on('click',function() {
		$.get('server/logout.php');
		window.location.href = 'http://localhost/ITtalents/Filesystem/index.html';
	})
	$('#logout').attr('style','cursor:pointer');
	// Close the upload form
	$('#close').on('click', function() {
		$('#uploads').hide();
	})
	$('#close').attr('style','cursor:pointer');
	//Add a folder
	$('#addfolder').on('click', function () {
		$('#folder').show();
	})
	$('#addfolder').attr('style','cursor:pointer');
	//Close folder form
	$('#closefolder').on('click',function() {
		$('#folder').hide();
	})
	$('#closefolder').attr('style','cursor:pointer');
	//Close display button
	$('#in div').attr('style','cursor:pointer');
	
	$('#in div').on('click', function() {
		$('#in').hide();
	})
	
	// Uploading a file with AJAX
	$('#fileupload').on('submit',function(e) {
		e.preventDefault();
		file = $('#uploadField')[0].files[0];
		formData = new FormData();
		formData.append('upload', file);
			$.ajax({
					url : 'server/uploads.php',
					type : 'POST',
					dataType : 'JSON',
					data : formData,
					contentType : false,
					processData : false,
					success : function(d) {
						if (d == 'You have that already') {
							alert('That file already excists!');
						}
						if (d == 'Done') {
							window.location.href = 'http://localhost/ITtalents/Filesystem/main.html';
						}

					}
				});

	});
});