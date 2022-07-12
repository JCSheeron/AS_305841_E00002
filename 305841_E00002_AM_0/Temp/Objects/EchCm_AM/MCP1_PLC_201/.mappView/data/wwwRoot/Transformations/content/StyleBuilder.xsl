<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Stylesheet to transform XML Content definition into CSS (scss)
// Generates id-selectors for all widgets in a content
-->

<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:iat="http://www.br-automation.com/iat2015/contentDefinition/v2"
      xmlns:widget="http://www.br-automation.com/iat2014/widget"
      xmlns:msxsl="urn:schemas-microsoft-com:xslt"
      xmlns:scriptEx="urn:AcmeX.com:xslt"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

      <msxsl:script language="JScript" implements-prefix="scriptEx">
    <![CDATA[
  
    var id_regex= /\{ID_PREFIX\}/g;
    
    function replaceId(txt, by){
      return "" + txt.replace(id_regex, by);
    }
  
  ]]>
  </msxsl:script>

  <xsl:output method="text" encoding="UTF-8" indent="yes" />

  <!-- param 'elpathdelimiter' for the use in e.g. Linux -->
  <xsl:param name="elpathdelimiter">/</xsl:param>
  <xsl:param name="basepath">../../BRVisu/</xsl:param>
  <xsl:param name="widgetFolders">none</xsl:param>
  <xsl:param name="editor">false</xsl:param>

  <!-- include in same directory, as href does not allow the use of a param-->
  <xsl:include href="HelperFunctions.xsl"/>

  <!-- entry point -->
  <xsl:template match="/iat:Content">
    <xsl:param name="contentId" select="./@id" />
    <xsl:text>@import "mixins.scss";&#xa;</xsl:text>

    <xsl:for-each select="iat:Widgets/iat:Widget">
      <xsl:call-template name="widget">
        <xsl:with-param name="contentId" select="$contentId" />
      </xsl:call-template>
    </xsl:for-each>

  </xsl:template>

  <xsl:template name="widget">
    <xsl:param name="contentId" />
    <xsl:variable name="xsiType" select="@xsi:type" />

    <!-- extract widget name without namespace from xsi:type, e.g. Button from widgets.brease.Button -->
    <xsl:variable name="widgetName">
      <xsl:call-template name="getWidgetName">
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

    <xsl:variable name="widgetId" select="@id"></xsl:variable>

    <xsl:variable name="isCompound" select="document($pathToWidgetFile)//widget:ASEngineeringInfo/widget:IsCompound/text()"></xsl:variable>
    <xsl:variable name="widgetFileWidgetElement" select="document($pathToWidgetFile)/widget:WidgetLibrary/widget:Widget"></xsl:variable>

    <xsl:for-each select="@*">
      <xsl:if test="not(name()='id') and not(name()='xsi:type')">
        <xsl:call-template name="properties">
          <xsl:with-param name="styleProperties" select="$widgetFileWidgetElement/widget:StyleProperties" />
          <xsl:with-param name="id" select="$widgetId" />
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:if>
    </xsl:for-each>

    
    <xsl:if test="$isCompound='true' and $editor!='true'">
      <xsl:variable name="idPrefix" select="concat($contentId,'_',$widgetId,'Θ')"/>
      <xsl:variable name="css" select="document(concat($pathToWidgetFolder,'content',$elpathdelimiter,'widgets_css.xml'))//style/text()"></xsl:variable>
      <xsl:value-of select="scriptEx:replaceId(string($css),$idPrefix)" />
    </xsl:if>

    <xsl:if test="iat:Properties/*/iat:Element">
      <!-- handle structured properties -->
      <xsl:for-each select="iat:Properties/*/iat:Element">
        <xsl:variable name="propName" select="name(..)"/>
        <xsl:for-each select="@*">
          <xsl:if test="not(name()='id')">
            <xsl:call-template name="properties">
              <xsl:with-param name="styleProperties" select="$widgetFileWidgetElement/widget:StructuredProperties/widget:StructuredProperty[@name=$propName]/widget:StyleProperties" />
              <!--{contentId}_{widgetId}_{propName}_{propElementId}-->
              <!--sampleContent_StructuredPropertyW1_Axis_ax1-->
              <xsl:with-param name="id" select="concat($widgetId, '_', $propName, '_', ../@id)" />
              <xsl:with-param name="contentId" select="$contentId" />
            </xsl:call-template>
          </xsl:if>
        </xsl:for-each>
      </xsl:for-each>
    </xsl:if>

    <xsl:if test="iat:Widgets/iat:Widget">
      <!-- recursive call to handle nested widgets -->
      <xsl:for-each select="iat:Widgets/iat:Widget">
        <xsl:call-template name="widget">
          <xsl:with-param name="contentId" select="$contentId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <!-- handle all properties with values: read definition of styleproperty in .widget file -->
  <xsl:template name="properties">
    <xsl:param name="styleProperties" />
    <xsl:param name="id" />
    <xsl:param name="contentId" />
    <xsl:variable name="propertyName" select="name()"/>
    <xsl:variable name="propertyValue" select="."/>

    <!--
    <xsl:message>
      <xsl:for-each select="$styleProperties/descendant-or-self::*">
        <xsl:value-of select="name(.)"/> /
      </xsl:for-each>
    </xsl:message>
-->
    <xsl:for-each select="$styleProperties/widget:StyleProperty[@name=$propertyName]/widget:StyleElement">
      <xsl:choose>
        <xsl:when test="@indexed">
          <xsl:call-template name="generateDynamicSelectors">
            <xsl:with-param name="contentId" select="$contentId" />
            <xsl:with-param name="id" select="$id" />
            <xsl:with-param name="value" select="$propertyValue" />
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:call-template name="generateStaticSelector">
            <xsl:with-param name="contentId" select="$contentId" />
            <xsl:with-param name="id" select="$id" />
            <xsl:with-param name="value" select="$propertyValue" />
          </xsl:call-template>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:for-each>

  </xsl:template>

  <xsl:template name="generateStaticSelector">
    <xsl:param name="contentId" />
    <xsl:param name="id" />
    <xsl:param name="value" />

    <xsl:call-template name="widgetSelector">
      <xsl:with-param name="contentId" select="$contentId" />
      <xsl:with-param name="id" select="$id" />
      <xsl:with-param name="suffix" select="@idsuffix" />
    </xsl:call-template>
    <xsl:text> {&#xa;</xsl:text>

    <xsl:choose>
      <xsl:when test="not(@selector) or @selector=''">
        <xsl:text>&#x9;</xsl:text>
        <xsl:call-template name="generateValue">
          <xsl:with-param name="value" select="$value" />
          <xsl:with-param name="attribute" select="@attribute" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>&#x9;</xsl:text>
        <xsl:value-of select="@selector"/>
        <xsl:text>{&#xa;&#x9;</xsl:text>
        <xsl:call-template name="generateValue">
          <xsl:with-param name="value" select="$value" />
          <xsl:with-param name="attribute" select="@attribute" />
        </xsl:call-template>
        <xsl:text>&#x9;}&#xa;</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:text>}&#xa;</xsl:text>
  </xsl:template>

  <xsl:template name="generateDynamicSelectors">
    <xsl:param name="contentId" />
    <xsl:param name="id" />
    <xsl:param name="value" />

    <xsl:variable name="listLength">
      <xsl:call-template name="get-list-length">
        <xsl:with-param name="value" select="$value" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:call-template name="dynamicLines">
      <xsl:with-param name="pStart" select="1"/>
      <xsl:with-param name="pEnd" select="$listLength"/>
      <xsl:with-param name="contentId" select="$contentId" />
      <xsl:with-param name="id" select="$id" />
      <xsl:with-param name="value" select="$value" />
      <xsl:with-param name="attribute" select="@attribute" />
      <xsl:with-param name="selector" select="@selector" />
      <xsl:with-param name="suffix" select="@idsuffix" />
    </xsl:call-template>

  </xsl:template>

  <xsl:template name="dynamicLines">
    <xsl:param name="pStart"/>
    <xsl:param name="pEnd"/>
    <xsl:param name="contentId" />
    <xsl:param name="id" />
    <xsl:param name="value" />
    <xsl:param name="attribute" />
    <xsl:param name="selector" />
    <xsl:param name="suffix" />

    <xsl:if test="not($pStart > $pEnd)">
      <xsl:choose>
        <xsl:when test="$pStart = $pEnd">

          <xsl:variable name="index" select="$pStart"/>
          <xsl:variable name="replacedAttribute">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$attribute" />
              <xsl:with-param name="replace" select="'$index'" />
              <xsl:with-param name="by" select="$index" />
            </xsl:call-template>
          </xsl:variable>
          <xsl:variable name="replacedSelector">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$selector" />
              <xsl:with-param name="replace" select="'$index'" />
              <xsl:with-param name="by" select="$index" />
            </xsl:call-template>
          </xsl:variable>

          <xsl:call-template name="widgetSelector">
            <xsl:with-param name="contentId" select="$contentId" />
            <xsl:with-param name="id" select="$id" />
            <xsl:with-param name="suffix" select="$suffix" />
          </xsl:call-template>

          <xsl:text> {&#xa;&#x9;</xsl:text>
          <xsl:value-of select="$replacedSelector"/>
          <xsl:text>{&#xa;&#x9;&#x9;</xsl:text>

          <xsl:call-template name="generateValue">
            <xsl:with-param name="value" select="$value" />
            <xsl:with-param name="attribute" select="$replacedAttribute" />
          </xsl:call-template>
          <xsl:text>&#x9;}&#xa;}&#xa;</xsl:text>

        </xsl:when>
        <xsl:otherwise>
          <xsl:variable name="vMid" select="floor(($pStart + $pEnd) div 2)"/>
          <xsl:call-template name="dynamicLines">
            <xsl:with-param name="pStart" select="$pStart"/>
            <xsl:with-param name="pEnd" select="$vMid"/>
            <xsl:with-param name="contentId" select="$contentId" />
            <xsl:with-param name="id" select="$id" />
            <xsl:with-param name="value" select="$value" />
            <xsl:with-param name="attribute" select="$attribute" />
            <xsl:with-param name="selector" select="$selector" />
            <xsl:with-param name="suffix" select="$suffix" />
          </xsl:call-template>
          <xsl:call-template name="dynamicLines">
            <xsl:with-param name="pStart" select="$vMid+1"/>
            <xsl:with-param name="pEnd" select="$pEnd"/>
            <xsl:with-param name="contentId" select="$contentId" />
            <xsl:with-param name="id" select="$id" />
            <xsl:with-param name="value" select="$value" />
            <xsl:with-param name="attribute" select="$attribute" />
            <xsl:with-param name="selector" select="$selector" />
            <xsl:with-param name="suffix" select="$suffix" />
          </xsl:call-template>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:if>
  </xsl:template>

  <xsl:template name="widgetSelector">
    <xsl:param name="contentId" />
    <xsl:param name="id" />
    <xsl:param name="suffix" />

    <xsl:text>#</xsl:text>
    <xsl:value-of select="$contentId"/>
    <xsl:text>_</xsl:text>
    <xsl:value-of select="$id"/>
    <xsl:value-of select="$suffix"/>
  </xsl:template>

  <xsl:template name="generateValue">
    <xsl:param name="value" />
    <xsl:param name="attribute" />
    <xsl:variable name="preattr">
      <xsl:choose>
        <xsl:when test="contains($attribute,'$value')">
          <xsl:variable name="outattr">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$attribute" />
              <xsl:with-param name="replace" select="'$value'" />
              <xsl:with-param name="by" select="$value" />
            </xsl:call-template>
          </xsl:variable>
          <xsl:value-of select="$outattr"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>&#x9;</xsl:text>
          <xsl:value-of select="$attribute"/>
          <xsl:text>: </xsl:text>
          <xsl:value-of select="$value"/>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>
    <xsl:value-of select="$preattr"/>
    <xsl:text>;&#xa;</xsl:text>
  </xsl:template>

</xsl:stylesheet>
