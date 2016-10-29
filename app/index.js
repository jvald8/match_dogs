var CheckContainer = React.createClass({
	getDefaultProps: function() {
  	    return {
  	    	dog: {Id: ''} 
  	    };
  	},
 	handleCheck: function() {
 		console.log(this.props.dogId);

 		$.ajax({
 			type: "POST",
 			url: `http://localhost:8080/api/yesDog/${this.props.dogId}`,
 			dataType: 'json',
 			cache: false,
 			success: function(data) {
 				console.log({message: 'successfully posted human-dog relation'})
 			},
 			error: function(xhr, status, err) {
 				console.error({message: 'did not successfully post human-dog relation'})
 			}
 		});

 	},
	render: function() {
		return (
			<div className="check-x-container">
		  		<img className="green-check" src="../assets/green-check.png" onClick={this.handleCheck} />
		  		<img className="red-x" src="../assets/red-x.png" />
		  	</div>
		)
	}
});

var Name = React.createClass({
	getDefaultProps: function() {
  	    return {
  	    	dog: {name: ''} 
  	    };
  	},
	render: function() {
		return (
			<h3>{this.props.dogName}</h3>
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
		//console.log(this.props.dog.media.photos[1].pn);
		return (
			<img className="prof-image" src={this.props.dogPhoto} />
		)
	}
});

var Profile = React.createClass({
	loadDogsFromServer: function() {
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
    	this.loadDogsFromServer();
    	setInterval(this.loadDogsFromServer, this.props.pollInterval);	
  	},
	render: function() {
		console.log(this.state.data);
		var dogs = this.state.data.res || [];
		var dogList = dogs.map(function(dog) {
			return (
				<div className="main-container" >

					<Name dogName={dog.name} />

					<ProfileImage dogPhoto={dog.media.photos[1].pn} />

					<CheckContainer dogId={dog.id} />

				</div>
			)
		});

		return <div>{dogList}</div>
 	}
});

ReactDOM.render(<Profile url="http://localhost:8080/api/getDogs" pollInterval={200000} />, document.getElementById('app'));

