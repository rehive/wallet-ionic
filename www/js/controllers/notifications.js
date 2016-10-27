angular.module('generic-client.controllers.notifications', [])



    .controller('NotificationsCtrl', function ($scope, $ionicPopup, $ionicModal, $state, $ionicLoading, Notification) {
        'use strict';
        $scope.data = {};


        $scope.list = function () {
            Notification.list().success(
                function (res) {
                    // var items = [];

                    // for (var i = 0; i < res.data.length; i++) {
                    //     items.push(res.data[i]);
                    //     console.log(res.data[i])
                    // }

                    $scope.notifications = res.data;
                    // $window.localStorage.setItem('myBitcoinWithdrawalAccounts', JSON.stringify(items));
                    // $scope.$broadcast('scroll.refreshComplete');
                }
            );
        };

        $scope.update = function (notification, email_enabled, sms_enabled) {
            $ionicLoading.show({
                template: 'Changing preferences...'
            });

            Notification.set(notification, email_enabled, sms_enabled).then(function (res) {
                if (res.status === 200) {
                    $ionicLoading.hide();
                    $scope.list();
                } else {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Error", template: res.message});
                }
            }).catch(function (error) {
                $ionicPopup.alert({title: 'Authentication failed', template: error.message});
                $ionicLoading.hide();
            });
        };

        $scope.list();
    });