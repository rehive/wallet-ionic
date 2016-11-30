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

    .controller('FicaCameraUploadCtrl', function ($state, $scope, Upload, Auth, API, $ionicLoading, $ionicPopup, $cordovaFileTransfer, $cordovaCamera) {
        'use strict';

        $scope.getFile = function () {
            'use strict';
            if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
                document.addEventListener("deviceready", function () {
                    var cameraOptions = {
                        quality: 75,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        allowEdit: true,
                        encodingType: Camera.EncodingType.JPEG,
                        popoverOptions: CameraPopoverOptions,
                        saveToPhotoAlbum: true
                    };

                    $cordovaCamera.getPicture(cameraOptions).then(function (file) {
                        $scope.upload(file)
                    });
                }, false);
            } else {
                document.getElementById('upload').click();
            }
        };

        $scope.upload = function (file) {
            if (file) {
                Upload.upload({
                    url: API + "/users/document/",
                    data: {file: file, document_category: "", document_type: ""},
                    headers: {'Authorization': 'JWT ' + Auth.getToken()}
                }).then(function (res) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Success", template: "Upload complete."});
                    $state.go('app.fica');
                }, function (res) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Error", template: "There was an error uploading the file."});
                }, function (evt) {
                    $ionicLoading.show({
                        template: 'Uploading...'
                    });
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
        };
    });
