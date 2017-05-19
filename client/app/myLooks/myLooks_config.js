(function(){
	'use strict';

	angular
		.module('app')
		.config(config);

		config.$inspect = ['$stateProvider'];

		function config($stateProvider){
			$stateProvider
				.state('myLooks',{
					url: '/myLooks',
					templateUrl: 'app/myLooks/myLooks.html',
					controller: 'MyLooksCtrl',
					authenticate: true
				});
		}
})();