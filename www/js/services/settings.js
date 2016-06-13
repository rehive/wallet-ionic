/*global Firebase, console, angular */
angular.module('generic-client.services.settings', [])

    .service('PersonalDetails', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/accounts/users/');
        };

        self.create = function (first_name, last_name, email, nationality) {

            return $http.put(API + '/accounts/users/', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                nationality: nationality
            });
        };
    });