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

    .controller('FicaImageUploadCtrl', function ($state,  $ionicHistory, $stateParams, $window, $rootScope, $scope, Upload, Auth, API, $ionicLoading, $ionicPopup) {
        'use strict';

        $scope.image = {
            fileData: $stateParams.fileData,
        };

        $scope.upload = function () {
            if ($scope.image.fileData) {
                Promise.resolve(Upload.dataUrltoBlob($scope.image.fileData, "file")).then(function(file) {
                    Upload.upload({
                        url: API + "/users/document/",
                        data: {
                            file: file,
                            document_category: "",
                            document_type: ""
                        },
                        headers: {'Authorization': 'JWT ' + Auth.getToken()},
                        method: "POST"
                    }).then(function (res) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: "Success", template: "Upload complete."});

                        $ionicHistory.nextViewOptions({
                            disableAnimate: true,
                            disableBack: true
                        });

                        $state.go('app.fica');
                    }, function (res) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({title: "Error", template: "There was an error uploading the file."});
                        $state.go('app.fica');
                    }, function (evt) {
                        $ionicLoading.show({
                            template: 'Uploading...'
                        });
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                });
            }
        };
    })

    .controller('FicaImageCtrl', function ($state, $scope, $ionicLoading, $ionicPopup, $cordovaFileTransfer, $cordovaCamera, $timeout) {
        'use strict';

        $scope.getFromFiles = function (file) {
            $ionicLoading.show({
                template: 'Processing...'
            });

            // Convert to Data URL
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                $timeout(function() {
                    $state.go('app.fica_image_upload', {
                        fileData: evt.target.result
                    }).then(function() {
                        $ionicLoading.hide();
                    });
                });
            };
            reader.readAsDataURL(file);
        };

        $scope.getFile = function () {
            'use strict';
            if (ionic.Platform.isWebView()) {
                ionic.Platform.ready(function () {
                    var cameraOptions = {
                        quality: 75,
                        allowEdit: false,
                        destinationType: Camera.DestinationType.DATA_URL,
                        correctOrientation: true
                    };

                    $cordovaCamera.getPicture(cameraOptions).then(function (imageData) {
                        var file = "data:image/jpeg;base64," + imageData.replace(/(\r\n|\n|\r)/gm, '');

                        $state.go('app.fica_image_upload', {
                            fileData: file
                        }).then(function() {
                            $ionicLoading.hide();
                        });
                    });
                });
            } else {
                document.getElementById('upload').click();
            }
        };
    });
