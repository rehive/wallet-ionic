angular.module('generic-client.controllers.about', [])

    .controller('AboutCtrl', function ($scope, $state, $http, $window, CompanyDetails) {
        'use strict';
        $scope.data = {};

        var getCompanyDetails = CompanyDetails.get();

        getCompanyDetails.success(
            function (res) {
                $scope.companyDetails = res.data
            }
        );
    });