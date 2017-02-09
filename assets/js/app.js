angular.module('app', ['ngSanitize', 'ui.bootstrap', 'gumga.layout', 'gumga.securityEmbedded'])
    .controller('ctrl', function($scope){

      sessionStorage.setItem('user', JSON.stringify(
        {"organization":"GUMGA",
        "organizationLogo":null,
        "timeOfCreation":"1486553192120",
        "name":"Mateus Miranda",
        "organizationHierarchyCode":"1.",
        "securityManager":false,
        "login":"info.mateusmiranda@gmail.com",
        "softwareHouse":false,
        "timeOfExpiration":"1486554992120",
        "token":"4L6E1486665471341O1.6.I"}));

      $scope.config = {
          appURL : 'http://192.168.25.176:8080/darci-api',
          // eternalToken: 'eterno',
          // user: true,
          // perfil: false
      };

    })
