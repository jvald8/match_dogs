/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var Name = React.createClass({
		displayName: 'Name',

		getDefaultProps: function getDefaultProps() {
			return {
				dog: { name: '' }
			};
		},
		render: function render() {
			return React.createElement(
				'h3',
				null,
				this.props.dog.name
			);
		}
	});

	var ProfileImage = React.createClass({
		displayName: 'ProfileImage',

		getDefaultProps: function getDefaultProps() {
			return {
				dog: { media: { photos: [null, { status: 'Loading' }] } }
			};
		},
		render: function render() {
			console.log(this.props.dog.media.photos[1].pn);
			return React.createElement('img', { className: 'prof-image', src: this.props.dog.media.photos[1].pn });
		}
	});

	var Profile = React.createClass({
		displayName: 'Profile',

		loadDogFromServer: function loadDogFromServer() {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: (function (data) {
					this.setState({ data: data });
				}).bind(this),
				error: (function (xhr, status, err) {
					console.error(this.props.url, status, err.toString());
				}).bind(this)
			});
		},
		getInitialState: function getInitialState() {
			return { data: [] };
		},
		componentDidMount: function componentDidMount() {
			this.loadDogFromServer();
			setInterval(this.loadDogFromServer, this.props.pollInterval);
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'main-container' },
				React.createElement(Name, { dog: this.state.data.res }),
				React.createElement(ProfileImage, { dog: this.state.data.res }),
				React.createElement(
					'div',
					{ className: 'check-x-container' },
					React.createElement('img', { className: 'green-check', src: '../assets/green-check.png' }),
					React.createElement('img', { className: 'red-x', src: '../assets/red-x.png' })
				)
			);
		}
	});

	ReactDOM.render(React.createElement(Profile, { url: 'http://localhost:8080/api/getDog/36239820', pollInterval: 2000 }), document.getElementById('app'));

/***/ }
/******/ ]);