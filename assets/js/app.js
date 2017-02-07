angular.module('app', ['ngSanitize', 'ui.bootstrap', 'gumga.layout', 'gumga.securityEmbedded'])
    .controller('ctrl', function($scope){

      sessionStorage.setItem('user', JSON.stringify({
        "organization":"GUMGA",
        "organizationLogo":null,
        "timeOfCreation":"1486485375830",
        "name":"GumgaAdmin",
        "organizationHierarchyCode":"1.",
        "securityManager":false,
        "login":"gumga@gumga.com.br",
        "softwareHouse":false,
        "timeOfExpiration":"1486487175830",
        "picture":null,
        "token":"20L1E1486495452765O1.I"
      }));

      $scope.config = {
          securityURL : 'http://192.168.25.176:8080/darci-api',
          user: true
      };

    })
