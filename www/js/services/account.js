/*global Firebase, console, angular */
angular.module('generic-client.services.account', [])

    .factory('authInterceptor', function (API, Auth, $location) {
        'use strict';
        return {
            // automatically attach Authorization header
            request: function (config) {
                var token = Auth.getToken();

                if (token && config.url.indexOf(API) === 0 && token) {
                    config.headers.Authorization = 'JWT ' + token;
                }

                return config;
            },

            // If a token was sent back, save it
            response: function (res) {
                if (res.data.results) {
                    if (res.config.url.indexOf(API) === 0 && res.data.results.token) {
                        Auth.saveToken(res.data.results.token);
                        Auth.saveUser(res.data.results.user_info);
                    }
                }

                return res;
            },
            //Redirect to login if unauthorised
            responseError: function (res) {
                if (res.status === 401 || res.status === 403) {
                    console.log('unauthorized');
                    Auth.logout();
                    $location.path('/login');
                }

                return res;
            }
        };
    })

    .service('Auth', function ($window) {
        'use strict';

        var self = this;

        // Add JWT methods here
        self.parseJwt = function (token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        };

        self.saveToken = function (token) {
            $window.localStorage.jwtToken = token;
        };

        self.saveUser = function (user) {
            $window.localStorage.user = JSON.stringify(user);
        };

        self.getToken = function () {
            return $window.localStorage.jwtToken;
        };

        self.getUser = function () {
            return JSON.parse($window.localStorage.user);
        };

        self.isAuthed = function () {
            var token = self.getToken();
            if (token) {
                var params = self.parseJwt(token);
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        };

        self.logout = function () {
            $window.localStorage.removeItem('jwtToken');
            $window.localStorage.removeItem('user');
            $window.localStorage.removeItem('myTransactions');
            $window.localStorage.removeItem('wiCode');
        };
    })

    .service('User', function ($http, API, Auth) {
        'use strict';
        var self = this;

        // add authentication methods here
        self.register = function (first_name, email, password1, password2) {
            return $http.post(API + '/register/', {
                first_name: first_name,
                email: email,
                password1: password1,
                password2: password2
            })
                .then(function (res) {
                    Auth.saveToken(res.data.token);
                    Auth.saveUser(res.data.results.user_info);
                    return res;
                });
        };

        self.login = function (email, password) {
            return $http.post(API + '/login/', {
                'email': email,
                'password': password
            })
        };

        self.partialUpdate = function (jsonUpdate) {
            console.log(jsonUpdate);
            return $http.patch(API + '/user/', jsonUpdate)
        };

        self.sendOtp = function () {
            return $http.post(API + '/send_otp/', {});
        };

        self.verifyMobile = function (otp) {
            return $http.post(API + '/verify_mobile/', {
                'otp': otp
            });
        };

        self.getCurrent = function () {
            return Auth.getUser();
        };
    });