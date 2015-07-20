var SumpinNew = SumpinNew || {};

(function() {

  var locationString,
      instructionsText;

  function render() {
    React.render(
      React.createElement(SumpinNew.Gallery, {url: "https://api.foursquare.com/v2/venues/explore?v=20131016&section=food&novelty=new&" + locationString + "&client_id=S5YFDUCNUFVRNLBVXN4X4NLALQZ2HVX1UEUXRQ0SO4CJU54G&client_secret=VRZQLEP5QMSOIXEUXXI00C2XMMBVFPFHT4BJ0BNCE3CYNXWL"}),
      document.getElementById('gallery')
    );
    React.render(
      React.createElement(SumpinNew.Matches, null),
      document.getElementById('matches')
    );
  }

  function init() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          locationString = 'll=' + position.coords.latitude + ',' + position.coords.longitude;
          render();
        },
        function(error) {
          locationString = 'near=San%20Francisco';
          render();
        },
        {
          timeout: 5000
        });
    } else {
      locationString = 'near=San%20Francisco';
      render();
    }
  }

  init();

})();
