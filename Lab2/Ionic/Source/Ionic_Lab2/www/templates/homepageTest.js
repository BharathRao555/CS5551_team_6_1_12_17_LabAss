describe("Validatehome", function() {
  var scope;
  beforeEach(angular.mock.module("HomePage"));
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $controller('Validatehome', {$scope: scope});
  }));
  it("check if city and searchKeyword is empty", function() {

    scope.Valid('','');
    expect(scope.temp).toEqual("city and searchKeyword can not be empty");
  });

  it("check if city is empty", function() {

    scope.Valid('','Kansas city');
    expect(scope.temp).toEqual("city can not be empty");
  });
  it("check if  searchKeyword is empty", function() {

    scope.Valid('Hotels','');
    expect(scope.temp).toEqual("searchKeyword can not be empty");
  });

});
angular.module('HomePage', []).controller('Validatehome', function ($scope,$http) {
  $scope.temp = "";

  $scope.Valid = function (city,searchKeyword) {

    $scope.city = city;
    $scope.searchKeyword = searchKeyword;

    if($scope.city == '' && $scope.searchKeyword == '' )
    {

      $scope.temp = "city and searchKeyword can not be empty";
    }

    else if($scope.city == '')
    {

      $scope.temp = "city can not be empty";
    }

    else
    {

      $scope.temp = "searchKeyword can not be empty";
    }
  }
});
