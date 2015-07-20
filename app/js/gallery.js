var SumpinNew = SumpinNew || {};

(function() {
  var hammertime,
      direction;

  var Gallery = React.createClass({displayName: "Gallery",
    getInitialState: function() {
      return {
        venues: [],
        interestingVenues: []
      }
    },
    fixHeight: function() {
      $('.gallery-view').each(function() {
        var $this = $(this);
        $this.height($this.children().first().height());
      });

      // maybe this doesn't realy belong here, but we need this for when the
      // recommendations are finished.
      $('.progress-text p').text('Uh oh. That\'s it for now. Check back later.');
    },
    looksLikeYes: function() {
      $('.yes-symbol').addClass('active');
      $('.no-symbol').removeClass('active');
    },
    looksLikeNo: function() {
      $('.no-symbol').addClass('active');
      $('.yes-symbol').removeClass('active');
    },
    moveToNext: function() {
      $('.gallery-view ul li').last().remove();
      $('.no-symbol').removeClass('active');
      $('.yes-symbol').removeClass('active');

      // check if there are any left
      if (!$('.gallery-view ul li').length) {
        hammertime.destroy();
      }
    },
    dragBegan: function(e) {
      direction;
      if (e.isFinal && direction) {
        if (direction === Hammer.DIRECTION_RIGHT) {
          this.recHasBeenVoted();
          this.moveToNext();
        } else {
          this.moveToNext();
        }
        return;
      } else {
        $('.no-symbol').removeClass('active');
        $('.yes-symbol').removeClass('active');
      }
      if (e.direction === Hammer.DIRECTION_RIGHT) {
        direction = Hammer.DIRECTION_RIGHT;
        this.looksLikeYes();
      } else if (e.direction === Hammer.DIRECTION_LEFT) {
        direction = Hammer.DIRECTION_LEFT;
        this.looksLikeNo();
      } else {
        direction = null;
        $('.no-symbol').removeClass('active');
        $('.yes-symbol').removeClass('active');
      }
    },
    recHasBeenVoted: function() {
      console.log('recHasBeenVoted');
      var venueId = $('.gallery-view ul li').last().children('img').data('venue-id'),
          newInterestingVenues = JSON.parse(localStorage.getItem('interestingVenues')) || [],
          duplicate = false;

      // check if venue was already saved
      newInterestingVenues.forEach(function(venue) {
        if (venue.name === this.state.venues[venueId].name) {
          duplicate = true;
        }
      }.bind(this));

      if (!duplicate) {
        newInterestingVenues.push(this.state.venues[venueId]);
        localStorage.setItem('interestingVenues', JSON.stringify(newInterestingVenues));
      }
    },
    itsHammertime: function() {
      hammertime = new Hammer(document.querySelector('.gallery-view'));
      hammertime.on('pan', this.dragBegan);
    },
    componentDidMount: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
          var venues = [];
          data.response.groups[0].items.map(function(item) {
            venues.push(item.venue);
          }.bind(this));
          this.setState({
            venues: venues
          });
          this.itsHammertime();
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentDidUpdate: function() {
      window.setTimeout(this.fixHeight, 100);
    },
    render: function() {
      var photoNodes = this.state.venues.map(function(venue, index) {
        return (
          React.createElement("li", null,
            React.createElement(SumpinNew.Photo, {venueId: index, url: "https://api.foursquare.com/v2/venues/" + venue.id + "/photos?v=20131016&group=venue&client_id=S5YFDUCNUFVRNLBVXN4X4NLALQZ2HVX1UEUXRQ0SO4CJU54G&client_secret=VRZQLEP5QMSOIXEUXXI00C2XMMBVFPFHT4BJ0BNCE3CYNXWL"})
          )
        );
      });
      var interestingVenues = this.state.interestingVenues.map(function(venue) {
        return (
          React.createElement("p", null, venue.name)
        );
      });
      var loadingNode = function() {
        return (
          React.createElement("p", {className: "progress"}, "Churning up some recommendations...")
        );
      };
      return (
        React.createElement("div", {className: "gallery-view"},
          React.createElement("img", {className: "no-symbol", src: "img/no.svg"}),
          React.createElement("img", {className: "yes-symbol", src: "img/yes.svg"}),
          React.createElement("div", {className: "progress-text"},
            React.createElement("p", null, "Churning up some recommendations...")
          ),
          React.createElement("ul", null,  photoNodes )
        )
      );
    }
  });

  SumpinNew.Gallery = Gallery;
})();
