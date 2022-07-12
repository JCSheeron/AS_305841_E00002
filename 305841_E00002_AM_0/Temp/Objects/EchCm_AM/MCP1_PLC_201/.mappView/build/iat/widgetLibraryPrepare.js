(function () {
    
    'use strict';

    var widgetLibraryPrepare = {

        createSchemaset: function createSchemaset(library, options) {
            if (options && options.prettify !== undefined) {
                _prettify = options.prettify;
            }
            var namespace = '';
            switch (options.type) {
                case 'content':
                    namespace = 'http://www.br-automation.com/iat2015/contentDefinition/v2';
                    break;
                case 'styles':
                    namespace = 'http://www.br-automation.com/iat2015/styles/engineering/v1';
                    break;
                case 'eventbinding':
                    namespace = 'http://www.br-automation.com/iat2014/eventbinding/v2';
                    break;
            }

            var xml = '<?xml version="1.0" encoding="utf-8"?>' + lbr() + '<SchemaCatalog xmlns="http://schemas.microsoft.com/xsd/catalog">' + lbr();

            for (var entry in library) {
                if (typeof library[entry] === 'string') {
                    xml += tab(1) + '<Schema href="' + library[entry] + '" targetNamespace="' + namespace + '" />' + lbr();
                } else if (typeof library[entry] === 'object' && library[entry].href !== undefined) {
                    xml += tab(1) + '<Schema href="' + library[entry].href + '" targetNamespace="' + library[entry].namespace + '" />' + lbr();
                }
            }

            xml += '</SchemaCatalog>';

            return xml;
        },

        runAsHTMLIndex: function runAsHTMLIndex(widgetInfo, options, libName) {
            if (options && options.prettify !== undefined) {
                _prettify = options.prettify;
            }

            var html = '<!DOCTYPE html><html lang="de"><head><meta charset="windows-1252" /><title>mapp View</title>' + lbr();
            html += '<link rel="stylesheet" href="../../../../../Help/styles.css">' + lbr();
            html += '<link rel="stylesheet" href="../../../../../Help/help.css" />' + lbr();
            html += '<link rel="stylesheet" href="../styles/mappView.css" />' + lbr();
            html += '</head><body onload="DomcatInitialize()">' + lbr();
            html += '<script src="../../../../../AS/Glossary/glossary.js"></script>' + lbr();
            html += '<script src="../../../../../AS/Domcat/Domcat.js"></script>' + lbr();
            html += '<div class="ManualTitle">Widgets</div>' + lbr();

            html += tab(1) + '<h1>B&amp;R Widgets Library</h1>' + lbr();

            for (var i in widgetInfo) {
                var wname = widgetInfo[i].split('/').pop().replace('.xsd', '');
                html += tab(2) + '<a class="widgetLink" href="' + wname + '.html">' + wname + '</a>' + lbr();
            }

            html += tab(1) + '</body>' + lbr();
            html += '</html>';

            return html;
        },

        runBreaseHelpIndex: function runBreaseHelpIndex(options) {
            if (options && options.prettify !== undefined) {
                _prettify = options.prettify;
            }

            var info = ['Config', 'DataTypes', 'Enum', 'Types'];

            var xml = '<?xml version="1.0" encoding="utf-8"?>' + lbr() + '<Help>' + lbr();

            xml += tab(1) + '<Section Text="Definitions">' + lbr();

            for (var i in info) {
                xml += tab(2) + '<Page Text="' + info[i] + '" File="' + info[i].toLowerCase() + '.html#top" />' + lbr();
            }

            xml += tab(1) + '</Section>' + lbr();
            xml += '</Help>';

            return xml;
        },

        runHTMLDoku: function runHTMLDoku(widgetInfo, library, options) {
            if (options && options.prettify !== undefined) {
                _prettify = options.prettify;
            }

            var html = '<html lang="en">' + lbr();
            html += '<head>' + lbr();
            html += '<meta charset="utf-8">' + lbr();
            html += '<meta http-equiv="X-UA-Compatible" content="IE=edge">' + lbr();
            html += '<meta name="viewport" content="width=device-width, initial-scale=1">' + lbr();
            html += '<title>widget library: ' + library + '</title>' + lbr();
            html += '<link href="../../assets/css/bootstrap.min.css" rel="stylesheet">' + lbr();

            html += '<style type="text/css">' + lbr();
            html += '#menu' + lbr();
            html += '   {' + lbr();
            html += '       padding-top: 70px;' + lbr();
            html += '       height: 90%;' + lbr();
            html += '       overflow: scroll;' + lbr();
            html += '   }' + lbr();
            html += '#content {' + lbr();
            html += '   height: 90%;' + lbr();
            html += '}' + lbr();
            html += ' #contentframe {' + lbr();
            html += '   width:100%;' + lbr();
            html += '   height: 100%;' + lbr();
            html += '   border: none;' + lbr();
            html += '}' + lbr();

            html += '</style>' + lbr();
            html += '</head>' + lbr();
            html += '<body>' + lbr();
            html += '<div class="container-fluid">' + lbr();
            html += '<h2>widget library: ' + library + '</h2>' + lbr();
            html += ' <div class="row">' + lbr();
            html += '<div class="col-md-3" id="menu">' + lbr();
            html += ' <div class="list-group">' + lbr();
            for (var i in widgetInfo) {
                html += '<a href="#" class="list-group-item" data-widget-path="' + widgetInfo[i].replace('.xsd', '_doc.html') + '">' + widgetInfo[i].substring(0, widgetInfo[i].indexOf('/')) + '</a>' + lbr();
            }

            html += '</div>' + lbr();
            html += '</div>' + lbr();
            html += '<div class="col-md-9" id="content">' + lbr();
            html += '<iframe id="contentframe" src=""></iframe>' + lbr();
            html += '</div>' + lbr();
            html += '</div>' + lbr();
            html += '</div>' + lbr();
            html += ' <script src="../../jquery.js"></script>' + lbr();
            html += ' <script src="../../assets/js/bootstrap.min.js"></script>' + lbr();
            html += '<script type="text/javascript">' + lbr();
            html += '$("#menu a").on("click", function (e) {' + lbr();
            html += '       var target = $(e.target),' + lbr();
            html += '       ref = target.attr("data-widget-path");' + lbr();
            html += '       $("#menu a").removeClass("active");' + lbr();
            html += '       target.addClass("active");' + lbr();
            html += '       if (ref !== undefined) {' + lbr();
            html += '           $("#contentframe").attr("src", ref);' + lbr();
            html += '       }' + lbr();
            html += '});' + lbr();
            html += '</script>' + lbr();
            html += '</body>' + lbr();
            html += '</html>' + lbr();

            return html;

        }
    };

    var _prettify = true;

    function lbr(n) {
        var str = '';
        n = (n !== undefined) ? n : 1;
        if (_prettify === true) {
            for (var i = 0; i < n; i += 1) {
                str += '\n';
            }
        }
        return str;
    }

    function tab(n) {
        var str = '';
        if (_prettify === true) {
            for (var i = 0; i < n; i += 1) {
                str += '\t';
            }
        }
        return str;
    }

    module.exports = widgetLibraryPrepare;

})();
