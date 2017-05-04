(function(){
	'use strict';

// name of the factory is mentioned below as looksAPI

	angular
	.module('app')
	.factory('scrapeAPI', scrapeAPI);

// $http is a service which is injected into this factory

	scrapeAPI.$inject = ['$http'];

// function to return getScrapeDetails

	function scrapeAPI($http){
		return {
		getScrapeDetails: getScrapeDetails
		}

		function getScrapeDetails(link){
    	return $http.post('/api/links/scrape', link);
		}
	}
})();