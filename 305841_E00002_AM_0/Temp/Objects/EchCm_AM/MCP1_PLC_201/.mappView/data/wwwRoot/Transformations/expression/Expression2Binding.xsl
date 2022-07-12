<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Brugger Martin
// Created: September 22, 2014
// Stylesheet to create the necessary binding from the expression definition
-->

<!-- TODO: warum verwenden wir die Version 1.0? -->
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:exp="http://www.br-automation.com/iat2014/expression/engineering/v1"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bi="http://www.br-automation.com/iat2014/binding/runtime/v1"
xmlns="http://www.br-automation.com/iat2014/binding/runtime/v1">
  <xsl:output method="xml" encoding="UTF-8" indent="yes" />
  <xsl:variable name="separator" select="'_'" />
  <xsl:namespace-alias result-prefix="#default" stylesheet-prefix="exp" />
  <xsl:namespace-alias result-prefix="xsi" stylesheet-prefix="xsi"/>
  <xsl:namespace-alias result-prefix="bi" stylesheet-prefix="bi"/>

  <xsl:template match="*" mode="copy-no-namespaces">
    <xsl:element name="{name(.)}">
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates mode="copy-no-namespaces"/>
      <!--select="node()" mode="copy-no-namespaces"-->
    </xsl:element>
  </xsl:template>

  <xsl:template name="createExpressionBinding">
    <xsl:param name="pageId" />
    <xsl:variable name="refId" select="./@refId"></xsl:variable>
    <xsl:for-each select="exp:Operands/exp:Operand">
      <xsl:call-template name="createOperandBinding">
        <xsl:with-param name="expName" select="$refId"></xsl:with-param>
        <xsl:with-param name="pageId" select="$pageId" />
      </xsl:call-template>

    </xsl:for-each>
  </xsl:template>

  <xsl:template name="createOperandBinding">
    <xsl:param name="expName"></xsl:param>
    <xsl:param name="pageId" />
    <xsl:variable name="operandName" select="./@name"/>
    <xsl:for-each select="exp:Source">
      <xsl:call-template name="createDataBinding">
        <xsl:with-param name="expName" select="$expName"></xsl:with-param>
        <xsl:with-param name="operandName" select="$operandName"></xsl:with-param>
        <xsl:with-param name="pageId" select="$pageId" />
      </xsl:call-template>
    </xsl:for-each>
  </xsl:template>

  <xsl:template name="createDataBinding">
    <xsl:param name="expName"></xsl:param>
    <xsl:param name="operandName"></xsl:param>
    <xsl:param name="pageId" />
    <xsl:variable name="type" select="substring-after(./@xsi:type, ':')"></xsl:variable>
    <xsl:element name="Binding">
      <xsl:attribute name="mode">oneWay</xsl:attribute>
      <xsl:element name="Source">
        <xsl:attribute name="xsi:type">
          <xsl:value-of select="$type"/>
        </xsl:attribute>
        <xsl:attribute name="refId">
          <xsl:if test="$type='brease'">
            <xsl:value-of select="$pageId"/>
            <xsl:value-of select="$separator" />
          </xsl:if>
          <xsl:value-of select="./@refId"/>
        </xsl:attribute>
        <xsl:copy-of select="./@attribute"/>
      </xsl:element>
      <xsl:element name="Target">
        <xsl:attribute name="xsi:type">expression</xsl:attribute>
        <xsl:attribute name="refId">
          <xsl:value-of select="$expName"/>
        </xsl:attribute>
        <xsl:attribute name="attribute">
          <xsl:value-of select="$operandName"/>
        </xsl:attribute>
      </xsl:element>
    </xsl:element>

  </xsl:template>


  <!-- Template Function to process a content-->
  <xsl:template name="processContent">

    <xsl:param name="pageId" select="./@id" />

    <xsl:element name="Content">
      <xsl:attribute name="id" >
        <xsl:value-of select="./@id"/>
      </xsl:attribute>
      <xsl:for-each select="exp:Expression">
        <xsl:call-template name="createExpressionBinding">
          <xsl:with-param name="pageId" select="$pageId" />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <!--Starting Point of the Transformation-->
  <xsl:template match="/">
    <xsl:if test="exp:ExpressionDefinition">
      <xsl:element name="BindingDefinition">
        <!--process each content-->
        <xsl:for-each select="exp:ExpressionDefinition/exp:Content">
          <xsl:call-template name="processContent"></xsl:call-template>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>