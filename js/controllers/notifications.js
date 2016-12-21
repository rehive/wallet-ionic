angular.module('generic-client.controllers.notifications', [])



    .controller('NotificationsCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, $translate, Notification) {
        'use strict';
        $scope.data = {};


        $scope.list = function () {
            Notification.list().success(
                function (res) {
                    $scope.notifications = res.data;
                }
            );
        };

        $scope.update = function (notification, email_enabled, sms_enabled) {
            $ionicLoading.show({
                template: $translate.instant("LOADER_CHANGING_PREFERNCES")
            });

            Notification.set(notification, email_enabled, sms_enabled).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.list();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: $translate.instant("ERROR"), template: res.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: $translate.instant("AUTHENTICATION_ERROR"), template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.list();
    });