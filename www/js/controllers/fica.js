angular.module('generic-client.controllers.fica', [])

    .controller('FicaRequirementsCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};
    })

    .controller('FicaIdCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "id"};

        $scope.submit = function (type) {
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaIdSelfieCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "id_selfie"};

        $scope.submit = function (type) {
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaProofOfAddressCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "proof_of_address"};

        $scope.submit = function (type) {
            $state.go('app.fica_camera_upload', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaCameraUploadCtrl', function ($scope, Upload, Auth, API, $ionicLoading, $ionicPopup) {
        'use strict';

        $scope.getFile = function () {
            'use strict';
            if (ionic.Platform.isIOS()) {
                document.addEventListener("deviceready", function () {
                    // Do iOS image/camera transfer
                }, false);
            } else if (ionic.Platform.isAndroid()) {
                document.addEventListener("deviceready", function () {
                    // Do Android image/camera transfer
                }, false);
            } else {
                document.getElementById('upload').click();
            }
        };


        // PC upload
        $scope.upload = function (file) {
            Upload.upload({
                url: API + "/users/document/",
                data: {file: file, document_category: "", document_type: ""},
                headers: {'Authorization': 'JWT ' + Auth.getToken()}
            }).then(function (res) {
                $ionicLoading.hide();
                $ionicPopup.alert({title: "Success", template: "Upload complete."});
            }, function (res) {
                $ionicLoading.hide();
                $ionicPopup.alert({title: "Success", template: res.status});
            }, function (evt) {
                $ionicLoading.show({
                    template: 'Uploading...'
                });
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        };
    });
