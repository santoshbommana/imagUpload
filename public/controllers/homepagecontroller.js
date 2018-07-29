mainapp.controller(
		'HomePageController',
		[ '$scope', '$global', '$location', '$http', '$filter', '$window',
				function($scope, $global, $location, $http, $filter, $window) {
			   console.log("tet");
					// index is the home page
					loadData();
					function loadData() {
						
						$http.get('/getAllRecords').success(function(res) {

							console.log("res", res.body);
							$scope.data = res.body;

						}).error(function(err) {

						});
					};

					$scope.onSelectImage = function($index) {

						$window.open('allPhotos.html', "_self");
					};
					$scope.select = function($index) {
						console.log($index);

						console.log("INDEX POSITION", $scope.data[$index]);

					}

				}]).controller(
		'AllImagePageController',
		[ '$scope', '$global', '$location', '$http', '$filter', '$window',
				function($scope, $global, $location, $http, $filter, $window) {
                         
					// index is the home page
					loadData();
					function loadData() {
						$http.get('/allImagesDb').success(function(res) {

							console.log("res", res.body);
							$scope.data = res.body;

						}).error(function(err) {

						});
					};

				}]).controller(
						'blogPageController',
						[ '$scope', '$global', '$location', '$http', '$filter', '$window',
								function($scope, $global, $location, $http, $filter, $window) {
                                     console.log("blog");
									// index is the home page
									loadData();
									function loadData() {
										$http.get('/getBlogDb').success(function(res) {

											console.log("res", res.body);
											$scope.data = res.body;

										}).error(function(err) {

										});
									};
									}])
									.controller(
						'contactPageController',
						[ '$scope', '$global', '$location', '$http', '$filter', '$window',
								function($scope, $global, $location, $http, $filter, $window) {
                                      
							  
							
									$scope.submit = function(){
										 var data ={
												  name:$scope.name,
												  email:$scope.email,
												  phone:$scope.phone,
												  subject:$scope.subject,
												  message:$scope.message,
												  type:"contact"
										 };
										 $scope.imageloader = true;
										$http.post('/sendContact',data).success(function(res) {

											console.log("res", res);
											$scope.successMessage = res.statusMessage;
											$scope.imageloader = false;
											rest();

										}).error(function(err) {

										});
									};
									
									function rest(){
										$scope.name ="";
										$scope.email="";
										$scope.phone="";
										$scope.subject="";
										$scope.message="";
										
									};
									$scope.onSelect = function(){
										$scope.successMessage = "";
									}
									}])