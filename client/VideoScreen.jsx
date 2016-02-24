var React = require('react');

var VideoScreen = React.createClass({

	render: function() {
		return (
			<div id="vidContainer"></div>
		);
	},
	componentDidUpdate: function() {
		
		this.showData();
	},

	componentDidMount: function() {
		this.showData();
	},

	showData: function() {
		let $this = this,
				vd_data,
				ajaxes = [],
				content = [],
				promise;

		ajaxes[0] = Promise.resolve($.ajax({
			url: 'http://192.168.0.193:8000/files',
			contentType:'application/json',
			dataType:'json',
			type:'GET'

		})).then((data) => {
			vd_data = data;
		});

		promise = Promise.all(ajaxes).then(() => {
			for(var i = 0; i < vd_data.length; i++) {
				content.push(
					<a className="waves-effect waves-light btn-large" href={`http://192.168.0.193:8000/video/${vd_data[i].data}`}><i className="material-icons right">cloud</i>{vd_data[i].data}</a>		  
				);
			}
			
			console.log(content);

			React.render(
				<div className="bs-component">
					<section>
						<div id="tempdate" className="center-block col-lg-12 col-md-12 col-sm-12 col-xs-12">
			            	{content}
					    </div>
					</section>

				</div>, document.getElementById('vidContainer'));
		});
	}



});

module.exports = VideoScreen;