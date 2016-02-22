var React = require('react');

var LedScreen = React.createClass({
	
	
	showStuff: function() {
		let $this = this;
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
			$("#rVal").text(pixel[0]);
			$("#gVal").text(pixel[1]);
			$("#bVal").text(pixel[2]);
			$("#rgbVal").text(pixel[0]+","+pixel[1]+","+pixel[2]);

			var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
			var hex = '#' + ('0000' + dColor.toString(16)).substr(-6);
	        $('#hexVal').text(hex);

	        if(counter > 15) {
	        	$this.sendColorAjax(hex);
	        	counter = 0;
	        }
	        else
	        	counter++;
	           		
	           
		});
		$( window ).resize(function() {
			if(window.innerWidth < 410) {
				var canvas = document.getElementById("picker");
				var ctx = canvas.getContext("2d");
				ctx.drawImage(image, 0, 0, 200, 200);

			}
		});
	},
	sendColorAjax: function(hex) {
		var data = JSON.stringify({
			'hex':hex
		});

		$.ajax({
			url: "http://192.168.0.193:8000/hex",
			type: "POST",
			contentType:'application/json',
			dataType:'json',
			data: data,
			success: function(data) {

			},
			error: function(xhr, status, err) {
				console.log(status, err.toString());
			}

		});
	},
	componentDidMount: function() {
		let $this = this;
		React.render(
			<div className="well bs-component">
				<section>
			        <div className="container">
			            <div className="colorpicker row">
			                <div className="col-md-2">
			                </div>
			                <div className="col-md-4">
			                    <canvas id="picker" width="269" height="269"></canvas>
			                </div>
			                <div className="table-responsive-vertical col-md-4">
			                    <table className="table">
	              					<thead>
	                					<tr className="show-grid header-grid">
						                    <th id="table-temp" data-field="Green">Green</th>
						                    <th id="table-temp" data-field="Blue">Blue</th>
						                    <th id="table-temp" data-field="Red">Red</th>
						                    <th id="table-temp" data-field="Hex">Hex</th>
					                	</tr>
					                </thead>
					                <tbody>
						                <tr>
						                    <td id="rVal"></td>
						                    <td id="gVal"></td>
						                    <td id="bVal"></td>
						                    <td id="hexVal"></td>
						                </tr>
					                </tbody>
            					</table>
			                </div>
			            </div>
			        </div>
			    </section>
			</div>,
				document.getElementById('ledContainer')

				);
		$this.showStuff();
	},
	

		

	render: function() {
		return (
			<div id="ledContainer"></div>
		);
	}

	
});

module.exports = LedScreen;