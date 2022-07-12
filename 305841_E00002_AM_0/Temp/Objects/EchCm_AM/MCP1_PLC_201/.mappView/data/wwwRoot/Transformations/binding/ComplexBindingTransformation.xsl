<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Brugger Martin
// Created: Augus 20, 2014
// Stylesheet to transform XML Binding definiton into runtime valid binding definition
//
// Source format: Engineering Binding
// Target format: Engineering Binding
//
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bdg="http://www.br-automation.com/iat2015/binding/engineering/v2"
xmlns:bt="http://www.br-automation.com/iat2015/bindingListTypes/engineering/v2"
xmlns:be="http://www.br-automation.com/iat2015/bindingListEmbedded/engineering/v2"
xmlns="http://www.br-automation.com/iat2015/binding/engineering/v2"
xmlns:wdg="http://www.br-automation.com/iat2014/widget">
  <xsl:output method="xml" encoding="UTF-8" indent="yes" />
  <xsl:namespace-alias result-prefix="#default" stylesheet-prefix="bdg" />
  <!-- TODO: das muss ein Parameter von aussen sein -->
  <xsl:param name="widgetRoot">../../BRVisu/</xsl:param>
  <xsl:param name="elpathdelimiter">/</xsl:param>
  <xsl:variable name="widgetBreasePath" select="$widgetRoot"></xsl:variable>
  <xsl:variable name="projectRoot" select="$widgetRoot"></xsl:variable>
  <xsl:variable name="widgetProjectPath" select="$projectRoot"></xsl:variable>

  <!-- Helper Function to process a String Replace-->
  <xsl:template name="string-replace-all">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:value-of select="$by" />
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text"
          select="substring-after($text,$replace)" />
          <xsl:with-param name="replace" select="$replace" />
          <xsl:with-param name="by" select="$by" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!--Template function to get the Widget name out of the namespace-->
  <xsl:template name="getFileName">
    <xsl:param name="elname"></xsl:param>
    <xsl:choose>
      <xsl:when test="contains($elname,'/')">
        <xsl:call-template name="getFileName">
          <xsl:with-param name="elname" select="substring-after($elname,'/')"></xsl:with-param>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$elname"/>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>

  <!-- Template Function to process a collection of bindings -->
  <xsl:template name="processBindings">
    <xsl:element name="Bindings">
      <xsl:for-each select="bdg:Binding">
        <xsl:call-template name="createSimpleBinding"></xsl:call-template>
      </xsl:for-each>
      <xsl:for-each select="bdg:ComplexBinding">
        <xsl:call-template name="createComplexbinding"></xsl:call-template>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <!-- Template Function to process the simple Binding -->
  <xsl:template name="createSimpleBinding">
    <!--Copy Binding from source document to target document-->
    <xsl:copy-of select="."></xsl:copy-of>
  </xsl:template>

  <xsl:template name="getSimpleType">
    <xsl:param name="complexType"/>
    <xsl:choose>
      <xsl:when test="$complexType='opcUaComplex'">
        <xsl:value-of select="'opcUa'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="$complexType='breaseComplex'">
        <xsl:value-of select="'brease'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="$complexType='listComplex'">
        <xsl:value-of select="'list'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="$complexType='listComplexElement'">
        <xsl:value-of select="'listElement'"></xsl:value-of>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$complexType"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="createBindingObservableTypeAndRefId">
    <xsl:param name="root"></xsl:param>
    <xsl:param name="member"></xsl:param>
    <xsl:param name="placeholder"></xsl:param>
    
    <xsl:variable name="simpleType">
      <xsl:call-template name="getSimpleType">
        <xsl:with-param name="complexType" select="$root/@xsi:type"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:attribute name="xsi:type">
      <xsl:value-of select="$simpleType"/>
    </xsl:attribute>
    <xsl:choose>
      <xsl:when test="$simpleType='brease'">
        <xsl:attribute name="contentRefId">
          <xsl:value-of select="$root/@contentRefId"/>
        </xsl:attribute>
        <xsl:attribute name="widgetRefId">
          <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="$member/@refId" />
            <xsl:with-param name="replace" select="$placeholder" />
            <xsl:with-param name="by" select="$root/@widgetRefId" />
          </xsl:call-template>
        </xsl:attribute>
      </xsl:when>
      <xsl:otherwise>
        <xsl:attribute name="refId">
          <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="$member/@refId" />
            <xsl:with-param name="replace" select="$placeholder" />
            <xsl:with-param name="by" select="$root/@refId" />
          </xsl:call-template>
        </xsl:attribute>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- create a simple binding observable -->
  <xsl:template name="createSimpleBindingObservable">
    <xsl:param name="root"></xsl:param>
    <xsl:param name="member"></xsl:param>
    <xsl:param name="placeholder"></xsl:param>

    <xsl:call-template name="createBindingObservableTypeAndRefId">
      <xsl:with-param name="root" select="$root"/>
      <xsl:with-param name="member" select="$member"/>
      <xsl:with-param name="placeholder" select="$placeholder"/>
    </xsl:call-template>

    <xsl:attribute name="attribute">
      <xsl:value-of select="$member/@attribute"/>
    </xsl:attribute>

    <xsl:if test="$member/@samplingRate">
      <xsl:attribute name="samplingRate">
        <xsl:value-of select="$member/@samplingRate"/>
      </xsl:attribute>
    </xsl:if>
  </xsl:template>

  <!-- create a list binding observable -->
  <xsl:template name="createListBindingObservable">
    <xsl:param name="root"></xsl:param>
    <xsl:param name="member"></xsl:param>
    <xsl:param name="placeholder"></xsl:param>

    <xsl:call-template name="createBindingObservableTypeAndRefId">
      <xsl:with-param name="root" select="$root"/>
      <xsl:with-param name="member" select="$member"/>
      <xsl:with-param name="placeholder" select="$placeholder"/>
    </xsl:call-template>

    <xsl:copy-of select="$root/bdg:Selector" />
    <xsl:element name="Elements">
      <xsl:for-each select="$root/bdg:Elements/bdg:Element">
        <xsl:element name="Element">
          <xsl:attribute name="index">
            <xsl:value-of select="./@index"/>
          </xsl:attribute>
        <xsl:element name="Source">
          <xsl:variable name="simpleType">
            <xsl:call-template name="getSimpleType">
              <xsl:with-param name="complexType" select="./@type"/>
            </xsl:call-template>
          </xsl:variable>
          <xsl:attribute name="xsi:type">
            <xsl:value-of select="$simpleType"/>
          </xsl:attribute>
          <xsl:attribute name="refId">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$member/@refId" />
              <xsl:with-param name="replace" select="$placeholder" />
              <xsl:with-param name="by" select="./@refId" />
            </xsl:call-template>
          </xsl:attribute>
          
          <xsl:attribute name="attribute">
            <!--A&P 423050: use attribute defined in template -->
            <xsl:value-of select="$member/@attribute"/>
          </xsl:attribute>
        </xsl:element>
      </xsl:element>
      </xsl:for-each>
    </xsl:element>

  </xsl:template>

  <!-- create a list binding observable -->
  <xsl:template name="createListElementBindingObservable">
    <xsl:param name="root"></xsl:param>
    <xsl:param name="member"></xsl:param>
    <xsl:param name="placeholder"></xsl:param>

    <xsl:attribute name="xsi:type">
      <xsl:value-of select="'listElement'"/>
    </xsl:attribute>

    <xsl:copy-of select="$root/bdg:Selector" />
    <xsl:variable name="simpleType">
      <xsl:call-template name="getSimpleType">
        <xsl:with-param name="complexType" select="$root/bdg:List/@type"/>
      </xsl:call-template>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$simpleType = 'opcUa'">
        <xsl:call-template name="createopcUaListElementBindingObservable">
          <xsl:with-param name="root" select="$root"/>
          <xsl:with-param name="member" select="$member"/>
          <xsl:with-param name="placeholder" select="$placeholder"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          Unsupported complex list type <xsl:value-of select="$simpleType"/>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
   <!-- create a list binding observable -->
  <xsl:template name="createopcUaListElementBindingObservable">
      <xsl:param name="root"></xsl:param>
      <xsl:param name="member"></xsl:param>
      <xsl:param name="placeholder"></xsl:param>
    
      <xsl:element name="be:List">
      <xsl:attribute name="xsi:type">
        <xsl:value-of select="'be:'"/>
        <xsl:value-of select="'opcUa'"/>
      </xsl:attribute>
      <!-- attribute to list (opcUa only) -->
      <xsl:attribute name="attribute">
        <!--A&P 423050: use attribute defined in template -->
        <xsl:value-of select="$member/@attribute"/>
      </xsl:attribute>
      <xsl:if test="$member/@samplingRate">
         <xsl:attribute name="samplingRate">
           <xsl:value-of select="$member/@samplingRate"/>
         </xsl:attribute>
      </xsl:if> 
        
      <!-- copy the elements -->
      <xsl:for-each select="$root/bdg:List/bdg:Element">
        <xsl:element name="bt:Element">
          <xsl:attribute name="index">
            <xsl:value-of select="./@index"/>
          </xsl:attribute>
          <!-- create the element entry -->
            <xsl:attribute name="refId">
              <xsl:call-template name="string-replace-all">
                <xsl:with-param name="text" select="$member/@refId" />
                <xsl:with-param name="replace" select="$placeholder" />
                <xsl:with-param name="by" select="./@refId" />
              </xsl:call-template>
            </xsl:attribute>
          </xsl:element>
      </xsl:for-each>

      <!-- copy the default -->
      <xsl:if test="$root/bdg:List/bdg:Default">
        <xsl:element name="bt:Default">
          <xsl:attribute name="refId">
            <xsl:call-template name="string-replace-all">
              <xsl:with-param name="text" select="$member/@refId" />
              <xsl:with-param name="replace" select="$placeholder" />
              <xsl:with-param name="by" select="$root/bdg:List/bdg:Default/@refId" />
            </xsl:call-template>
          </xsl:attribute>
        </xsl:element>
      </xsl:if>
     </xsl:element>

  </xsl:template>


  <!-- Template Function to create a part of the binding (source/target)
	parameters:
		root: root part of the binding
		member: member part of the binding
		placeholder: placeholder for search and replace of refID
	-->
  <xsl:template name="createBindingObservable">
    <xsl:param name="root"></xsl:param>
    <xsl:param name="member"></xsl:param>
    <xsl:param name="placeholder"></xsl:param>

    <xsl:choose>
      <xsl:when test="$root/@xsi:type='listComplex'">
        <xsl:call-template name="createListBindingObservable">
          <xsl:with-param name="root" select="$root"/>
          <xsl:with-param name="member" select="$member"/>
          <xsl:with-param name="placeholder" select="$placeholder"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="$root/@xsi:type='listComplexElement'">
        <xsl:call-template name="createListElementBindingObservable">
          <xsl:with-param name="root" select="$root"/>
          <xsl:with-param name="member" select="$member"/>
          <xsl:with-param name="placeholder" select="$placeholder"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="createSimpleBindingObservable">
          <xsl:with-param name="root" select="$root"/>
          <xsl:with-param name="member" select="$member"/>
          <xsl:with-param name="placeholder" select="$placeholder"/>
        </xsl:call-template>
      </xsl:otherwise>
    </xsl:choose>

    <!--Template function to create a binding entry from the template-->
  </xsl:template>
  <xsl:template name="createBindingEntry">
    <xsl:param name="binding"></xsl:param>
    <xsl:variable name="bindingSourceMember" select="./wdg:SourceMember/@refId" />
    <xsl:element name="Binding">
      <xsl:attribute name="mode">
        <xsl:value-of select="./@mode"/>
      </xsl:attribute>
      <xsl:element name="Source">

        <xsl:call-template name="createBindingObservable">
          <xsl:with-param name="root" select="$binding/bdg:SourceRoot"></xsl:with-param>
          <xsl:with-param name="member" select="./wdg:SourceMember"></xsl:with-param>
          <xsl:with-param name="placeholder" select="'$Source'"></xsl:with-param>
        </xsl:call-template>
      </xsl:element>

      <xsl:element name="Target">
        <xsl:call-template name="createBindingObservable">
          <xsl:with-param name="root" select="$binding/bdg:TargetRoot"></xsl:with-param>
          <xsl:with-param name="member" select="./wdg:TargetMember"></xsl:with-param>
          <xsl:with-param name="placeholder" select="'$Target'"></xsl:with-param>
        </xsl:call-template>
      </xsl:element>
    </xsl:element>
  </xsl:template>


  <!--Template function to get a widgte file by type and root directory -->
  <xsl:template name="getWidgetFile">
    <xsl:param name="widgetType"></xsl:param>
    <xsl:param name="widgetPath"></xsl:param>

    <xsl:variable name="eltype">
      <xsl:call-template name="getFileName">
        <xsl:with-param name="elname" select="$widgetType"></xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <xsl:value-of select="concat($widgetPath,$widgetType,$elpathdelimiter,'meta',$elpathdelimiter,$eltype,'.widget')"></xsl:value-of>
  </xsl:template>

  <!-- function to return the node set (as string) of the bing template by -->
  <xsl:template name="getBindingTemplate">
    <xsl:param name="binding"></xsl:param>
    <xsl:param name="widgetType"></xsl:param>
    
    <xsl:variable name="file">
      <xsl:choose>
        <xsl:when test="starts-with($widgetType,'widgets/brease')">
          <xsl:call-template name="getWidgetFile">
            <xsl:with-param name="widgetType" select="$widgetType"></xsl:with-param>
            <xsl:with-param name="widgetPath" select="$widgetBreasePath"></xsl:with-param>
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:call-template name="getWidgetFile">
            <xsl:with-param name="widgetType" select="$widgetType"></xsl:with-param>
            <xsl:with-param name="widgetPath" select="$widgetProjectPath"></xsl:with-param>
          </xsl:call-template>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:value-of select="document($file)//wdg:BindingTemplate[@id=$binding/@templateId]"/>
  </xsl:template>

  <!--Template function to resolve complex binding and the template-->
  <xsl:template name="createComplexbinding">
    <xsl:variable name="binding" select="."></xsl:variable>

    <!-- path setting used to select the widget -->
    <xsl:variable name="widgetType" select="@widgetType"></xsl:variable>
    <xsl:variable name="widgetTypePath">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="$widgetType"></xsl:with-param>
        <xsl:with-param name="replace" select="'.'"></xsl:with-param>
        <xsl:with-param name="by" select="$elpathdelimiter"></xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="file">
      <xsl:choose>
        <xsl:when test="starts-with($widgetType,'widgets.brease')">
          <xsl:call-template name="getWidgetFile">
            <xsl:with-param name="widgetType" select="$widgetTypePath"></xsl:with-param>
            <xsl:with-param name="widgetPath" select="$widgetBreasePath"></xsl:with-param>
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:call-template name="getWidgetFile">
            <xsl:with-param name="widgetType" select="$widgetTypePath"></xsl:with-param>
            <xsl:with-param name="widgetPath" select="$widgetProjectPath"></xsl:with-param>
          </xsl:call-template>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="templateId" select="$binding/@templateId"/>
    <xsl:variable name="bindingtemplate" select="document($file)//wdg:BindingTemplate[@id=$templateId]">
    </xsl:variable>

    <xsl:if test="not($bindingtemplate/@id)">
      <xsl:message terminate="yes">
        Error: Defined  Template not found; File: <xsl:value-of select="$file" />; Widget: <xsl:value-of select="$widgetType" />; Template: <xsl:value-of select="$templateId" />
        <xsl:copy-of select="$bindingtemplate"/>
      </xsl:message>
    </xsl:if>
    
    <xsl:if test="$bindingtemplate/@id">
      <xsl:variable name="templateid" select="./@templateId"></xsl:variable>
      <xsl:for-each select="$bindingtemplate/wdg:BindingMember">
        <xsl:call-template name="createBindingEntry">
          <xsl:with-param name="binding" select="$binding"></xsl:with-param>
        </xsl:call-template>
      </xsl:for-each>
    </xsl:if>
  </xsl:template>

  <xsl:template match="/">
    <xsl:if test="bdg:BindingsSet">
      <xsl:element name="BindingsSet">
        <!-- copy attributes -->
        <xsl:for-each select="bdg:BindingsSet/@*">
          <xsl:attribute name="{name()}">
            <xsl:value-of select="."/>
          </xsl:attribute>
        </xsl:for-each>
        <!--process Bindings -->
        <xsl:for-each select="bdg:BindingsSet/bdg:Bindings">
          <xsl:call-template name="processBindings"></xsl:call-template>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>


</xsl:stylesheet>
