angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ProductsCtrl', function($scope, $http, $rootScope) {

  console.log("in products controller");

  $scope.language = {};
  $scope.language.display = "English";
  var languageShort;
  $scope.items;

  var urlBase = 'https://<REPLACE WITH API URL>/sb/api/Cars'; //MUST REPLACE WITH API URL
  var headersBase =

  {
    'X-IBM-Client-Id': 'default', //MUST REPLACE WITH CLIENT ID
    'X-IBM-Client-Secret': 'SECRET', //MUST REPLACE WITH CLIENT SECRET
    'content-type': 'application/json',
    'accept': 'application/json'
  }


  $scope.doRefresh = function(){
    console.log('Refresh');
    console.log($scope.language.display);

    if($scope.language.display == "English")
    {
      languageShort = "en";
    }
    if($scope.language.display == "Italian")
    {
      languageShort = "it";
    }
    if($scope.language.display == "Spanish")
    {
      languageShort = "es";
    }


    var urlModified = urlBase + '?language=' + languageShort;

      var req = {
     method: 'GET',
     url: urlModified,
     headers: headersBase
   }

   console.log(JSON.stringify(req));


    $http(req).then(function(response){
      console.log(JSON.stringify(response));
        $scope.items = response.data;
    }).catch (function(err){
      console.log("Error Caught " + JSON.stringify(err));
    })
    .finally(function(){
      $scope.$broadcast('scroll.refreshComplete')
    });
  };

  if($scope.language.display == "English")
  {
    languageShort = "en";
  }
  if($scope.language.display == "Italian")
  {
    languageShort = "it";
  }
  if($scope.language.display == "Spanish")
  {
    languageShort = "es";
  }

  var urlModified = urlBase + '?language=' + languageShort;

    var req = {
   method: 'GET',
   url: urlModified,
   headers: headersBase
  }

  $http(req).then(function(response){
    console.log(JSON.stringify(response));
      $scope.items = response.data;
  });



})



.controller('UploadCtrl', function($scope, $http, $state) {
  console.log("in Upload Controller");

    var url = 'https://<REPLACE WITH API URL>/sb/api/Cars'; //MUST REPLACE WITH API URL

$scope.product = {
  description: "",
  name: "",
  price: 0,
  img_url: ""
};

  $scope.submit = function(){
    console.log('Submit');
    console.log(JSON.stringify($scope.product));
    $http.post(url, $scope.product).then(function(response){
      console.log(JSON.stringify(response));
    });
    $state.go('app.products');
  };


});
