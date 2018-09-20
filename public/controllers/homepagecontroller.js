mainapp.controller(
		'HomePageController',
		[ '$scope', '$global', '$location', '$http', '$filter', '$window',
				function($scope, $global, $location, $http, $filter, $window) {

					// index is the home page
					loadData();
					function loadData() {
						   $scope.imagePath = [];
                $scope.loader = true;
						$http.get('/getAllRecords').success(function(res) {

							 for(var i = 0;i<res.body.length;i++){
							 	     var convertedPath = res.body[i].image.path.slice(6)
								  var data ={
										  imageDes: convertedPath.replace(/\\/g, '/'),
										  title:res.body[i].textFeild.title
								  }
						     $scope.imagePath.push(data);
						     //console.log($scope.imagePath);
                 $scope.loader = false;
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
							console.log(res);
							$scope.onSelectionImageType = false;
							$scope.noSelection = true;
							for(var i = 0;i<res.body.length;i++){
								var convertedPath = res.body[i].image.path.slice(6)

							$scope.data ={
									imageDes: convertedPath.replace(/\\/g, '/'),
									title:res.body[i].textFeild.title,
									discription:res.body[i].textFeild.discription,
									imageType:res.body[i].textFeild.imageType
							}
					   $scope.imagePath.push($scope.data);
					       console.log($scope.imagePath);
					   }
							$scope.data = res.body;

						}).error(function(err) {

						});
					};
					$scope.onImageClick= function(x){
						$scope.displaydata = x;

					};

			$scope.imageFilter= function(x){
        $scope.typeSelection =[];
				$scope.onSelectionImageType = true;
				$scope.noSelection = false;
			for(var i = 0;i<$scope.imagePath.length;i++){
				 if (x == 1 ){
					   if($scope.imagePath[i].imageType == "Nature"){
							 $scope.typeSelection.push($scope.imagePath[i]);
                  //console.log("Nature",$scope.imagePath[i]);
						 }
					 }
				if(x == 2 ){
					if($scope.imagePath[i].imageType == "Landscape"){
						$scope.typeSelection.push($scope.imagePath[i]);
							 //console.log( "Landscape",$scope.imagePath[i]);
					}
				 }
				 if(x == 3 ){
 					if($scope.imagePath[i].imageType == "Travel"){
 						$scope.typeSelection.push($scope.imagePath[i]);
 							 //console.log( "Travel",$scope.imagePath[i]);
 					}
 				 }
				 if(x == 4 ){
 					if($scope.imagePath[i].imageType == "Wildlife"){
 						$scope.typeSelection.push($scope.imagePath[i]);
 							 //console.log( "Wildlife",$scope.imagePath[i]);
 					}
 				 }
				 if(x == 5 ){
 					if($scope.imagePath[i].imageType == "Macro"){
 						$scope.typeSelection.push($scope.imagePath[i]);
 							 //console.log( "Macro",$scope.imagePath[i]);
 					}
 				 }
				 if(x == 6 ){
 					if($scope.imagePath[i].imageType == "portraits"){
 						$scope.typeSelection.push($scope.imagePath[i]);
 							 //console.log( "portraits",$scope.imagePath[i]);
 					}
 				 }
				 if(x == 7 ){
 					if($scope.imagePath[i].imageType == "Lifestyle"){
 						$scope.typeSelection.push($scope.imagePath[i]);
 							 //console.log( "Lifestyle",$scope.imagePath[i]);
 					}
 				 }
				 if(x == 0){
						 $scope.typeSelection.push($scope.imagePath[i]);
							//	console.log( "0",$scope.imagePath[i]);
					 }



			 }

                   	console.log( "xx." ,x);
			};


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
