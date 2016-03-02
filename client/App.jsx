
var React = require('react'),
	Router = require('react-router'),
	Route = Router.Route,
	Redirect = Router.Redirect,
	DefaultRoute = Router.DefaultRoute,
	RouteHandler = Router.RouteHandler,
	Navigation = Router.Navigation,
	NotFoundRoute = Router.NotFoundRoute,
	Link = Router.Link;

import browserHistory from 'react-router';

var pageName;

require('react-bootstrap');
require('../client/css/custom.css');


var LedScreen = require('./LedScreen.jsx');
var	HomeScreen = require('./HomeScreen.jsx');
var VideoScreen = require('./VideoScreen.jsx');
var TopNav = require('./TopNav.jsx');
var NotFound = require('./NotFound.jsx');


var App = React.createClass({


	mixins: [Router.State, Navigation],

	handleMenu : function() {
		window._router.transitionTo('Home');
	},
	navigateLed: function() {
		this.transitionTo('Led');
				
	},
	navigateVid: function() {
		this.transitionTo('Video');
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
							<button className="btn-flat" onClick={this.navigateVid}>
								<i className="material-icons">video_library</i>
							</button>
		            	</div>
					</nav>
				</footer>
			</div>
		);
	}

});

const routes = (
	<Route name="app" path="/" handler={App}>
		<Redirect from="/" to="home" />
		<Route name="Led" path="/led" handler={LedScreen}/>
		<Route name="Video" path="/video" handler={VideoScreen}/>
		<Route name="Home" path="/home" handler={HomeScreen}/>
		<NotFoundRoute name="404" handler={NotFound}/>
	</Route>


);

window._prevPath = [];
window._router = Router.run(routes, function(Handler, state) {
	React.render(<Handler />, document.getElementById("body"));
	window._prevPath.push(state.path);
});