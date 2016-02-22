
var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	DefaultRoute = Router.DefaultRoute,
	RouteHandler = Router.RouteHandler,
	Navigation = Router.Navigation,
	Link = Router.Link;

import browserHistory from 'react-router';

var pageName;

require('react-bootstrap');
require('../client/css/custom.css');


var LedScreen = require('./LedScreen.jsx');
var	HomeScreen = require('./HomeScreen.jsx');
var TopNav = require('./TopNav.jsx');

var App = React.createClass({

	mixins: [Router.State, Navigation],

	handleMenu : function() {
		window._router.transitionTo('/');
	},
	navigateLed: function() {
		this.transitionTo('Led');
	},

	render: function () {
		let $this = this;

		pageName = this.getRoutes()[1].name || this.getParams().id;
		window.scrollTo(0, 1);
			

		return (
			<div className="page-container bs-container">
				<TopNav pageName={pageName} />
				<div className="bs-container jumbotron">
					<RouteHandler/>
				</div>
				<footer>
					<nav className="navbar">
						<div>
							<button className="btn-flat" onClick={this.navigateLed}>
								<i className="material-icons">invert_colors</i>
							</button>
							<button className="btn-flat" onClick={this.handleMenu}>
								<i className="material-icons">settings</i>
							</button>
		            	</div>
					</nav>
				</footer>
			</div>
		);
	}

});

var routes = (
	<Route name="app" path="/app" handler={App}>
		<Route name="Led" path="/led" handler={LedScreen}/>
	<Route name="Home" path="/" handler={HomeScreen}/>

	</Route>


);

window._prevPath = [];
window._router = Router.run(routes, function(Handler, state) {
	React.render(<Handler />, document.getElementById("body"));
	window._prevPath.push(state.path);
});