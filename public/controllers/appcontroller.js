
var mainapp = angular.module('studio', ['ngRoute' , 'ngAnimate']);

 mainapp.run(['$global',function($global){
		$global.setShowlogin(true);
		$global.setShowhomepage(false);
		$global.setShowlogout(false);
		$global.setAdminlogged(false);
		$global.setShowSearch(false);
    }]);


mainapp.config( function ($routeProvider) {
	
	$routeProvider
		.when( '/homepage', 
				{
					controller: 'HomePageController',
					templateUrl: '../homepage.html'
				})
		.when( '/admin', 
				{
					controller: 'adminPageController',
					templateUrl: '../admin.html'
				})
		
		.otherwise(
				{
					redirectTo: '/admin'}
				);
});



mainapp.factory( '$global', function(){

	var showlogin = true;
	var showhomepage = true;
	var showlogout = true;
	var adminlogged = false;
	var showSearch = false;

	return{
		    setShowlogin : function(val){
		                showlogin = val;
		            },
		    setShowhomepage : function(val){
		                showhomepage = val;
		            },
		        
		    setShowlogout : function(val){
		                showlogout = val;
		            },
		    setAdminlogged : function(val){
		                adminlogged = val;
		            },
		    setShowSearch :function(val){
		    	        showSearch = val;
		            },
		    getShowlogin : function(){
		                return showlogin;
		            },
   		    getShowhomepage : function(){
		                return showhomepage;
		            },       
		    getShowlogout : function(){
		                return showlogout;
		            },
		    getAdminlogged : function(){
		                return adminlogged;
		            }, 
            getShowSearch : function(){
            	       return showSearch;
            }
		                  
        };
});

mainapp.controller('NavController', ['$scope', '$global', function($scope, $global){
	$scope.template = {
		navmenu: 'navmenu.html'
	};
	$scope.showlogin = $global.getShowlogin();
	$scope.showhomepage = $global.getShowhomepage();
	$scope.showlogout = $global.getShowlogout();
	$scope.showSearchPage = $global.getShowSearch();
}]);

mainapp.controller('FooterController', ['$scope', '$global', function($scope, $global){
	$scope.template = {
		footer: 'footer.html'
	};
}]);