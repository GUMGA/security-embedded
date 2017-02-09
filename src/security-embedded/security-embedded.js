let TEMPLATE = `
  <div class="row" ng-if="initSuccess">
    <div class="col-xs-12">

      <uib-tabset active="activePill">
        <uib-tab ng-repeat="tab in tabs track by $index" index="$index" heading="{{tab.label}}" ng-if="tab.visible">
          <div bind-html-compile="tab.template"></div>
        </uib-tab>
      </uib-tabset>

    </div>
  </div>
`;


const securityEmbedded = ($sce, $window) => {
    return {
      restrict : 'E',
      template: TEMPLATE,
      scope: {
        configuration: '='
      },
      link: (scope, elm, attrs) => {
          const ctrl = scope;
          ctrl.initSuccess = false;

          const checkConfiguration = () => {
              if(!ctrl.configuration || typeof ctrl.configuration != 'object'){
                 throw "Atenção, o SecurityEmbedded precisa do objeto de configuração "+
                       "acesse http://www.github.com/gumga/security-embedded para mais detalhes.";
              }

              $window.securityEmbedded['appURL'] = ctrl.configuration.appURL;

              $window.securityEmbedded['getToken'] = () => {
                  if(ctrl.configuration.eternalToken){
                    return ctrl.configuration.eternalToken;
                  }
                  var user = JSON.parse(sessionStorage.getItem('user'));
                  if(!user || !user.token){
                    throw "Atenção, não encontramos token na configuração e nem na sessão, por fazer verifique e tente novamente.";
                  }
                  return user.token;
              }

              $window.securityEmbedded.getToken();

              $window.securityEmbedded['getOrganizationHierarchyCode'] = () => {
                  var user = JSON.parse(sessionStorage.getItem('user'));
                  if(!user || !user.organizationHierarchyCode){
                    throw "Atenção, o SecurityEmbedded precisa do código de hierarquia de uma organização, "+
                    "adicione no objeto de configuração ou insira na sua sessão.";
                  }
                  return user.organizationHierarchyCode;
              }

              $window.securityEmbedded.getOrganizationHierarchyCode();

              ctrl.initSuccess = true;
          }

          checkConfiguration();

          const isVisibleGeneric = (value, page) => {
              let visible = true;
              if(typeof value == "boolean"){
                  visible = value;
              }
              return visible;
          }

          const getTrustAsHtml = (html) => {
             return $sce.trustAsHtml(html);
          }

          ctrl.tabs = [
            {
              label: 'Organizações e usuários',
              visible: isVisibleGeneric(ctrl.configuration.user),
              template: getTrustAsHtml('<security-embedded-user></security-embedded-user>')
            },
            {
              label: 'Perfis',
              visible: isVisibleGeneric(ctrl.configuration.perfil),
              template: '<h1>Perfis</h1>'
            }
          ];


      }
    }
};

securityEmbedded.$inject = ['$sce', '$window'];

export default securityEmbedded;
