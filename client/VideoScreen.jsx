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

	changeSrc: function(data) {
		var srtData = "http://192.168.0.193:8000/video/"+data+".vtt";
		data = "http://192.168.0.193:8000/video/"+data;
		$("#video").remove();
		var html = "<video id='video' controls preload='metadata'><source src='" + data + "'type=video/mp4></source><track id='track' src='"+srtData+"' kind='subtitle' srclang='en-US' label='English' /></video>";
		$(html).hide().appendTo("#videoDiv").fadeIn(1500)
	
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
					<a id="videoBtn" name={vd_data[i].data} onClick={this.changeSrc.bind(null, vd_data[i].data)} className="waves-effect waves-light btn-large"><i className="material-icons right">play_arrow</i>{vd_data[i].data.split(".mp4")[0]}</a>		  
				);
			}
			
			React.render(
				<div className="bs-component">
					<section>
						<div id="tempdate" className="center-block col-lg-12 col-md-12 col-sm-12 col-xs-6">
			            	{content}
					    </div>
					</section>
					<section>
						<div id="videoDiv" className="center center-block col-lg-12 col-md-12 col-sm-12 col-xs-6">
							
	
						</div>
					</section>
				</div>, document.getElementById('vidContainer'));

		});
	}



});

module.exports = VideoScreen;