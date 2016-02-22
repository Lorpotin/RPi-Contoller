$(document).ready(function() {

	var counter = 0;

	var canvas = document.getElementById("picker");
	var ctx = canvas.getContext("2d");

	var image = new Image();
	image.src = "images/lataus1.png";
	image.onload = function() {
		ctx.drawImage(image, 0, 0, image.width, image.height);
	}

	$("#picker").mousemove(function(e) {
		//Get mouse coordinates
		var canvasOffset = $(canvas).offset();
		var canvasX = Math.floor(e.pageX - canvasOffset.left);
		var canvasY = Math.floor(e.pageY - canvasOffset.top);

		//Get current pixel depending on mouse position
		var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
		var pixel = imageData.data;

		//Update interface just to show the values for convenience
		$("#rVal").val(pixel[0]);
		$("#gVal").val(pixel[1]);
		$("#bVal").val(pixel[2]);
		$("#rgbVal").val(pixel[0]+","+pixel[1]+","+pixel[2]);

		var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
		var hex = '#' + ('0000' + dColor.toString(16)).substr(-6);
        $('#hexVal').val(hex);

        if(counter > 15) {
        	sendColorAjax(hex);
        	counter = 0;
        }
        else
        	counter++;
           		
           
	});

	function sendColorAjax(hex) {

		var data = JSON.stringify({
			'hex':hex
		});

		$.ajax({
			url: "http://localhost:8000/server",
			type: "POST",
			contentType:'application/json',
			dataType:'json',
			data: data,
			success: function(data) {
				console.log(data);

			},
			error: function(xhr, status, err) {
				console.log(status, err.toString());
			}

		});


	};




});