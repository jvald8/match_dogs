var Name = React.createClass({
	getInitialState: function() {
    	return {data: []};
  	},
  	/*componentDidMount: function() {
  		this.setState({data: this.props.data})
  	},*/
	render: function() {
		return (
			<h3>{this.props.data.res}</h3>
		)
	}
});

var Profile = React.createClass({
	loadCommentsFromServer: function() {
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
    	this.loadCommentsFromServer();
    	setInterval(this.loadCommentsFromServer, this.props.pollInterval);	
  	},
	render: function() {
		return (
			<div className="main-container">

			  	<Name data={this.state.data} />

			  	<img className="prof-image" src="http://photos.petfinder.com/photos/pets/36239820/1/?bust=1473976016&width=300&-pn.jpg" />
			  	
			  	<div className="check-x-container">
			  		<img className="green-check" src="../assets/green-check.png" />
			  		<img className="red-x" src="../assets/red-x.png" />
			  	</div>

		  	</div>
		)
 	}
});

ReactDOM.render(<Profile url="http://localhost:8080/api/getDog/36239820" pollInterval={2000} />, document.getElementById('app'));