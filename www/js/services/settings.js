/*global Firebase, console, angular */
angular.module('generic-client.services.settings', [])

    .service('PersonalDetails', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/accounts/users/');
        };

        self.create = function (first_name, last_name, email, id_number, nationality) {

            return $http.put(API + '/accounts/users/', {
                first_name: first_name,
                last_name: last_name,
                email: email,
                id_number: id_number,
                nationality: nationality
            });
        };
    })

    .service('Address', function ($http, API) {
        'use strict';
        var self = this;

        self.get = function () {
            return $http.get(API + '/accounts/user_address/');
        };

        self.create = function (line_1, line_2, city, state_province, country, code) {

            return $http.put(API + '/accounts/user_address/', {
                line_1: line_1,
                line_2: line_2,
                city: city,
                state_province: state_province,
                country: country,
                postal_code: code
            });
        };
    })

    .service('BankAccount', function ($http, API) {
        'use strict';
        var self = this;

        self.list = function () {
            console.log($http.get(API + '/accounts/user_bank_account/'));
            return $http.get(API + '/accounts/user_bank_account/');
        };

        self.get = function (accId) {
            return $http.get(API + '/accounts/user_bank_account/1/' );
        };

        self.create = function (name, number, type, bank_name, branch_code, swift, iban, bic) {

            return $http.post(API + '/accounts/user_bank_account/', {
                name: name,
                number: number,
                type: type,
                bank_name: bank_name,
                branch_code: branch_code,
                swift: swift,
                iban: iban,
                bic: bic
            });
        };
    });