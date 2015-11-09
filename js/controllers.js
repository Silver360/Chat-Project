/**
 * Created by Ren on 2014-10-29.
 */

var myApp = angular.module('appCtrl', ['ngCookies']);

var arryLeftPanel = [];
var arryCenterPanel = [];
var arryRightPanel = [];
var lastRoom = 0;
var i = 0;


myApp.controller('homeCtrl', function ($scope, $http, $cookieStore, $interval) {

    ciastko();


    var mojInterval = $interval(function () {

        getRooms();

    }, 1000);

    $scope.$on('$destroy', function () {
        $interval.cancel(mojInterval);
    });

    function getRooms() {
        $http.get('http://localhost:8080/rooms')
            .success(function (data) {
                if(data.length > lastRoom) {
                    while (i < data.length) {
                        if (i % 3 == 0) {
                            arryLeftPanel.push(data[i]);
                        }
                        else if (i % 3 == 1) {
                            arryCenterPanel.push(data[i]);
                        }
                        else if (i % 3 == 2) {
                            arryRightPanel.push(data[i]);
                        }
                        i++;
                    }
                } else {
                    while (i < data.length) {
                        if (i % 3 == 0) {
                            arryLeftPanel.push(data[i]);
                        }
                        else if (i % 3 == 1) {
                            arryCenterPanel.push(data[i]);
                        }
                        else if (i % 3 == 2) {
                            arryRightPanel.push(data[i]);
                        }
                        i++;
                    }
                }
                lastRoom = data.length;
            })
            .error(function (data) {
                console.log('ErrorRoms: ', data);
            });
    }

    $scope.leftPanel = arryLeftPanel;
    $scope.centerPanel = arryCenterPanel;
    $scope.rightPanel = arryRightPanel;

    /*Loging*/

    $scope.auth = {
        nick: '',
        password: ''

    };

    $scope.errorAuthentication = true;


//    var req = {
//        method: 'POST',
//        url: 'http://localhost:8080/user',
//        headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json'
//        },
//        data: $scope.auth
//    };
//
//    $http(req).success(function(){}).error(function(){});

    $scope.login = function () {
        $http.post('http://localhost:8080/user', $scope.auth)
            .success(function (data, status) {
                $cookieStore.put('user', data);
                console.log('Login: ' + data.nick);
                $scope.errorAuthentication = true;
                ciastko();
                $('#login').slideUp();
            })
            .error(function (data) {
                $scope.errorAuthentication = false;
                console.log('ErrorUser: ' + data);
            })

    };

    $scope.logout = function () {
        $cookieStore.remove('user');
        $scope.user = false;
        console.log('==Wylogowanie==');
    };

    $scope.room = {
        title:  '',
        content: '',
        user: $scope.user
    };

    $scope.createRoom = function () {
        $http.post('http://localhost:8080/createRoom', $scope.room)
            .success(function (data, status) {
                $('#addNewRoom').slideUp();
            })
            .error(function (data) {
                console.log('ErrorUser: ' + data);
            })

    };


    function ciastko() {
        if ($cookieStore.get('user')) {
            $scope.user = $cookieStore.get('user');
            console.log('uzytkownik zalogowany ' + $scope.user.nick);
        }
    }

});

myApp.directive('myRooms', function ($timeout, $state) {


    function link(scope, element, attrs) {
        console.log('zaczynay');
        $timeout(function () {
            setRooms(element);
        });

        element.mouseenter(function () {
            mouseOnRoom(element);
        });
        element.mouseleave(function () {
            mouseOutRoom(element);
        });

        $timeout(function () {
            scroll(element);
        });

        element.click(function () {
            stateChat(scope);
        });


    }

    function stateChat(scope) {
        $state.go('chat', { 'id': scope.Left.id });
    }

    function scroll(element) {
        var win = element.height() - 210;
        element.children('.content').children('.des').slimScroll({
            height: win + 'px',
            distance: '10px'
        });

    }

    function setRooms(element) {
        console.log('setRooms');
        element.css("height", element.children('.miniaturka').height());
    }

    function mouseOnRoom(element) {
        console.log('mouseOnRom');
        miniaturka = element.height();
        element.children('.content').show('slide', { direction: 'down' }, 'fast');
        element.css("height", miniaturka + 4);
        element.children('.miniaturka').hide('slide', { direction: 'up' }, 'fast');

    }

    function mouseOutRoom(element) {
        console.log('mouseOutRom');
        element.children('.content').stop().hide('slide', { direction: 'down' }, 'fast');
        element.children('.miniaturka').stop().show('slide', { direction: 'up' }, 'fast');
        console.log('ukrywam');
    }


    return{
        restrict: 'A',
        scope: {
            Left: '=myRooms'
        },
        link: link


    };

});

myApp.directive('popupLogin', function () {

    function link(scope, element, attrs) {
        element.click(function () {
            $('#login').slideDown();
        });
        $('.background').click(function () {
            $('#login').slideUp();
        });

    }

    return{
        restrict: 'A',
        link: link
    }

});

myApp.directive('popupAddNewRoom', function () {

    function link(scope, element, attrs) {
        element.click(function () {
            console.log('hi!!!!');
            $('#addNewRoom').slideDown();
        });
        $('.background').click(function () {
            $('#addNewRoom').slideUp();
        });

    }

    return{
        restrict: 'A',
        link: link
    }

});

/* Chat Controller */

myApp.controller('chatCtrl', function ($scope, $http, $location, $cookieStore, $interval, $state, $rootScope) {

    $scope.user = $cookieStore.get('user');

    var param;
    param = $location.search();

    checkUserInRoom();
    usersInRoom();
    getMessages();

    var mojInterval = $interval(function () {
        checkUserInRoom();
        usersInRoom();
        getMessages();


    }, 1000);


    chatRoom();
    usersInRoom();


    $scope.$on('$destroy', function () {
        $interval.cancel(mojInterval);
    });


    function chatRoom() {
        $http.get('http://localhost:8080/chatRoom?id=' + param.id)
            .success(function (data) {
                $scope.room = data;
            })
            .error(function (data) {
                console.log('ErrorRoms: ', data);
            });
    }

    function getMessages() {
        $http.get('http://localhost:8080/getMessages?id=' + param.id)
            .success(function (data) {
                $scope.messages = data;
            })
            .error(function (data) {
                console.log('ErrorRoms: ', data);
            });
    }

    $scope.message = {
        user: $scope.user,
        room: param.id,
        text: ""


    };

    $scope.setMessage = function($event){
        $http.post('http://localhost:8080/setMessage', $scope.message)
            .success(function (data) {
                console.log('ok');
            })
            .error(function (data) {
                console.log('ErrorRoms: ', data);
            });
        $('#message_box textarea').val("");
    };

    function usersInRoom() {
        $http.get('http://localhost:8080/usersInRoom?id=' + param.id)
            .success(function (data) {
                $scope.users = data;
            })
            .error(function (data) {
                console.log('ErrorRoms: ', data);
            });
    }

    $scope.userInRoom = {
        idUser: $scope.user.id,
        idRoom: param.id

    };

    function checkUserInRoom() {
        $http.post('http://localhost:8080/checkUserInRoom', $scope.userInRoom)
            .success(function (data) {
            })
            .error(function (data) {
                console.log('ErrorRoms: ', data);
            });
    }

});

myApp.directive('chatRoom', function ($timeout) {

    function link(scope, element, attrs) {

        $timeout(function () {
            scrollNav(element);
            scrollChatContent(element);
        });

    }

    function scrollNav(element) {
        element.children('nav').children('.content').slimScroll({
            color: 'white',
            height: '90%',
            width: '100%',
            distance: '5px'
        });

    }

    function scrollChatContent(element) {
        var win = $(window).height() - 78;
        element.children('section').children('.content').slimScroll({
            height: win + 'px',
            distance: '10px'
        });
        console.log(win);

    }


    return{
        restrict: 'A',
        link: link
    }


});

myApp.directive('message', function ($http, $cookieStore){

    function link(scope, element, attr){

        element.find('.deleteMsg').click(function(){
            deleteMessage(element.attr('class').split(' ')[1], scope.$parent.user, scope.$parent.room);
        });



    }

    function deleteMessage(id, user, room){
        $http.get('http://localhost:8080/deleteMsg?id='+id+'&idUser='+user.id+'&passwordUser='+user.password+'&idRoom='+room.id)
            .success(function (data, status) {

            })
            .error(function (data) {
                console.log("Error usuniecia wiadomosci: "+data);

            })
    }


    return{
        restrict: 'A',
        link: link
    }



});


/* Edit Account */

myApp.controller('editAcc', function ($scope, $http, $location, $cookieStore) {

    $scope.user = $cookieStore.get('user');



});

















