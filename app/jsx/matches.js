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
          <li><a target="_blank" href={"https://foursquare.com/v/" + venue.id}>{venue.name}</a></li>
        );
      }.bind(this));
      return (
        <div>
          <button className="count-btn" onClick={this.toggleMatches}>{this.state.interestingVenues.length}</button>
          <ul>
            <li>{ matchNodes }</li>
            <li><button className="remove-all-btn" onClick={this.removeAllMatches}>Remove all</button></li>
          </ul>
        </div>
      );
    }
  });

  SumpinNew.Matches = Matches;
})();
