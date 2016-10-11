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

	"use strict";

	var Name = React.createClass({
		displayName: "Name",

		getInitialState: function getInitialState() {
			return { data: [] };
		},
		/*componentDidMount: function() {
	 	this.setState({data: this.props.data})
	 },*/
		render: function render() {
			return React.createElement(
				"h3",
				null,
				this.props.data.res
			);
		}
	});

	var Profile = React.createClass({
		displayName: "Profile",

		loadCommentsFromServer: function loadCommentsFromServer() {
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
			this.loadCommentsFromServer();
			setInterval(this.loadCommentsFromServer, this.props.pollInterval);
		},
		render: function render() {
			return React.createElement(
				"div",
				{ className: "main-container" },
				React.createElement(Name, { data: this.state.data }),
				React.createElement("img", { className: "prof-image", src: "http://photos.petfinder.com/photos/pets/36239820/1/?bust=1473976016&width=300&-pn.jpg" }),
				React.createElement(
					"div",
					{ className: "check-x-container" },
					React.createElement("img", { className: "green-check", src: "../assets/green-check.png" }),
					React.createElement("img", { className: "red-x", src: "../assets/red-x.png" })
				)
			);
		}
	});

	ReactDOM.render(React.createElement(Profile, { url: "http://localhost:8080/api/getDog/36239820", pollInterval: 2000 }), document.getElementById('app'));

/***/ }
/******/ ]);