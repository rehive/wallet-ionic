angular.module('generic-client.controllers.account', [])

    .controller('LoginCtrl', function ($scope, $ionicModal, $state, $ionicLoading, $rootScope, User, $ionicPopup) {
        'use strict';

        $ionicModal.fromTemplateUrl('templates/account/signup.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.registerUser = function (user) {
            if (user && user.first_name && user.email && user.password1 && user.password2) {
                $ionicLoading.show({
                    template: 'Signing Up...'
                });

                User.register(user.first_name, user.email, user.password1, user.password2)
                    .then(function (res) {
                        if (res.status === 201) {
                            $ionicLoading.hide();
                            $state.go('app.home');                         
                        } else {
                            $ionicPopup.alert({title: "Error", template: res.message});
                        }

                        $ionicLoading.hide();
                        $scope.modal.hide();
                    }).catch(function (error) {
                        $ionicPopup.alert({title: "Error", template: error});
                        $ionicLoading.hide();
                    });
            } else {
                $ionicPopup.alert({title: 'Please fill in all details'});
            }
        };

        $scope.logIn = function (user) {
            if (user && user.email && user.password) {
                $ionicLoading.show({
                    template: 'Logging In...'
                });
                
                User.login(user.email, user.password).then(function (res) {
                    $ionicLoading.hide();
                    $state.go('app.home');
                }).catch(function (error) {
                    $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                    $ionicLoading.hide();
                });
            } else {
                $ionicPopup.alert({title: 'Please enter both email and password'});
            }
        };
    });