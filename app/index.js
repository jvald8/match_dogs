var Name = React.createClass({
	getDefaultProps: function() {
  	    return {
  	    	dog: {name: ''} 
  	    };
  	},
	render: function() {
		//console.log(this.props.dog);
		return (
			<h3>{this.props.dog.name}</h3>
		)
	}
});

var ProfileImage = React.createClass({
	getDefaultProps: function() {
  	    return {
  	    	dog: {media: {photos: [null, {status:'Loading'}]}} 
  	    };
  	},
	render: function() {
		console.log(this.props.dog.media.photos[1].pn);
		return (
			<img className="prof-image" src={this.props.dog.media.photos[1].pn} />
		)
	}
});

var Profile = React.createClass({
	loadDogFromServer: function() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
 	},
	getInitialState: function() {
    	return {data: []};
  	},
  	componentDidMount: function() {
    	this.loadDogFromServer();
    	setInterval(this.loadDogFromServer, this.props.pollInterval);	
  	},
	render: function() {
		return (
			<div className="main-container">

			  	<Name dog={this.state.data.res} />

			  	<ProfileImage dog={this.state.data.res} />
			  	
			  	<div className="check-x-container">
			  		<img className="green-check" src="../assets/green-check.png" />
			  		<img className="red-x" src="../assets/red-x.png" />
			  	</div>

		  	</div>
		)
 	}
});



ReactDOM.render(<Profile url="http://localhost:8080/api/getDog/36239820" pollInterval={2000} />, document.getElementById('app'));