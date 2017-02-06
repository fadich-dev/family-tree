angular
    .module('app', []);
angular
    .module('app')
    .controller('MainCtrl', function MainCtrl($scope, $http) {
            $http.get('/get-tree').then(function (res) { // on success
                $scope.tree = res.data.tree;
                console.log($scope.tree);
            }, function error(err) { // on error
                console.error(err);
                location.hash = '/';
            });
        }
    );