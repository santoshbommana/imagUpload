
mainapp.controller( 'HomePageController', ['$scope', 
                                           '$global', 
                                           '$location', 
                                           '$http', 
                                           '$filter',
                                           '$window', 
                                           function($scope, 
                                                    $global, 
                                                    $location, 
                                                    $http, 
                                                    $filter,
                                                    $window){


 // index is the home page 
 loadData();
    function loadData(){
         $http.get('/getAllRecords').success(function(res){

              console.log("res",res.body);
              $scope.data =  res.body;


         }).error(function(err){

         });
    };

    $scope.onSelectImage = function($index){

     $window.open('allPhotos.html',"_self");
    };
    $scope.select = function($index){
      console.log($index);

       console.log("INDEX POSITION", $scope.data[$index]);

    }
    
}]);