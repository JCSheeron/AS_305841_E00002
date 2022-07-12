<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Transformation for XML Dialog definiton into Stylesheet
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:iat="http://www.br-automation.com/iat2015/dialogDefinition/v2"
xmlns:widget="http://www.br-automation.com/iat2014/widget"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <xsl:output method="text" encoding="UTF-8" indent="yes"/>
  <xsl:include href="HelperFunctions.xsl"/>
  <xsl:param name="elpathdelimiter">/</xsl:param>
  <xsl:param name="basepath">../../types/</xsl:param>

  <xsl:param name="itemType">Dialog</xsl:param>

  <!-- entry point -->
  <xsl:template match="/iat:Dialog">
    <xsl:text>@import "mixins.scss";&#xa;</xsl:text>

    <xsl:variable name="itemFile" select="concat($basepath,$itemType,'.type')"></xsl:variable>

    <xsl:if test="count(@*)>2">

      <xsl:variable name="itemId" select="@id"></xsl:variable>

      <xsl:for-each select="@*">
        <xsl:if test="not(name()='id') and not(name()='xsi:type')">
          <xsl:call-template name="property">
            <xsl:with-param name="itemFile" select="$itemFile" />
            <xsl:with-param name="itemId" select="$itemId" />
          </xsl:call-template>
        </xsl:if>
      </xsl:for-each>

    </xsl:if>
  </xsl:template>

  <xsl:template name="property">
    <xsl:param name="itemFile" />
    <xsl:param name="itemId" />

    <xsl:variable name="propertyName" select="name()"/>
    <xsl:variable name="propertyValue" select="."/>

    <xsl:for-each select="document($itemFile)//widget:StyleProperty[@name=$propertyName]/widget:StyleElement">
      <xsl:text>div[data-brease-dialogId='</xsl:text>
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