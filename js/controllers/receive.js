angular.module('generic-client.controllers.receive', [])

    .controller('ReceiveCtrl', function ($scope, $window, User) {
        User.getInfo().then(function (res) {

            if ($window.localStorage.myAddress) {
                $scope.myAddress = JSON.parse($window.localStorage.myAddress);
            }
            console.log(res)
            $scope.email = res.data.data.email;
            $scope.refreshData();
        });

        $scope.refreshData = function () {
            var myAddress = 'https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=' + $scope.email + '&choe=UTF-8';
            $scope.myAddress = myAddress;
            $window.localStorage.setItem('myAddress', JSON.stringify(myAddress));
        };
    });