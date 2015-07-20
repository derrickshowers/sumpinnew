var SumpinNew = SumpinNew || {};

(function() {
  var timer;

  var Matches = React.createClass({displayName: "Matches",
    getInitialState: function() {
      return {
        interestingVenues: []
      }
    },
    componentDidMount: function() {
      this.checkLocalStorage();
      window.setInterval(this.checkLocalStorage, 5000);
    },
    checkLocalStorage: function() {
      this.setState({
        interestingVenues: JSON.parse(localStorage.getItem('interestingVenues')) || []
      });
    },
    toggleMatches: function() {
      $('#matches ul').toggleClass('active');
      this.forceUpdate();
    },
    removeAllMatches: function() {
      this.setState({
        interestingVenues: []
      });
      localStorage.removeItem('interestingVenues');
      this.toggleMatches();
    },
    preventTap: function(e) {
      e.preventDefault();
    },
    render: function() {
      var matchNodes = this.state.interestingVenues.map(function(venue) {
        return (
          React.createElement("li", null, React.createElement("a", {target: "_blank", href: "https://foursquare.com/v/" + venue.id}, venue.name))
        );
      }.bind(this));
      return (
        React.createElement("div", null, 
          React.createElement("button", {className: "count-btn", onClick: this.toggleMatches}, this.state.interestingVenues.length), 
          React.createElement("ul", null, 
            React.createElement("li", null,  matchNodes ), 
            React.createElement("li", null, React.createElement("button", {className: "remove-all-btn", onClick: this.removeAllMatches}, "Remove all"))
          )
        )
      );
    }
  });

  SumpinNew.Matches = Matches;
})();
