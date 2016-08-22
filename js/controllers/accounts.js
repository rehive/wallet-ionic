angular.module('generic-client.controllers.accounts', [])

    .controller('LoginCtrl', function ($scope, $ionicModal, $state, $ionicLoading, $rootScope, User, $ionicPopup) {
        'use strict';

        $ionicModal.fromTemplateUrl('templates/accounts/signup.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalSignup = modal;
        });


        $ionicModal.fromTemplateUrl('templates/accounts/forgot.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.ModalForgot = modal;
        });

        $scope.ShowModalSignup = function (){
             $scope.modalSignup.show()
        }

        $scope.ShowModalForgot = function (){
             $scope.ModalForgot.show()
        }

        $scope.CloseModalSignup = function (){
             $scope.modalSignup.hide()
        }

        $scope.CloseModalForgot = function (){
             $scope.ModalForgot.hide()
        }

        $scope.registerUser = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Signing Up...'
                });

                User.register(form.first_name.$viewValue, form.email.$viewValue, form.company_id.$viewValue, form.password1.$viewValue, form.password2.$viewValue)
                    .then(function (res) {
                    if (res.status === 201) {
                        $ionicLoading.hide();
                        $state.go('app.home');
                    } else {
                        $ionicPopup.alert({title: "Error", template: res.data.message});
                    }

                    $ionicLoading.hide();
                    $scope.CloseModalSignup();
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

                User.login(form.email.$viewValue, form.company_id.$viewValue, form.password.$viewValue).then(function (res) {
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

        $scope.resetPassword = function (form) {
            if (form.$valid) {
                $ionicLoading.show({
                    template: 'Sending email..'
                });

                $scope.CloseModalForgot();

                User.resetPassword(form.email.$viewValue, form.company_id.$viewValue).then(function (res) {
                    $ionicLoading.hide();

                    if (res.status === 200) {
                        $ionicPopup.alert({title: "Sent!", template: "Please check your inbox and follow the directions received in the email."});
                    } else {
                        $ionicPopup.alert({title: "Error", template: res.data.message});
                    }
                }).catch(function (error) {
                    $ionicPopup.alert({title: 'Password Reset Error', template: error.data.message});
                    $ionicLoading.hide();
                });
            }
        };
    });