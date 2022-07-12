<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Brugger Martin
// Created: Augus 20, 2014
// Stylesheet to transform dynamic binding definitions
//
// Source format: Engineering Binding
// Target format: Engineering Binding
//
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bdg="http://www.br-automation.com/iat2015/binding/engineering/v2"
xmlns="http://www.br-automation.com/iat2015/binding/engineering/v2">
  <xsl:output method="xml" encoding="UTF-8" indent="yes" />

  <xsl:variable name="separator" select="'_'" />

  <!-- Template Function to process bindings -->
  <xsl:template name="processBindings">
    <xsl:element name="Bindings">
        <xsl:for-each select="bdg:Binding">
        <xsl:choose>
          <xsl:when test="bdg:Source/@xsi:type='list'">
            <xsl:call-template name="createListBinding"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="copyAnyBinding"></xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyAnyBinding">
    <xsl:copy-of select="."/>
  </xsl:template>

  <!--Extraction of List Binding-->
  <!-- TODO: do we create an engineering binding or a runtime binding for the list? -->
  <xsl:template name="createListBinding">
    <xsl:element name="Binding">
      <xsl:copy-of select="@*"/>
      <xsl:element name="Source">
        <xsl:attribute name="xsi:type">
          <xsl:text>listElements</xsl:text>
        </xsl:attribute>
        <xsl:copy-of  select="bdg:Source/@refId"/>
        <xsl:attribute name="attribute">
          <xsl:text>value</xsl:text>
        </xsl:attribute>
        <xsl:element name="Elements">
          <xsl:for-each select="bdg:Source/bdg:Elements/bdg:Element">
            <xsl:call-template name="processElement"/>
          </xsl:for-each>
        </xsl:element>
      </xsl:element>
      <xsl:copy-of  select="bdg:Target"/>
    </xsl:element>
    <xsl:element name="Binding">
      <xsl:attribute name="mode">
        <xsl:text>twoWay</xsl:text>
      </xsl:attribute>
      <xsl:element name="Source">
        <xsl:copy-of select="bdg:Source/bdg:Selector/@*"/>
      </xsl:element>
      <xsl:element name="Target">
        <xsl:attribute name="xsi:type">
          <xsl:text>listSelector</xsl:text>
        </xsl:attribute>
        <xsl:copy-of select="bdg:Source/@refId"/>
        <xsl:attribute name="attribute">
          <xsl:text>selectedIndex</xsl:text>
        </xsl:attribute>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template name="processElement">
    <xsl:element name="Element">
      <xsl:copy-of select="@index"/>
      <xsl:for-each select="bdg:Source">
        <xsl:call-template name="createSourceBinding">
          <xsl:with-param name="source" select="." />
        </xsl:call-template>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="createSourceBinding">
    <xsl:param name="source" />
    <xsl:element name="Source">
      <xsl:choose>
        <xsl:when test="$source/@xsi:type='brease'">
          <xsl:copy-of select="$source/@xsi:type"/>
          <xsl:copy-of select="$source/@contentRefId"/>
          <xsl:attribute name="widgetRefId">
            <xsl:value-of select="$source/@contentRefId"/>
            <xsl:value-of select="$separator" />
          <xsl:value-of select="$source/@widgetRefId"/>
        </xsl:attribute>
        <xsl:copy-of select="$source/@attribute"/>
         </xsl:when>
        <xsl:otherwise>
          <xsl:copy-of select="$source/@xsi:type"/>
          <xsl:copy-of select="$source/@refId"/>
          <xsl:copy-of select="$source/@attribute"/>
        </xsl:otherwise>
        </xsl:choose>
    </xsl:element>
  </xsl:template>

  <xsl:template name="processServer">
    <!--Copy Binding from source document to target document-->
    <xsl:copy-of select="."></xsl:copy-of>
  </xsl:template>

  <!--Starting Point of the Transformation-->
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
          <xsl:call-template name="processBindings"/>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>