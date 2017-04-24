/*global Firebase, console, angular */
angular.module('generic-client.services.currency_accounts', [])

    .service('CurrencyAccounts', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            return $http.get(API + '/accounts/');
        };

        self.currenciesList = function (reference) {
            return $http.get(API + '/accounts/'+ reference + "/currencies/");
        };

        self.set = function (reference, code) {
            return $http({
                    method : "PUT",
                    url : API + '/accounts/'+ reference +'/currencies/' + code + '/',
                    data : {active: true}
                });
        };

        self.create = function (code, issuer) {
            return $http.post(API + '/accounts/currencies/external/add/', {
                code: code,
                issuer: issuer
            });
        };
    });