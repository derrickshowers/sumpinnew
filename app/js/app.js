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

  function error() {
    window.alert('For some reason we couldn\'t get your location. Either refresh the page to try again, or just click \`Ok\` to continue with places in San Francisco');
    locationString = 'near=San%20Francisco';
    render();
  }

  function init() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          locationString = 'll=' + position.coords.latitude + ',' + position.coords.longitude;
          render();
        },
        function(error) {
          console.warn('error: ', error);
          error();
        },
        {
          timeout: 5000
        });
    } else {
      console.warn('brower does not seem to support geolocation');
      error();
    }
  }

  init();

})();
