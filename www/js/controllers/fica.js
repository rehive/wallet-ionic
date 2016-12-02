angular.module('generic-client.controllers.fica', [])

    .controller('FicaRequirementsCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {};
    })

    .controller('FicaIdCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "id"};

        $scope.submit = function (type) {
            $state.go('app.fica_image', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaIdSelfieCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "id_selfie"};

        $scope.submit = function (type) {
            $state.go('app.fica_image', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaProofOfAddressCtrl', function ($scope, $state) {
        'use strict';
        $scope.data = {type: "proof_of_address"};

        $scope.submit = function (type) {
            $state.go('app.fica_image', {
                type: $scope.data.type
            });
        };
    })

    .controller('FicaImageUploadCtrl', function ($state, $stateParams, $window, $rootScope, $scope, Upload, Auth, API, $ionicLoading, $ionicPopup) {
        'use strict';

        $scope.image = {
           fileData: $stateParams.fileData,
        };

        $ionicLoading.hide();

        $scope.upload = function () {
            if ($scope.image.fileData) {
                // Convert data URL to blob file
                var file = Upload.dataUrltoBlob($scope.image.fileData, "file")

                Upload.upload({
                    url: API + "/users/document/",
                    data: {
                        profile: file,
                        document_category: "",
                        document_type: ""
                    },
                    headers: {'Authorization': 'JWT ' + Auth.getToken()},
                    method: "PUT"
                }).then(function (res) {
                    // Set user root scope
                    $rootScope.user.profile = res.data.data.profile;
                    $window.localStorage.setItem('user', JSON.stringify($rootScope.user));

                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Success", template: "Upload complete."});
                    $state.go('app.profile_image');
                }, function (res) {
                    $ionicLoading.hide();
                    $ionicPopup.alert({title: "Error", template: "There was an error uploading the file."});
                    $state.go('app.profile_image');
                }, function (evt) {
                    $ionicLoading.show({
                        template: 'Uploading...'
                    });
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            }
        };
    })

    .controller('FicaImageCtrl', function ($state, $scope, $ionicLoading, $ionicPopup, $cordovaFileTransfer, $cordovaCamera) {
        'use strict';

        $scope.upload = function (file) {
            if (file) {
                $ionicLoading.show({
                    template: 'Processing...'
                });

                // Convert to Data URL
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $state.go('app.fica_image_upload', {
                        fileData: evt.target.result
                    });
                };
                reader.readAsDataURL(file);
            }
        }

        $scope.getFile = function () {
            'use strict';
            if (ionic.Platform.isWebView()) {
                ionic.Platform.ready(function(){
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
                });
            } else {
                document.getElementById('upload').click();
            }
        };
    });
