<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Transformation of AlphaPad XML to widget HTML
-->

<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:kb="http://www.br-automation.com/iat2019/alphapadDefinition/v1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      exclude-result-prefixes="xsi kb">


  <xsl:output method="xml"
              encoding="UTF-8"
              indent="yes"
              omit-xml-declaration="yes" />

  <xsl:param name="qualifiedName"></xsl:param>
  <xsl:param name="widgetName"></xsl:param>
  <xsl:param name="cssClassName"></xsl:param>

  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:apply-templates select="kb:AlphaPad"/>
  </xsl:template>

  <xsl:template match="kb:AlphaPad">
    <div id="breaseKeyBoard">
      <xsl:attribute name="class">
        <xsl:value-of select="$cssClassName"/>
      </xsl:attribute>
      <xsl:attribute name="data-brease-widget">
        <xsl:value-of select="$qualifiedName"/>
      </xsl:attribute>
      <!--<xsl:apply-templates/>-->
      <xsl:apply-templates select="kb:Header"/>
      <xsl:apply-templates select="kb:Section"/>
      <xsl:apply-templates select="kb:Label"/>
      <xsl:apply-templates select="kb:NodeInfo"/>
      <xsl:apply-templates select="kb:Value"/>
      <xsl:apply-templates select="kb:ValueButton"/>
      <xsl:apply-templates select="kb:ActionButton"/>
      <xsl:apply-templates select="kb:ActionImage"/>
      <xsl:apply-templates select="kb:LayoutSelector"/>
      <xsl:apply-templates select="kb:IME"/>
    </div>
  </xsl:template>

  <xsl:template match="kb:Header">
    <header class="breaseKeyboardHeader">
      <xsl:apply-templates select="kb:Label">
        <xsl:with-param name="prefix" select="'H'"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:NodeInfo">
        <xsl:with-param name="prefix" select="'H'"/>
      </xsl:apply-templates>
    </header>
  </xsl:template>

  <xsl:template match="kb:Section">
    <section>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:text>_S</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:apply-templates select="kb:Label">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:NodeInfo">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:Value">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:ValueButton">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:ActionButton">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:ActionImage">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:LayoutSelector">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="kb:IME">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
    </section>
  </xsl:template>

  <xsl:template match="kb:Value">
    <xsl:param name="prefix"></xsl:param>
    <input>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_Value</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="type">
        <xsl:value-of select="'text'"/>
      </xsl:attribute>
      <xsl:attribute name="readonly">
        <xsl:value-of select="'readonly'"/>
      </xsl:attribute>
      <xsl:attribute name="autocomplete">
        <xsl:value-of select="'off'"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:value-of select="'ValueOutput'"/>
      </xsl:attribute>
    </input>
  </xsl:template>


  <xsl:template match="kb:ValueButton">
    <xsl:param name="prefix"></xsl:param>
    <button>
      <xsl:attribute name="data-action">
        <xsl:value-of select="'value'"/>
      </xsl:attribute>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_ValueButton</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:text>ValueButton</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="data-value">
        <xsl:value-of select="@value"/>
      </xsl:attribute>
      <xsl:attribute name="data-shift-value">
        <xsl:value-of select="@shiftValue"/>
      </xsl:attribute>
      <xsl:attribute name="data-special-value">
        <xsl:value-of select="@specialValue"/>
      </xsl:attribute>
      <xsl:attribute name="data-display">
        <xsl:value-of select="@display"/>
      </xsl:attribute>
      <xsl:attribute name="data-shift-display">
        <xsl:value-of select="@shiftDisplay"/>
      </xsl:attribute>
      <xsl:attribute name="data-special-display">
        <xsl:value-of select="@specialDisplay"/>
      </xsl:attribute>
      <sup>
        <xsl:value-of select="@shiftDisplay"/>
      </sup>
      <span>
        <xsl:value-of select="@display"/>
      </span>
      <sub>
        <xsl:value-of select="@specialDisplay"/>
      </sub>
    </button>
  </xsl:template>

  <xsl:template match="kb:ActionButton">
    <xsl:param name="prefix"></xsl:param>
    <button>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_ActionButton</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:text>ActionButton</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="data-action">
        <xsl:value-of select="@action"/>
      </xsl:attribute>
      <xsl:attribute name="data-display">
        <xsl:value-of select="@display"/>
      </xsl:attribute>
      <span class="display">
        <xsl:value-of select="@display"/>
      </span>
    </button>
  </xsl:template>

  <xsl:template match="kb:ActionImage">
    <xsl:param name="prefix"></xsl:param>
    <div>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_ActionImage</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:text>ActionImage</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="data-action">
        <xsl:value-of select="@action"/>
      </xsl:attribute>
    </div>
  </xsl:template>

  <xsl:template match="kb:Label">
    <xsl:param name="prefix"></xsl:param>
    <label>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_Label</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="data-display">
        <xsl:value-of select="@display"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:value-of select="'display'"/>
      </xsl:attribute>
      <xsl:value-of select="@display"/>
    </label>
  </xsl:template>

  <xsl:template match="kb:NodeInfo">
    <xsl:param name="prefix"></xsl:param>
    <label>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_NodeInfo</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="data-nodeattribute">
        <xsl:value-of select="@nodeAttribute"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:value-of select="'nodeInfo'"/>
      </xsl:attribute>
    </label>
  </xsl:template>

  <xsl:template match="kb:LayoutSelector">
    <xsl:param name="prefix"></xsl:param>
    <button class="breaseLayoutSelector">
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_LayoutSelector</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
    </button>
  </xsl:template>

  <xsl:template match="kb:IME">
    <xsl:param name="prefix"></xsl:param>
    <div class="breaseIME">
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_IME</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="data-brease-lang">
        <xsl:value-of select="@lang"/>
      </xsl:attribute>
    </div>
  </xsl:template>

</xsl:stylesheet>
