var SumpinNew = SumpinNew || {};

(function() {
  var Photo = React.createClass({displayName: "Photo",
    getInitialState: function() {
      return {
        photoUrl: '/img/placeholder.svg'
      }
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          var randomIndex = Math.floor(Math.random() * (31));
          var photo = data.response.photos.items[randomIndex];
          if (photo) {
            this.setState({
              photoUrl: photo.prefix + '700x700' + photo.suffix
            });
          }
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    render: function() {
      return (
        <img draggable="false" src={this.state.photoUrl} data-venue-id={this.props.venueId} />
      );
    }
  });

  SumpinNew.Photo = Photo;
})();
