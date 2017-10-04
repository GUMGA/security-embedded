angular.module('app', ['ngSanitize', 'ui.bootstrap', 'gumga.layout', 'gumga.securityEmbedded'])
    .controller('ctrl', function($scope){

      sessionStorage.setItem('user', JSON.stringify(
        {
    "organizationLogo": null,
    "timeOfCreation": "1507120718599",
    "login": "daniel@teste.com.br",
    "softwareHouse": false,
    "picture": null,
    "token": "daniel",
    "idUser": 27,
    "organization": "TesteDaniel",
    "name": "daniel",
    "organizationHierarchyCode": "1.8.",
    "instanceOrganizationHierarchyCode": "1.",
    "securityManager": false,
    "timeOfExpiration": "1507122518599"
}));

      $scope.config = {
          appURL : 'http://localhost:8081/dashboard-api',
          eternalToken: 'daniel',
          user: true,
          perfil: true
      };

    })
