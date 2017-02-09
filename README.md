# Gumga Security Embedded

Segurança embutido nas aplicações feitas com framework Gumga.

## Requisitos
| Lib        | Versão           |
| ------------- |:-------------:|
| [angular-sanitize](https://github.com/angular/bower-angular-sanitize/ "title" target="_blank")     | ^1.5.8 |
| [angular-ui-bootstrap](https://angular-ui.github.io/bootstrap/ "title" target="_blank")  | ^2.5.0      |

## Instalação
1 - Instale o gumga-security-embedded via bower
```
bower install gumga-security-embedded --save
```
2 - Após a instalação adicione o arquivo de distribuição.
```
<script type="text/javascript" src="bower_components/gumga-security-embedded/dist/security-embedded.min.js"></script>
```
3 - Adicione o modulo gumga.securityEmbedded na sua aplicação
```javascript
angular.module('yourApp', ['gumga.securityEmbedde'])
```
## Uso
#Adicione no seu HTML o código abaixo
```html
<security-embedded configuration="config"></security-embedded>
```
#Configuração
```javascript
$scope.config = {
    appURL : 'http://192.168.25.176:8080/darci-api',
    eternalToken: '', //default sessionStorage
    user: true, //default true
    perfil: true //default true
};
```
#Atributos da configuração

| Atributo        | Descrição           |
| ------------- |:-------------:|
| appURL:STRING   | Localização da sua aplicação, geralmente é usado o arquivo apiLocations |
| eternalToken:STRING  | Token eterno fixo, caso não seja preenchido, usaremos o token da sessionStorage |
| user:BOOLEAN  | Será usado para mostrar ou ocultar a aba de usuários e organizações |
| perfil:BOOLEAN  | Será usado para mostrar ou ocultar a aba de perfil |
