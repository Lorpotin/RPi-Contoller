var React = require('react');

var HomeScreen = React.createClass({

	render: function() {
		return (
			<div id="container"></div>
		);
	},

	componentDidMount: function() {
		this.tick();
		this.timer = setInterval(this.tick, 3000);
	},
	componentWillUnmount: function() {
		clearInterval(this.timer);
	},

	tick: function() {
		let $this = this,
			content = [];
		$.ajax({
			url: "http://192.168.0.193:8000/temp",
			type: "GET",
			contentType:'application/json',
			dataType:'json',
			success: function(data) {
				var t = new Date( data.date );

				React.render(
				<div className="bs-component container-orders">
				<section>
                   <div id="tempdate" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<h1>{t.toTimeString().split('G')[0]}</h1>
                   </div>
                   <div id="tempdate" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<h1>Cpu {data.cputemp}&deg;C</h1>
                   </div>
                  
                   
                   <div id="tempdate" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<h1>Gpu {data.gputemp.split('=')[1].split("'C")[0]}&deg;C</h1>
                   </div>
                  
                </section>
                </div>,
				document.getElementById('container')

			);
				
				
			},
			error: function(xhr, status, err) {
				React.render(
				<div className="bs-component container-orders">
				<section>
                   <div id="tempdate" className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<h1>Error connecting to server.</h1>
                   </div>
                   
                </section>
                </div>,
				document.getElementById('container')
				);
			}

		});
	}


	
});

module.exports = HomeScreen;