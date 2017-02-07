let TEMPLATE = `
.angular-ui-tree-empty{border:1px dashed #bbb;min-height:100px;background-color:#e5e5e5;background-image:-webkit-linear-gradient(45deg,#fff 25%,transparent 0,transparent 75%,#fff 0,#fff),-webkit-linear-gradient(45deg,#fff 25%,transparent 0,transparent 75%,#fff 0,#fff);background-image:linear-gradient(45deg,#fff 25%,transparent 0,transparent 75%,#fff 0,#fff),linear-gradient(45deg,#fff 25%,transparent 0,transparent 75%,#fff 0,#fff);background-size:60px 60px;background-position:0 0,30px 30px;pointer-events:none}.angular-ui-tree-nodes{position:relative;margin:0;padding:0;list-style:none}.angular-ui-tree-nodes .angular-ui-tree-nodes{padding-left:20px}.angular-ui-tree-node,.angular-ui-tree-placeholder{position:relative;margin:0;padding:0;min-height:20px;line-height:20px}.angular-ui-tree-hidden{display:none}.angular-ui-tree-placeholder{margin:5px 0;padding:0;min-height:30px}.angular-ui-tree-handle{cursor:move;text-decoration:none;font-weight:700;box-sizing:border-box;min-height:20px;line-height:20px}.angular-ui-tree-drag{position:absolute;pointer-events:none;z-index:999;opacity:.8}

.angular-ui-tree-handle {
  background: none repeat scroll 0 0 #f3f3f4;
  border: 1px dashed #e7eaec;
  color: inherit;
  padding: 10px;
  font-weight: normal;
}

.angular-ui-tree-handle:hover {
  font-weight: bold;
  cursor: pointer;
}

.angular-ui-tree-placeholder {
  background: #f0f9ff;
  border: 1px dashed #bed2db;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.group-title {
  background-color: #687074 !important;
  color: #FFF !important;
}

.tree-node {
  background: none repeat scroll 0 0 #f3f3f4;
  border: 1px dashed #e7eaec;
  color: inherit;
  padding: 10px;
  border-radius: 3px;
}

.tree-node .btn {
  min-width: 22px;
  margin-right: 4px;
}

.tree-node-content {
  margin: 5px 5px 5px 0;
}

.tree-handle {
  background: none repeat scroll 0 0 #f3f3f4;
  border: 1px dashed #e7eaec;
  color: inherit;
  padding: 10px;
}

.angular-ui-tree-handle:hover {
}

.angular-ui-tree-placeholder {
  background: #f0f9ff;
  border: 1px dashed #bed2db;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.dados-center {
  margin-left: 15%;
}

.ui-tree-button-arrow{
  padding: 0;
  padding-top: 5px;
}

.qs {
    /*background-color: #02bdda;*/
    border-radius: 16px;
    cursor: pointer;
    /*color: #e3fbff;*/
    display: inline-block;
    font-family: 'Helvetica',sans-serif;
    font-size: 18px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    position: relative;
    text-align: center;
    width: 30px;
}

.qs:hover{
    color: #209F94;
    /*background: #209F94;*/
}

.qs .popover {
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 5px;
    bottom: 42px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    color: #fff;
    display: none;
    text-align: center;
    font-size: 12px;
    font-family: 'Helvetica',sans-serif;
    top: -40px;
    left: -85px;
    padding: 7px 10px;
    position: absolute;
    width: 200px;
    z-index: 4;
    height: 33px;
}
.qs .popover:before {
    border-top: 7px solid rgba(0, 0, 0, 0.85);
    border-right: 7px solid transparent;
    border-left: 7px solid transparent;
    bottom: -7px;
    content: '';
    display: block;
    left: 50%;
    margin-left: -7px;
    position: absolute;
}
.qs:hover .popover {
    display: block;
    -webkit-animation: fade-in .3s linear 1, move-up .3s linear 1;
    -moz-animation: fade-in .3s linear 1, move-up .3s linear 1;
    -ms-animation: fade-in .3s linear 1, move-up .3s linear 1;
}

@-webkit-keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-moz-keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-ms-keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes move-up {
    from {
        bottom: 30px;
    }
    to {
        bottom: 42px;
    }
}
@-moz-keyframes move-up {
    from {
        bottom: 30px;
    }
    to {
        bottom: 42px;
    }
}
@-ms-keyframes move-up {
    from {
        bottom: 30px;
    }
    to {
        bottom: 42px;
    }
}

@media screen and (max-width: 992px) {
  .dados-center {
      margin-left: 15%;
  }
}


.breadcrumb-security-embedded > li > a{
    cursor : pointer;
}

`

const style = document.createElement('style');
const head = document.head || document.getElementsByTagName('head')[0];

style.type = 'text/css';

if (style.styleSheet) {
    style.styleSheet.cssText = TEMPLATE;
} else {
   style.appendChild(document.createTextNode(TEMPLATE));
}

head.appendChild(style);

export default TEMPLATE;
