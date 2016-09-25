/**
 * 
 */
var array;
var file;
var formData;
var name;
var resp;
var folderParentId = null;
var bigtest;
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
		url : 'server/firstfolder.php',
		dataType : 'JSON',
		method : 'POST',
		success : function(d) {
			array = d;
			// Looping through the array with results and getting the name and
			// the paths for
			// every item
			
			for (var int = 0; int < d.length; int++) {
				var fileName = $('<span></span>').text(d[int][0]);
				var fileNametwo = $('<p></p>').text(d[int][0]);		
				var icon = $('<div></div>').addClass('icon fa fa-folder-o');
				var listNext = $('<li></li>');
				var folderid = d[int][1];
				
				listNext.addClass('icon fa fa-folder-o');
				listNext.attr('id', d[int][0])
				listNext.attr('style','cursor:pointer');
				listNext.attr('type','file');
				listNext.attr('uniqueId',folderid);
				listNext.append(fileName);
				$('ol').append(listNext);	
				
				var div = $('<div></div>').addClass('icon fa fa-folder-o fa-3x');
				var parent = $('<div></div>').addClass('file');
				parent.attr('style','cursor:pointer');
				parent.append(div);
				parent.append(fileNametwo);
				$('#content').append(parent);		
		}
			$('#treealike').on('click','li', function(evt){
				var folderIdStuff;
				if ($(this).attr('done') != 'yes'){
				
					$(this).attr('done', 'yes');	
					event.stopImmediatePropagation()
					var upper = this;
					folderParentId = $(this).attr('uniqueId');
					if($(this).attr('file') == 'file') {
						$(this).attr('class','icon fa fa-folder-open-o');
					}
					
					data = {  'id': folderIdStuff}
					$.ajax({
						method: 'POST',
						data: data,
						url:'server/nfo.php',
						dataType: 'JSON',
						success: function(reply) {
							folderReply = reply;
							$('#content').empty();
							for (var int = 0; int < reply.length; int++) {
								var fileName = $('<span></span>').text(reply[int][0]);
								var icon = $('<div></div>').addClass('icon fa fa-folder-o');
								var listNext = $('<li></li>');
								listNext.addClass('icon fa fa-folder-o');
								listNext.attr('id', reply[int][0])
								listNext.attr('style','cursor:pointer');
								listNext.attr('type','file');
								listNext.append(fileName);
								$(upper).append(listNext);
								
								
								var fileNametwo = $('<p></p>').text(reply[int][0]);
								var div = $('<div></div>').addClass('icon fa fa-folder-o fa-3x');
								var parent = $('<div></div>').addClass('file');
								parent.attr('style','cursor:pointer');
								parent.append(div);
								parent.append(fileNametwo);
								$('#content').append(parent);
								$(parent).click(function(){
									var fileNametwo = $('<p></p>').text(reply[int][0]);
									var div = $('<div></div>').addClass('icon fa fa-folder-o fa-3x');
									var parent = $('<div></div>').addClass('file');
									parent.attr('style','cursor:pointer');
									parent.append(div);
									parent.append(fileNametwo);
								})
									
							}
						}
					});
					$.ajax({
						method: 'POST',
						data: data,
						url:'server/nfo1.php',
						dataType: 'JSON',
						success: function(reply) {
							folderReply = reply;
							for (var int = 0; int < reply.length; int++) {
								var temp = reply[int][0].split('.');
								var format = temp[temp.length - 1];
								var fileName = $('<span></span>').text(reply[int][0]);
								var fileNametwo = $('<p></p>').text(reply[int][0]);
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
								var iconimg = $('<div></div>').addClass(formatclass);
								var listNext = $('<li></li>');
					
								listNext.attr('style','cursor:pointer');
								listNext.attr('src', reply[int][1]);
								listNext.append(iconimg);
								listNext.append(fileName);
								
								$(listNext).click(function(){
									$('#in').css('background', '100% no-repeat url("' +$(this).attr('src')+'")');
									$('#in').css('background-size','cover');
									$('#in').show()
									$(this).attr('class','none');
								})
								$(upper).append(listNext);
								
								var div = $('<div></div>').addClass(iconformat);
								var parent = $('<div></div>').addClass('file');
								parent.attr('style','cursor:pointer');
								parent.attr('src', '"' + reply[int][1] + '"');
								parent.append(div);
								parent.append(fileNametwo);
								$(parent).click(function(){
									bigtest = this;
									$('#in').css('background', '100% no-repeat url(' +$(this).attr('src')+')');
									$('#in').css('background-size','cover');
									$('#in').show()
								})
								$('#content').append(parent);
							}
						}
					});
					evt.stopImmediatePropagation();	
				}
			});
		
		}	
	
	});
	
		// Crate folder infromation 
	$('#folder').submit(function(e){
		var name = $('#selectfolder').val();
		e.preventDefault();
		var data = { 'foldername': name, 'parentid': folderParentId};
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
		$.post('server/logout.php');
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
	//Make escape hide the priview box  escape code= 27
	
	$(window).keyup( function(e) {
	
		if ( e.keyCode == 27) {
			$('#in').hide();
		};
	});
	
	
	
	// Uploading a file with AJAX
	$('#fileupload').on('submit',function(e) {
		e.preventDefault();
		file = $('#uploadField')[0].files[0];
		formData = new FormData();
		formData.append('upload', file);
		formData.append('location', folderParentId);
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