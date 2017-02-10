let TEMPLATE = `
  <div class="row">

    <div class="col-xs-12" ng-if="initSuccess == 'success'">
      <uib-tabset active="activePill">
        <uib-tab ng-repeat="tab in tabs track by $index" index="$index" heading="{{tab.label}}" ng-if="tab.visible">
          <div bind-html-compile="tab.template"></div>
        </uib-tab>
      </uib-tabset>
    </div>

  </div>
`;


const securityEmbedded = ($sce, $window, SecurityEmbeddedPerfilService) => {
    return {
      restrict : 'E',
      template: TEMPLATE,
      scope: {
        configuration: '='
      },
      link: (scope, elm, attrs) => {
          const ctrl = scope;

          const initConfiguration = () => {
              ctrl.initSuccess = 'loading';

              if(!ctrl.configuration || typeof ctrl.configuration != 'object'){
                 throw "Atenção, o SecurityEmbedded precisa do objeto de configuração, "+
                       "acesse http://www.github.com/gumga/security-embedded para mais detalhes.";
              }

              if(!ctrl.configuration.appURL || typeof ctrl.configuration.appURL != 'string'){
                  throw "Atenção, o SecurityEmbedded precisa que no objeto de configuração tenha o atributo appURL informando a rota da sua api, "+
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

              SecurityEmbeddedPerfilService.getInstance()
                .then(resp=>{
                  $window.securityEmbedded['instance'] = resp.data;
                  ctrl.initSuccess = 'success';
                },error=>{
                  throw "Não podemos inicar o segurity-embedded, aparentemente, o usuário não possui permissão na manipulação de dados do segurança.";
                })

          }

          initConfiguration();

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
              template: getTrustAsHtml('<security-embedded-perfil></security-embedded-perfil>')
            }
          ];


      }
    }
};

securityEmbedded.$inject = ['$sce', '$window', 'SecurityEmbeddedPerfilService'];

export default securityEmbedded;
