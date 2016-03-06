app.config(function ($stateProvider) {

    $stateProvider.state('adminTools', {
        url: '/admin-tools',
        templateUrl: 'js/admin-tools/admin-tools.html',
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.factory('AdminFactory', function ($http) {

    // var getStash = function () {
    //     return $http.get('/api/members/secret-stash').then(function (response) {
    //         return response.data;
    //     });
    // };

    // return {
    //     getStash: getStash
    // };

});