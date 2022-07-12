<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Brugger Martin
// Created: September 22, 2014
// Stylesheet to create the necessary binding from the expression definition
-->


<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:bdg="http://www.br-automation.com/iat2014/binding/engineering/v1"
xmlns:exp="http://www.br-automation.com/iat2015/expression/engineering/v3"
xmlns:ext="http://www.br-automation.com/iat2016/expressionType/v1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns="http://www.br-automation.com/iat2016/expression/runtime/v2">
  <xsl:output method="xml" encoding="UTF-8" indent="yes" />
  <xsl:namespace-alias result-prefix="#default" stylesheet-prefix="exp" />

  <xsl:param name="expressionTypeFileName" select="'merged.expressiontype'"/>

  <xsl:template match="*" mode="copy-no-namespaces">
    <xsl:element name="{name(.)}">
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates mode="copy-no-namespaces"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="createExpression">
    <xsl:variable name="type" select="@type"></xsl:variable>
    <xsl:variable name="expType" select="document($expressionTypeFileName)//ext:ExpressionType[@name=$type]"/>
    <xsl:if test="not($expType/@name=@type)">
      <xsl:message terminate="yes">
        ExpressionType: <xsl:value-of select="@type"/> not found
      </xsl:message>
    </xsl:if>
    <xsl:choose>
      <xsl:when test="@xsi:type='content'">
        <xsl:call-template name="createContentExpression">
          <xsl:with-param  name="expression" select="."/>
          <xsl:with-param  name="expType" select="$expType"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="@xsi:type='session'">
        <xsl:call-template name="createSessionExpression">
          <xsl:with-param  name="expType" select="$expType"/>
        </xsl:call-template>
      </xsl:when>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="createSessionExpression">
    <xsl:param name="expType"/>
    <xsl:element name="Session">
      <xsl:call-template name="createExpressionFromType">
        <xsl:with-param  name="expType" select="$expType"/>
      </xsl:call-template>
    </xsl:element>
  </xsl:template>

  <xsl:template name="createContentExpression">
    <xsl:param name="expType"/>

    <xsl:element name="Content">
      <xsl:attribute name="id">
        <xsl:value-of select="./@contentRefId"/>
      </xsl:attribute>
      <xsl:call-template name="createExpressionFromType">
        <xsl:with-param  name="expType" select="$expType"/>
      </xsl:call-template>
    </xsl:element>
  </xsl:template>

  <xsl:template name="createExpressionFromType">
    <xsl:param name="expType"/>
    <xsl:element name="Expression">
      <xsl:attribute name="refId">
        <xsl:value-of select="./@id"/>
      </xsl:attribute>
      <xsl:attribute name="datatype">
        <xsl:value-of select="$expType/@datatype"/>
      </xsl:attribute>
      <xsl:apply-templates mode="copy-no-namespaces" select="$expType/*"></xsl:apply-templates>
    </xsl:element>
  </xsl:template>


  <!-- Template Function to process a single expression -->
  <xsl:template name="processExpression">
    <xsl:for-each select="exp:Expression">
      <xsl:call-template name="createExpression"/>
    </xsl:for-each>
  </xsl:template>

  <!--Starting Point of the Transformation-->
  <xsl:template match="/">

    <xsl:if test="exp:ExpressionsSet">
      <xsl:element name="ExpressionDefinition">
        <!--process each page-->
        <xsl:for-each select="exp:ExpressionsSet/exp:Expressions">
          <xsl:call-template name="processExpression"/>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>