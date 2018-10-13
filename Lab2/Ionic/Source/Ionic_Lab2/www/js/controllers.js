angular.module('starter.controllers', ['ionic', 'ngCordova'])

.controller('DashCtrl', function($scope, $state, $cordovaGeolocation) {

  var options = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    }, function (error) {
      console.log("Could not get location");
    });
  $scope.getDistance=function(source,destination)
  {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    //directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
      origin: source,
      destination: destination,
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {

      if(status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }

    });

  }
})
//angular.module('starter.controllers', ['ionic', 'ngCordova'])
.controller("homeController", function($scope, $http){

  $scope.getDetails = function (city,venue) {
    var query = 'https://api.foursquare.com/v2/venues/search?client_id=OAMFIYOQVREIOISWVD51JNUVXLGOBEXNEXQCEWUHDUOTZTMJ&' +
      'client_secret=1PF53W13MKJKSCF01UDPHQLOGEY2D15EG3OWAUUMEN5DC34Q&v=20160215&limit=5&near=' + city + '&query=' + venue
    $http.get(query).then(function (data) {
      console.log(data);
      $scope.details = data.data.response.venues;
    });
  }

})
//angular.module('starter.controllers', ['ionic', 'ngCordova'])
.controller("FirebaseController", function($scope, $state, $firebaseAuth) {

  var fbAuth = $firebaseAuth();

  $scope.login = function(username, password) {
    fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
      //$state.go("Homepage");
    }).catch(function(error) {
      console.error("ERROR: " + error);
    });
  }

  $scope.register = function(username, password) {
    fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
      return fbAuth.$signInWithEmailAndPassword(username,
        password);
    }).then(function(authData) {
      //$state.go("Homepage");
    }).catch(function(error) {
      console.error("ERROR: " + error);
    });
  }
  $scope.googleSignin=function(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //$state.go("Homepage");
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      alert(errorMessage);
      // ...
    });
  }
});

