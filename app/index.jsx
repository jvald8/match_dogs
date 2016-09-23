require("./style.css");
document.write(require("./content.js"));

/*var CommentBox = React.createClass({
  render: function() {
    return (
      <p>sdjhfbsdjf</p>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);*/

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);
