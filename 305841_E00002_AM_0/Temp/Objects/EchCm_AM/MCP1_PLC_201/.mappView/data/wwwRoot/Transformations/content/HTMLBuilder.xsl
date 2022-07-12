<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Stylesheet to transform Content XML into HTML document
-->

<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:iat="http://www.br-automation.com/iat2015/contentDefinition/v2"
      xmlns:widget="http://www.br-automation.com/iat2014/widget"
      xmlns:types="http://www.br-automation.com/iat2015/widgetTypes/v2"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:msxsl="urn:schemas-microsoft-com:xslt"
      xmlns:scriptEx="urn:AcmeX.com:xslt"
      exclude-result-prefixes="iat widget xsi msxsl">

  <msxsl:script language="JScript" implements-prefix="scriptEx">
    <![CDATA[
  
    var backslash = "\\",
        backslash_regex = /\\/g,
        backslash_masked = "\\\\",
        lineBreak = "\\n",
        sequence = "\\u",
        sequence_masked = "\\\\u";

    function replaceBackslash(txt) {
        return txt.replace(backslash_regex, backslash_masked);
    }

    function protectLineBreak(txt) {
        var parts = txt.split(lineBreak);
        for (var i = 0; i < parts.length; i += 1) {
            parts[i] = replaceBackslash(parts[i]);
        }
        return parts.join(lineBreak);
    }

    function checkSequences(txt, replaceMethod) {
        var parts = txt.split(sequence),
            retVal = "";
        for (var i = 1; i < parts.length; i += 1) {
            if (isNaN(parseInt(parts[i].substring(0, 3), 16))) {
                retVal += sequence_masked + replaceMethod(parts[i]);
            } else {
                retVal += sequence + replaceMethod(parts[i]);
            }
        }
        return "" + replaceMethod(parts[0]) + retVal;
    }

    // mask all backslashes with \\ except of:
    // 1) unicode escape sequences like \u003E
    // 2) line breaks \n

    function handleBackslash(txt) {

        if (txt.indexOf(backslash) === -1) {
            return "" + txt;

        } else {
            var containsSequence = txt.indexOf(sequence) !== -1,
                containsLineBreak = txt.indexOf(lineBreak) !== -1;

            if (!containsSequence && !containsLineBreak) {
                return "" + replaceBackslash(txt);

            } else if (!containsSequence && containsLineBreak) {
                return "" + protectLineBreak(txt);

            } else if (containsSequence && !containsLineBreak) {
                return checkSequences(txt, replaceBackslash);

            } else {
                return checkSequences(txt, protectLineBreak);
            }
        }
    }
    
    function removeLeadingZeros(txt) {
      if (txt === "") {
            return "";
        }
        if (parseInt(txt, 10) === 0) {
            return "0";
        }
        var sign = "";
        if (txt.indexOf("+") === 0 || txt.indexOf("-") === 0) {
            sign = txt.substring(0, 1);
            txt = txt.substring(1);
        }
        while (txt.indexOf("0") === 0) {
            txt = txt.substring(1);
        }
        return "" + ((sign === "-") ? sign : "") + txt;
    }
    
    function replaceAll(str, find, replace) {
      return "" + str.replace(new RegExp(find, 'g'), replace);
    }
  
  ]]>
  </msxsl:script>

  <xsl:param name="elpathdelimiter">/</xsl:param>
  
  <!-- folder where to find widgets (exception: inner widgets of compoundwidgets) -->
  <xsl:param name="basepath">../../BRVisu/</xsl:param>

  <!-- setParentContent -->
  <!-- in the compoundwidget content transformation this is set to false: inner widgets get their parentContentId later from the compoundWidget instance -->
  <xsl:param name="setParentContent">true</xsl:param>

  <!-- widgetFolders: for compoundwidget content transformation: xml file, which contains all paths to used widgets inside the compoundwidget (created by compound_create) -->
  <xsl:param name="widgetFolders">none</xsl:param>

  <!-- coWiPrefix: for compoundwidget content transformation -->
  <xsl:param name="coWiPrefix">none</xsl:param>

  <!-- include in same directory, as href does not allow the use of a param -->
  <xsl:include href="HelperFunctions.xsl"/>

  <!-- separator for id decoration (e.g. contentID_widgetID) -->
  <xsl:variable name="separator" select="'_'" />

  <xsl:output method="xml"
              encoding="UTF-8"
              indent="no"
              omit-xml-declaration="yes" />
  <xsl:strip-space elements="*"/>

  <!-- ### entry point ### -->
  <xsl:template match="/">
    <xsl:param name="contentId" select="iat:Content/@id" />

    <!--transform all widget properties and wrap them in JS function calls in a script tag -->
    <xsl:element name="script">
      <!--select all widgets independent of hierarchy-->
      <xsl:for-each select="//iat:Widget">
        <xsl:call-template name="widgetOptions">
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:element>

    <!--transform all widgets html-->
    <xsl:variable name="htmlResult">
      <!--select only widgets of first level: nesting is handled recursively in template widgetHTML -->
      <xsl:for-each select="iat:Content/iat:Widgets/iat:Widget">
        <xsl:call-template name="widgetHTML">
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:variable>

    <!--modify html result-->
    <xsl:apply-templates mode="pass2" select="msxsl:node-set($htmlResult)/*"/>

  </xsl:template>

  <!-- modifications of resulting html, e.g. allow self closing tags and strip not allowed tags (html, body, etc)-->
  <xsl:template match="*" mode="pass2">
    <xsl:choose>
      <xsl:when test="name()='area' or name()='br' or name()='col' or name()='command' or name()='embed' or name()='hr' or name()='img' or name()='input' or name()='keygen' or name()='param' or name()='source' or name()='track' or name()='wbr'">
        <xsl:element name="{name()}">
          <xsl:copy-of select="@*"/>
        </xsl:element>
      </xsl:when>
      <xsl:when test="name()!='html' and name()!='head' and name()!='meta' and name()!='link' and name()!='title' and name()!='base' and name()!='body' and name()!='style'">
        <xsl:element name="{name()}">
          <xsl:copy-of select="@*"/>
          <xsl:apply-templates mode="pass2"></xsl:apply-templates>
          <xsl:value-of select="''"/>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- ### template to create the html elements ### -->
  <xsl:template name="widgetHTML">
    <xsl:param name="contentId" />

    <xsl:variable name="widgetId" select="@id" />
    <xsl:variable name="xsiType" select="@xsi:type" />

    <!-- extract widget name without namespace from xsi:type, e.g. Button from widgets.brease.Button -->
    <xsl:variable name="widgetName">
      <xsl:call-template name="getWidgetName">
        <xsl:with-param name="xsiType" select="$xsiType" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to widget type with slashes, e.g. widgets.brease.Button to widgets/brease/Button -->
    <xsl:variable name="widgetType">
      <xsl:call-template name="getWidgetType">
        <xsl:with-param name="xsiType" select="$xsiType" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to widget path with elpathdelimiter and without widgets/, e.g. widgets.brease.Button to brease/Button -->
    <xsl:variable name="widgetPath">
      <xsl:call-template name="getWidgetPath">
        <xsl:with-param name="xsiType" select="$xsiType" />
        <xsl:with-param name="elpathdelimiter" select="$elpathdelimiter"/>
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to style path with underscore -->
    <xsl:variable name="stylePath">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="@xsi:type" />
        <xsl:with-param name="replace" select="'.'" />
        <xsl:with-param name="by" select="'_'" />
      </xsl:call-template>
    </xsl:variable>

    <!-- generate style name for html-attribute 'class' -->
    <xsl:variable name="styleName">
      <xsl:choose>
        <xsl:when test="@style">
          <xsl:value-of select="concat($stylePath,'_style_',@style)"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat($stylePath,'_style_default')"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="pathToWidgetFolder">
      <xsl:call-template name="getPathToWidgetFolder">
        <xsl:with-param name="basepath" select="$basepath" />
        <xsl:with-param name="widgetFolders" select="$widgetFolders" />
        <xsl:with-param name="xsiType" select="$xsiType" />
        <xsl:with-param name="elpathdelimiter" select="$elpathdelimiter"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="pathToWidgetFile">
      <xsl:value-of select="concat($pathToWidgetFolder,'meta',$elpathdelimiter,$widgetName,'.widget')" />
    </xsl:variable>

    <xsl:variable name="pathToContentFile">
      <xsl:value-of select="concat($pathToWidgetFolder,'content',$elpathdelimiter,'widgets.html')" />
    </xsl:variable>

    <xsl:variable name="htmlFilePath">
      <xsl:call-template name="get-html-path">
        <xsl:with-param name="basepath" select="$basepath" />
        <xsl:with-param name="xsiType" select="$xsiType" />
        <xsl:with-param name="widgetPath" select="$widgetPath" />
        <xsl:with-param name="widgetName" select="$widgetName" />
        <xsl:with-param name="superClass" select="document($pathToWidgetFile)//widget:Inheritance/widget:Class[@level='1']/text()" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="htmlNode" select="document($htmlFilePath)/*[1]"></xsl:variable>

    <!-- get HTML-tag name from widget html file -->
    <xsl:variable name="elemName">
      <xsl:value-of select="name($htmlNode)"/>
    </xsl:variable>
    <xsl:variable name="useDOM">
      <xsl:value-of select="$htmlNode/@data-instruction-useDOM"/>
    </xsl:variable>
    <xsl:variable name="addStyleClass">
      <xsl:value-of select="$htmlNode/@data-instruction-addStyleClass"/>
    </xsl:variable>
    <xsl:variable name="loadContent">
      <xsl:value-of select="$htmlNode/@data-instruction-loadContent"/>
    </xsl:variable>

    <!-- creating the element with attributes (id, data-brease-widget, etc -->
    <xsl:element name="{$elemName}">
      <xsl:call-template name="htmlAttributes">
        <xsl:with-param name="elemName" select="$elemName" />
        <xsl:with-param name="contentId" select="$contentId" />
        <xsl:with-param name="widgetId" select="$widgetId" />
        <xsl:with-param name="widgetType" select="$widgetType" />
        <xsl:with-param name="addStyleClass" select="$addStyleClass" />
      </xsl:call-template>

      <!-- use html-file for specified widgets [data-instruction-useDOM='true'] -->
      <xsl:if test="$useDOM='true' or $addStyleClass='true'">
        <xsl:for-each select="document($htmlFilePath)/*[1]">
          <xsl:call-template name="modifyDOM">
            <xsl:with-param name="styleName" select="$styleName" />
            <xsl:with-param name="addStyleClass" select="$addStyleClass" />
            <xsl:with-param name="useDOM" select="$useDOM" />
            <xsl:with-param name="widgetId" select="concat($contentId,'_',$widgetId)" />
          </xsl:call-template>
        </xsl:for-each>
      </xsl:if>

      <!-- load content file for specified widgets [data-instruction-loadContent='true'], e.g. CompoundWidgets -->
      <xsl:if test="$loadContent='true'">

        <xsl:variable name="cowiId" select="concat($contentId,'_',$widgetId)"/>
        <xsl:variable name="content" select="document($pathToContentFile)/*[1]"/>

        <xsl:for-each select="$content//script">
          <xsl:element name="script">
            <xsl:value-of select="scriptEx:replaceAll(string(./text()),'{COWI_ID}', $cowiId)" />
          </xsl:element>
        </xsl:for-each>

        <xsl:for-each select="$content/*">
          <xsl:call-template name="copyWidgetContent">
            <xsl:with-param name="widgetId" select="$cowiId" />
            <xsl:with-param name="idPlaceholder" select="'{COWI_ID}'" />
          </xsl:call-template>
        </xsl:for-each>
      </xsl:if>
    </xsl:element>
  </xsl:template>

  <!-- for children of CompoundWidgets (recursive) -->
  <xsl:template name="copyWidgetContent">
    <xsl:param name="widgetId" />
    <xsl:param name="idPlaceholder" />
    <xsl:variable name="elName" select="name()"/>
    <xsl:variable name="id" select="@id"/>

    <xsl:if test="$elName!='script'">
      <xsl:element name="{$elName}">
        <xsl:if test="@id">
          <xsl:attribute name="id">
            <xsl:value-of select="scriptEx:replaceAll(string($id), $idPlaceholder, string($widgetId))" />
          </xsl:attribute>
        </xsl:if>
        <xsl:for-each select="@*">
          <xsl:if test="name()!='id'">
            <xsl:attribute name="{name()}">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:if>
        </xsl:for-each>
        <xsl:for-each select="./*">
          <xsl:call-template name="copyWidgetContent">
            <xsl:with-param name="widgetId" select="$widgetId" />
            <xsl:with-param name="idPlaceholder" select="$idPlaceholder" />
          </xsl:call-template>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>


  <!-- template to create the attributes of the html-element -->
  <xsl:template name="htmlAttributes">

    <xsl:param name="elemName" />
    <xsl:param name="contentId" />
    <xsl:param name="widgetId" />
    <xsl:param name="widgetType" />

    <xsl:attribute name="id">
      <xsl:value-of select="$contentId"/>
      <xsl:value-of select="$separator" />
      <xsl:value-of select="$widgetId"/>
    </xsl:attribute>

    <xsl:attribute name="data-brease-widget">
      <xsl:value-of select="$widgetType"/>
    </xsl:attribute>

    <!--insert width/height for canvas if available-->
    <xsl:if test="$elemName = 'canvas'">
      <xsl:if test="@width">
        <xsl:attribute name="width">
          <xsl:value-of select="@width"/>
        </xsl:attribute>
      </xsl:if>
      <xsl:if test="@height">
        <xsl:attribute name="height">
          <xsl:value-of select="@height"/>
        </xsl:attribute>
      </xsl:if>
    </xsl:if>

    <xsl:if test="iat:Widgets/iat:Widget">
      <!-- recursive call of the widget template to handle child widgets -->
      <xsl:for-each select="iat:Widgets/iat:Widget">
        <xsl:call-template name="widgetHTML">
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <!-- use DOM of HTML file for widgets with useDOM=true-->
  <xsl:template name="modifyDOM">
    <xsl:param name="styleName" />
    <xsl:param name="addStyleClass" />
    <xsl:param name="useDOM" />
    <xsl:param name="widgetId" />
    <xsl:if test="$useDOM='true'">
      <xsl:copy-of select="@*[name()!='id' and name()!='class' and name()!='data-brease-widget' and substring(name(), 0, 17)!='data-instruction']"/>
    </xsl:if>
    <!-- add style class to attribute 'class': -->
    <xsl:if test="$addStyleClass='true'">
      <xsl:attribute name="class">
        <xsl:choose>
          <xsl:when test="@class">
            <xsl:value-of select="concat(@class,' ',$styleName)"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="$styleName"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
    </xsl:if>
    <xsl:if test="$addStyleClass!='true' and @class">
      <xsl:attribute name="class">
        <xsl:value-of select="@class"/>
      </xsl:attribute>
    </xsl:if>
    <xsl:if test="$useDOM='true'">
      <xsl:for-each select="/*/*">
        <xsl:call-template name="copyWidgetContent">
          <xsl:with-param name="widgetId" select="$widgetId" />
          <xsl:with-param name="idPlaceholder" select="'{WIDGET_ID}'" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <!-- ### widget options in JSON notation ### -->
  <xsl:template name="widgetOptions">
    <xsl:param name="contentId" />

    <xsl:variable name="widgetId" select="@id" />

    <!-- widgetId decorated with contentId -->
    <xsl:variable name="fullWidgetId">
      <xsl:value-of select="$contentId"/>
      <xsl:value-of select="$separator" />
      <xsl:value-of select="$widgetId"/>
    </xsl:variable>

    <!-- xsi:type: widget type in dot-notation, e.g. widgets.brease.Button -->
    <xsl:variable name="xsiType" select="@xsi:type" />

    <!-- extract widget name without namespace from xsi:type, e.g. Button from widgets.brease.Button -->
    <xsl:variable name="widgetName">
      <xsl:call-template name="getWidgetName">
        <xsl:with-param name="xsiType" select="$xsiType" />
      </xsl:call-template>
    </xsl:variable>

    <!-- convert xsi:type to widget type with slashes, e.g. widgets.brease.Button to widgets/brease/Button -->
    <xsl:variable name="widgetType">
      <xsl:call-template name="getWidgetType">
        <xsl:with-param name="xsiType" select="$xsiType" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="pathToWidgetFolder">
      <xsl:call-template name="getPathToWidgetFolder">
        <xsl:with-param name="basepath" select="$basepath" />
        <xsl:with-param name="widgetFolders" select="$widgetFolders" />
        <xsl:with-param name="xsiType" select="$xsiType" />
        <xsl:with-param name="elpathdelimiter" select="$elpathdelimiter"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="pathToWidgetFile">
      <xsl:value-of select="concat($pathToWidgetFolder,'meta',$elpathdelimiter,$widgetName,'.widget')" />
    </xsl:variable>

    <xsl:variable name="pathToHtmlFile">
      <xsl:value-of select="concat($pathToWidgetFolder,$widgetName,'.html')" />
    </xsl:variable>

    <xsl:variable name="htmlNode" select="document($pathToHtmlFile)/*[1]"></xsl:variable>

    <!-- get HTML-tag name from widget html file -->
    <xsl:variable name="elemName">
      <xsl:value-of select="name($htmlNode)"/>
    </xsl:variable>
    <xsl:variable name="addStyleClass">
      <xsl:value-of select="$htmlNode/@data-instruction-addStyleClass"/>
    </xsl:variable>

    <xsl:text>brease.setOptions("</xsl:text>
    <xsl:value-of select="$fullWidgetId"/>
    <xsl:text>",</xsl:text>

    <!-- insert properties as JSON -->
    <xsl:text>{</xsl:text>
    <xsl:for-each select="@*">
      <xsl:if test="not(name()='id') and not(name()='xsi:type')">
        <xsl:variable name="parseResult">
          <xsl:call-template name="parseProperty">
            <xsl:with-param name="pathToWidgetFile" select="$pathToWidgetFile" />
            <xsl:with-param name="widgetType" select="$widgetType" />
            <xsl:with-param name="quote">"</xsl:with-param>
            <xsl:with-param name="contentId" select="$contentId" />
          </xsl:call-template>
        </xsl:variable>

        <xsl:if test="not(string-length($parseResult)=0)">
          <xsl:value-of select="$parseResult"/>
          <xsl:text>,</xsl:text>

        </xsl:if>
      </xsl:if>
    </xsl:for-each>

    <!-- convert element based array properties to JSON array -->
    <xsl:for-each select="iat:Properties/*">
      <xsl:call-template name="parseElements">
        <xsl:with-param name="pathToWidgetFile" select="$pathToWidgetFile" />
        <xsl:with-param name="widgetType" select="$widgetType" />
        <xsl:with-param name="quote" >"</xsl:with-param>
        <xsl:with-param name="contentId" select="$contentId" />
        <xsl:with-param name="widgetId" select="$widgetId" />
      </xsl:call-template>
    </xsl:for-each>

    <xsl:text>"className":"</xsl:text>
    <xsl:value-of select="$widgetType"/>
    <xsl:text>"</xsl:text>

    <xsl:if test="$setParentContent='true'">
      <xsl:text>,"parentContentId":"</xsl:text>
      <xsl:value-of select="$contentId"/>
      <xsl:text>"</xsl:text>
    </xsl:if>
    
    <!-- inside a cowi (=running transformation with coWiPrefix) 
    add a reference to the cowi itself for all children -->
    <xsl:if test="$coWiPrefix!='none'">
      <xsl:text>,"parentCoWiId":"{COWI_ID}"</xsl:text>
    </xsl:if>

    <xsl:if test="$addStyleClass='true'">
      <xsl:text>,"styleClassAdded":true</xsl:text>
    </xsl:if>
    <xsl:text>});
</xsl:text>

  </xsl:template>

  <!-- template to handle the properties based on property type -->
  <xsl:template name="parseProperty">
    <xsl:param name="pathToWidgetFile" />
    <xsl:param name="widgetType" />
    <xsl:param name="quote" />
    <xsl:param name="contentId" />

    <xsl:variable name="propertyName" select="name()"/>
    <xsl:variable name="propertyType" select="document($pathToWidgetFile)//widget:Property[@name=$propertyName]/@type" />

    <xsl:variable name="widgetRefPrefix">
      <xsl:choose>
        <xsl:when test="$coWiPrefix!='none'">
          <xsl:value-of select="$coWiPrefix" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$contentId" />
          <xsl:value-of select="$separator" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="propType">
      <xsl:choose>
        <xsl:when test="$propertyType">
          <xsl:value-of select="$propertyType"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="document($pathToWidgetFile)//widget:StyleProperty[@name=$propertyName]/@type"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <!-- check if property value is not empty -->
    <!-- allow empty value for String and PropertyCollection -->
    <xsl:if test="not(string-length(.)=0) or $propType='String' or $propType='RoleCollection'">

      <xsl:value-of select="$quote"/>
      <xsl:value-of select="$propertyName"/>
      <xsl:value-of select="$quote"/>
      <xsl:text>: </xsl:text>
      <xsl:choose>

        <!-- string type -->
        <xsl:when test="$propType='String' or $propType='RegEx'">
          <xsl:value-of select="$quote"/>
          <xsl:call-template name="string-replace-specialAndQuote">
            <xsl:with-param name="text" select="string(.)" />
            <xsl:with-param name="quote" select="$quote" />
          </xsl:call-template>
          <xsl:value-of select="$quote"/>
        </xsl:when>

        <!-- decimal types -->
        <xsl:when test="$propType='Number' or $propType='UNumber' or $propType='Double' or $propType='Opacity' or $propType='Percentage'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- integer types -->
        <xsl:when test="$propType='Integer' or $propType='UInteger' or $propType='Index'">
          <xsl:value-of select="scriptEx:removeLeadingZeros(string(.))"/>
        </xsl:when>

        <!-- ambiguous types -->
        <xsl:when test="$propType='Size' and substring(.,string-length(.))='%'">
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="."/>
          <xsl:value-of select="$quote"/>
        </xsl:when>
        <xsl:when test="$propType='Size'">
          <xsl:value-of select="scriptEx:removeLeadingZeros(string(.))"/>
        </xsl:when>

        <xsl:when test="$propType='AutoSize' and string(.)='auto'">
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="."/>
          <xsl:value-of select="$quote"/>
        </xsl:when>
        <xsl:when test="$propType='AutoSize' and substring(.,string-length(.))='%'">
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="."/>
          <xsl:value-of select="$quote"/>
        </xsl:when>
        <xsl:when test="$propType='AutoSize'">
          <xsl:value-of select="scriptEx:removeLeadingZeros(string(.))"/>
        </xsl:when>

        <!-- boolean types -->
        <xsl:when test="$propType='Boolean'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- empty string for RoleCollection; none empty RoleCollection is object type -->
        <xsl:when test="$propType='RoleCollection' and string-length(.)=0">
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="$quote"/>
        </xsl:when>

        <!-- object types -->
        <xsl:when test="$propType='Object' or $propType='ContentCollection' or $propType='brease.config.MeasurementSystemUnit' or $propType='brease.config.MeasurementSystemFormat' or $propType='brease.datatype.Notification' or $propType='brease.datatype.Node' or $propType='brease.datatype.ArrayNode'">
          <xsl:value-of select="."/>
        </xsl:when>

        <!-- array types -->
        <xsl:when test="$propType='Array' or $propType='RoleCollection' or $propType='GraphicCollection'">
          <xsl:value-of select="."/>
        </xsl:when>
        <xsl:when test="$propType='ItemCollection' or $propType='StepItemStyleReferenceCollection'">
          <xsl:call-template name="string-replace-special">
            <xsl:with-param name="text" select="." />
          </xsl:call-template>
        </xsl:when>

        <!-- list types -->
        <xsl:when test="$propType='StringList'">
          <xsl:text>[</xsl:text>
          <xsl:call-template name="string-replace-specialAndQuote">
            <xsl:with-param name="text" select="string(.)" />
            <xsl:with-param name="quote" select="$quote" />
          </xsl:call-template>
          <xsl:text>]</xsl:text>
        </xsl:when>
        <xsl:when test="$propType='IntegerList'">
          <xsl:text>[</xsl:text>
          <xsl:value-of select="."/>
          <xsl:text>]</xsl:text>
        </xsl:when>

        <!-- file path types -->
        <xsl:when test="$propType='ImagePath' or $propType='PdfPath' or $propType='DirectoryPath'">
          <xsl:value-of select="$quote"/>
          <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="." />
            <xsl:with-param name="replace" select="' '" />
            <xsl:with-param name="by" select="'%20'" />
          </xsl:call-template>
          <xsl:value-of select="$quote"/>
        </xsl:when>

        <!-- widget reference -->
        <xsl:when test="$propType='WidgetReference'">
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="$widgetRefPrefix"/>
          <xsl:value-of select="."/>
          <xsl:value-of select="$quote"/>
        </xsl:when>

        <!-- string based types (e.g. enums) -->
        <xsl:otherwise>
          <xsl:value-of select="$quote"/>
          <xsl:value-of select="."/>
          <xsl:value-of select="$quote"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>

  </xsl:template>

  <xsl:template name="parseElements">
    <xsl:param name="pathToWidgetFile" />
    <xsl:param name="quote" />
    <xsl:param name="contentId" />
    <xsl:param name="widgetId" />
    <xsl:param name="widgetType" />

    <xsl:variable name="propertyName" select="name()"/>

    <xsl:value-of select="$quote" />
    <xsl:value-of select="$propertyName"></xsl:value-of>
    <xsl:value-of select="$quote" />

    <!-- Properties with Array Datatypes -->
    <xsl:if test="./types:Element">
      <xsl:text>:[</xsl:text>

      <xsl:for-each select="./types:Element">
        <xsl:call-template name="elementValue">
          <xsl:with-param name="value" select="@value" />
          <xsl:with-param name="propType" select="document($pathToWidgetFile)//widget:Property[@name=$propertyName]/@type" />
          <xsl:with-param name="quote">"</xsl:with-param>
        </xsl:call-template>
        <xsl:if test="not(position()=last())">
          <xsl:text>,</xsl:text>
        </xsl:if>
      </xsl:for-each>
      <xsl:text>],</xsl:text>
    </xsl:if>

    <!-- Property Collections -->
    <xsl:if test="iat:Element">
      <xsl:text>:{</xsl:text>

      <xsl:for-each select="iat:Element">
        <xsl:value-of select="$quote" />
        <xsl:value-of select="$contentId"/>
        <xsl:value-of select="$separator" />
        <xsl:value-of select="$widgetId"/>
        <xsl:value-of select="$separator" />
        <xsl:value-of select="name(..)" />
        <xsl:value-of select="$separator" />
        <xsl:value-of select="@id"/>
        <xsl:value-of select="$quote" />
        <xsl:text>:{</xsl:text>
        <!-- insert properties as JSON -->
        <xsl:for-each select="@*">
          <xsl:if test="not(name()='id')">
            <xsl:call-template name="parseProperty">
              <xsl:with-param name="pathToWidgetFile" select="$pathToWidgetFile" />
              <xsl:with-param name="widgetType" select="$widgetType" />
              <xsl:with-param name="quote">"</xsl:with-param>
              <xsl:with-param name="contentId" select="$contentId" />
            </xsl:call-template>
            <xsl:if test="not(position()=last())">
              <xsl:text>,</xsl:text>
            </xsl:if>
          </xsl:if>
        </xsl:for-each>
        <!-- array property -->
        <xsl:if test="./iat:Properties">
          <xsl:text>, </xsl:text>
          <xsl:for-each select="./iat:Properties/*">
            <xsl:variable name="arrayPropertyName" select="name()"/>

            <xsl:value-of select="$quote" />
            <xsl:value-of select="$arrayPropertyName"></xsl:value-of>

            <xsl:if test="./types:Element">
              <xsl:text>":[</xsl:text>
              <xsl:for-each select="./types:Element">
                <xsl:call-template name="elementValue">
                  <xsl:with-param name="value" select="@value" />
                  <xsl:with-param name="propType" select="document($pathToWidgetFile)//widget:Property[@name=$arrayPropertyName]/@type" />
                  <xsl:with-param name="quote">"</xsl:with-param>
                </xsl:call-template>
                <xsl:if test="not(position()=last())">
                  <xsl:text>, </xsl:text>
                </xsl:if>
              </xsl:for-each>
              <xsl:text>]</xsl:text>
            </xsl:if>
          </xsl:for-each>
        </xsl:if>
        <xsl:text>}</xsl:text>
        <xsl:if test="not(position()=last())">
          <xsl:text>,</xsl:text>
        </xsl:if>
      </xsl:for-each>
      <xsl:text>},</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template name="elementValue">
    <xsl:param name="value" />
    <xsl:param name="propType" />
    <xsl:param name="quote" />

    <xsl:choose>
      <xsl:when test="$propType='StringArray1D'">
        <xsl:text>"</xsl:text>
        <xsl:call-template name="string-replace-specialAndQuote">
          <xsl:with-param name="text" select="string($value)" />
          <xsl:with-param name="quote" select="$quote" />
        </xsl:call-template>
        <xsl:text>"</xsl:text>
      </xsl:when>
      <xsl:when test="$propType='DateTimeArray1D'">
        <xsl:text>"</xsl:text>
        <xsl:value-of select="$value"/>
        <xsl:text>"</xsl:text>
      </xsl:when>
      <xsl:when test="$propType='NumberArray1D'">
        <xsl:value-of select="$value"/>
      </xsl:when>
      <xsl:when test="$propType='BooleanArray1D'">
        <xsl:value-of select="$value"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>"</xsl:text>
        <xsl:value-of select="$value"/>
        <xsl:text>"</xsl:text>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!--### HELPER templates ### -->

  <!-- replace html entities and doublequote(") -->
  <xsl:template name="string-replace-specialAndQuote">
    <xsl:param name="text" />
    <xsl:param name="quote" />

    <xsl:variable name="replace1" select="scriptEx:handleBackslash($text)" />

    <xsl:variable name="replace2">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="$replace1" />
        <xsl:with-param name="replace" select="$quote" />
        <xsl:with-param name="by">
          <xsl:text>\</xsl:text>
          <xsl:value-of select="$quote"/>
        </xsl:with-param>
      </xsl:call-template>
    </xsl:variable>

    <xsl:call-template name="string-replace-special">
      <xsl:with-param name="text" select="$replace2" />
    </xsl:call-template>

  </xsl:template>

  <!-- replace html entities -->
  <xsl:template name="string-replace-special">
    <xsl:param name="text" />

    <xsl:variable name="replace1">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="$text" />
        <xsl:with-param name="replace" select="'&gt;'" />
        <xsl:with-param name="by" select="'\u003E'" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="replace2">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="$replace1" />
        <xsl:with-param name="replace" select="'&lt;'" />
        <xsl:with-param name="by" select="'\u003C'" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="$replace2" />
      <xsl:with-param name="replace" select="'&amp;'" />
      <xsl:with-param name="by" select="'\u0026'" />
    </xsl:call-template>

  </xsl:template>

  <!-- find HTML file for widget (optional with inheritance) -->
  <!-- normal content: all widgets can be found under basepath (that is BRVisu/widgets/) (brease widgets, custom widgets and compound and derived widgets are copied to this folder) -->
  <!-- inner content of compoundwidget: widget paths are described in widgetPathMapping -->
  <xsl:template name="get-html-path">
    <xsl:param name="basepath" />
    <xsl:param name="xsiType" />
    <xsl:param name="widgetPath" />
    <xsl:param name="widgetName" />
    <xsl:param name="superClass" />

    <xsl:variable name="filePath">
      <xsl:choose>
        <xsl:when test="$widgetFolders!='none'">
          <xsl:variable name="widgetPathMapping" select="document($widgetFolders)" />
          <xsl:value-of select="concat($widgetPathMapping//Widget[@type=$xsiType]/@path,$widgetPath,$elpathdelimiter,$widgetName,'.html')" />
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="concat($basepath,'widgets',$elpathdelimiter,$widgetPath,$elpathdelimiter,$widgetName,'.html')" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="document($filePath)/*[1]/@data-instruction-inherit='true'">

        <xsl:variable name="superClassPath">
          <xsl:call-template name="getWidgetPath">
            <xsl:with-param name="xsiType" select="$superClass" />
            <xsl:with-param name="elpathdelimiter" select="$elpathdelimiter"/>
          </xsl:call-template>
        </xsl:variable>

        <xsl:variable name="superClassName">
          <xsl:call-template name="getWidgetName">
            <xsl:with-param name="xsiType" select="$superClass" />
          </xsl:call-template>
        </xsl:variable>

        <xsl:variable name="superClassWidgetFile" select="concat($basepath,'widgets',$elpathdelimiter,$superClassPath,$elpathdelimiter,'meta',$elpathdelimiter,$superClassName,'.widget')"></xsl:variable>
        <xsl:call-template name="get-html-path">
          <xsl:with-param name="basepath" select="$basepath" />
          <xsl:with-param name="xsiType" select="$superClass" />
          <xsl:with-param name="widgetPath" select="$superClassPath" />
          <xsl:with-param name="widgetName" select="$superClassName" />
          <xsl:with-param name="superClass" select="document($superClassWidgetFile)//widget:Inheritance/widget:Class[@level='1']/text()" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$filePath" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
