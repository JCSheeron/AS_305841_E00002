<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Transformation for XML Page definiton into SCSS
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:pdef="http://www.br-automation.com/iat2015/pageDefinition/v2"
xmlns:ddef="http://www.br-automation.com/iat2015/dialogDefinition/v2"
xmlns:widget="http://www.br-automation.com/iat2014/widget"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <xsl:output method="text" encoding="UTF-8" indent="yes"/>
  <xsl:include href="HelperFunctions.xsl"/>
  <xsl:param name="elpathdelimiter">/</xsl:param>
  <xsl:param name="basepath">../../types/</xsl:param>

  <!-- entry point for Page -->
  <xsl:template match="/pdef:Page">
    <xsl:text>@import "mixins.scss";&#xa;</xsl:text>
    <xsl:variable name="typeFile" select="concat($basepath,'Page.type')"></xsl:variable>
    <xsl:if test="count(@*)>2">
      <xsl:variable name="itemId" select="@id"></xsl:variable>
      <xsl:for-each select="@*">
        <xsl:if test="not(name()='id') and not(name()='xsi:type')">
          <xsl:call-template name="property">
            <xsl:with-param name="typeFile" select="$typeFile" />
            <xsl:with-param name="itemId" select="$itemId" />
            <xsl:with-param name="dataSuffix" select="'pageid'" />
          </xsl:call-template>
        </xsl:if>
      </xsl:for-each>
    </xsl:if>
	<xsl:apply-templates select="node()"/>
  </xsl:template>
  <!-- entry point for Dialog -->
  <xsl:template match="/ddef:Dialog">
    <xsl:text>@import "mixins.scss";&#xa;</xsl:text>
    <xsl:variable name="typeFile" select="concat($basepath,'DialogEditor.type')"></xsl:variable>
    <xsl:if test="count(@*)>2">
      <xsl:variable name="itemId" select="@id"></xsl:variable>
      <xsl:for-each select="@*">
        <xsl:if test="not(name()='id') and not(name()='xsi:type')">
          <xsl:call-template name="property">
            <xsl:with-param name="typeFile" select="$typeFile" />
            <xsl:with-param name="itemId" select="$itemId" />
            <xsl:with-param name="dataSuffix" select="'pageid'" />
          </xsl:call-template>
        </xsl:if>
      </xsl:for-each>
    </xsl:if>
	<xsl:apply-templates select="node()"/>
  </xsl:template>
  
  <xsl:template match="//Assignments/Assignment">
    <xsl:variable name="typeFile" select="concat($basepath,'Area.type')"></xsl:variable>
      <xsl:variable name="itemId" select="@areaRefId"></xsl:variable>
      <xsl:for-each select="@*">
        <xsl:if test="not(name()='areaRefId') and not(name()='type') and not(name()='baseContentRefId') and not(name()='styleRefId')">
          <xsl:call-template name="property">
            <xsl:with-param name="typeFile" select="$typeFile" />
            <xsl:with-param name="itemId" select="$itemId" />
            <xsl:with-param name="dataSuffix" select="'areaid'" />
          </xsl:call-template>
        </xsl:if>
      </xsl:for-each>
  </xsl:template>

  <xsl:template name="property">
    <xsl:param name="typeFile" />
    <xsl:param name="itemId" />
    <xsl:param name="dataSuffix" />

    <xsl:variable name="propertyName" select="name()"/>
    <xsl:variable name="propertyValue" select="."/>

    <xsl:for-each select="document($typeFile)//widget:StyleProperty[@name=$propertyName]/widget:StyleElement">
<xsl:text>div[data-brease-</xsl:text><xsl:value-of select="$dataSuffix"/><xsl:text>='</xsl:text>
      <xsl:value-of select="$itemId"/>
      <xsl:value-of select="@idsuffix"/>
      <xsl:text>']</xsl:text>
      <xsl:text> {&#xa;</xsl:text>

      <xsl:choose>
        <xsl:when test="@selector=''">
          <xsl:call-template name="generateValue">
            <xsl:with-param name="value" select="$propertyValue" />
            <xsl:with-param name="attribute" select="@attribute" />
            <xsl:with-param name="suffix" select="@idsuffix" />
          </xsl:call-template>
        </xsl:when>
        <xsl:when test="not(@selector)">
          <xsl:call-template name="generateValue">
            <xsl:with-param name="value" select="$propertyValue" />
            <xsl:with-param name="attribute" select="@attribute" />
            <xsl:with-param name="suffix" select="@idsuffix" />
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>&#x9;</xsl:text>
          <xsl:value-of select="@selector"/>
          <xsl:text>{&#xa;</xsl:text>
          <xsl:call-template name="generateValue">
            <xsl:with-param name="value" select="$propertyValue" />
            <xsl:with-param name="attribute" select="@attribute" />
            <xsl:with-param name="suffix" select="@idsuffix" />
          </xsl:call-template>
          <xsl:text>&#x9;</xsl:text>
          <xsl:text>}&#xa;</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:text>}&#xa;</xsl:text>
    </xsl:for-each>

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
          <xsl:if test="@calc">
            <xsl:value-of select="@calc"/>
          </xsl:if>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:value-of select="$preattr"/>

    <xsl:text>;&#xa;</xsl:text>
  </xsl:template>

</xsl:stylesheet>