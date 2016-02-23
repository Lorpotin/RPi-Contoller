
var React = require('react');

var values = require("./calcs.js");

var counter = 0;





var LedScreen = React.createClass({
	
	
	showStuff: function() {
		let $this = this;
		Draggable.create("#knob", 
			{ type: "rotation", throwProps: true, dragResistance : 0, edgeResistance : 5,
			onDrag: function() {
				if(counter > 7) {
					var x = Math.abs( ((this.rotation / 360) % 1.00));
					x = Math.round(x * 100) / 100;
					console.log(x);
					$('#hexVal').text(values.values[x]);
					$('#color-pic').css("background-color", values.values[x]);
					$this.sendColorAjax(values.values[x]);
					x = null;
					counter = 0;
				}
				else
					counter++;
				
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
			            <div id="tempheader" className="row">
			            	<div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"></div>
			                <div className="table-responsive-vertical col-lg-8 col-md-8 col-sm-8 col-xs-8">
			                    <table className="table centered">
	              					<thead>
	                					<tr className="show-grid header-grid">
						                    <th id="table-temp" data-field="Hex">Hex</th>
						                    <th id="table-temp" data-field="color">Color</th>
					                	</tr>
					                </thead>
					                <tbody>
						                <tr>
						                    <td id="hexVal">#FFFFF</td>
						                    <td id="color"><img id="color-pic" width="70" height="40" src="images/blank.png"></img></td>
						                </tr>
						               
					                </tbody>
            					</table>
			                </div>
			            </div>
			        </div>
			        <div className="container">
		                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
		                	<image id="wheel" className="center-block img-responsive" src="images/wheel.png"/>
		                    <image id="knob" className="center-block img-responsive" src="images/knob.png"/>
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