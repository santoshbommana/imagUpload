mainapp.controller(
		'HomePageController',
		[ '$scope', '$global', '$location', '$http', '$filter', '$window',
				function($scope, $global, $location, $http, $filter, $window) {
			  
					// index is the home page
					loadData();
					function loadData() {
						   $scope.imagePath = [];
						
						$http.get('/getAllRecords').success(function(res) {
                                  
							    
							 for(var i = 0;i<res.body.length;i++){
							 	     var convertedPath = res.body[i].image.path.slice(6)

								  var data ={
										  imageDes: convertedPath.replace(/\\/g, '/'),
										  title:res.body[i].textFeild.title
								  }
						     $scope.imagePath.push(data);
						     console.log($scope.imagePath);
							 }
							 
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
					$scope.imagePath = [];
					// index is the home page
					loadData();
					function loadData() {
						$http.get('/allImagesDb').success(function(res) {
							for(var i = 0;i<res.body.length;i++){
								var convertedPath = res.body[i].image.path.slice(6)

							var data ={
									imageDes: convertedPath.replace(/\\/g, '/'),
									title:res.body[i].textFeild.title,
									discription:res.body[i].textFeild.discription
							}
					   $scope.imagePath.push(data);
					  // console.log($scope.imagePath);
					   }
							$scope.data = res.body;

						}).error(function(err) {

						});
					};
					$scope.onImageClick= function(x){
						$scope.displaydata = x;
					}

				}]).controller(
						'blogPageController',
						[ '$scope', '$global', '$location', '$http', '$filter', '$window',
								function($scope, $global, $location, $http, $filter, $window) {
                                     console.log("blog");
                                     
									// index is the home page
									loadData();
									$scope.data =[];
									function loadData() {
										$http.get('/getBlogDb').success(function(res) {

											console.log("res", res.body);
											

											 for (var i =0;i<res.body.length;i++ ){
                                                       var convertedPath = res.body[i].image.path.slice(6);
                                                       var dataDis ={
									                         image: convertedPath.replace(/\\/g, '/'),
									                         title:res.body[i].textFeild.title,
									                         discription:res.body[i].textFeild.discription,
									                         date:res.body[i].textFeild.date,
									                         writtenBy:res.body[i].textFeild.writenBy
							                                }
                                                       
                                                     $scope.data.push(dataDis);
                                                       
                                                        
											 }
											   

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