angular.module('generic-client.controllers.account', [])

    .controller('LoginCtrl', function ($scope, $ionicModal, $state, $ionicLoading, $rootScope, User, $ionicPopup) {
        'use strict';

        $ionicModal.fromTemplateUrl('templates/account/signup.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.registerUser = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Signing Up...'
                });

                User.register(form.first_name.$viewValue, form.email.$viewValue, form.password1.$viewValue, form.password2.$viewValue)
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
            }
        };

        $scope.logIn = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Logging In...'
                });
                
                User.login(form.email.$viewValue, form.password.$viewValue).then(function (res) {
                    $ionicLoading.hide();

                    if (res.status === 200) {              
                        $state.go('app.home');                      
                    } else {
                        $ionicPopup.alert({title: "Error", template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: 'Authentication failed', template: error.data.message});
                    $ionicLoading.hide();
                });
            }
        };
    });