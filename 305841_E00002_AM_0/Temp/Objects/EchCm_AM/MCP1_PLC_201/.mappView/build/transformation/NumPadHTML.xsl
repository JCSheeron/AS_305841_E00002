<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Transformation of NumPad XML to widget HTML
-->

<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:numpad="http://www.br-automation.com/iat2019/numpadDefinition/v1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      exclude-result-prefixes="xsi numpad">


  <xsl:output method="xml"
              encoding="UTF-8"
              indent="yes"
              omit-xml-declaration="yes" />

  <xsl:param name="qualifiedName"></xsl:param>
  <xsl:param name="widgetName"></xsl:param>
  <xsl:param name="cssClassName"></xsl:param>

  <xsl:strip-space elements="*"/>

  <xsl:template match="/">
    <xsl:apply-templates select="numpad:NumPad"/>
  </xsl:template>

  <xsl:template match="numpad:NumPad">
    <div id="breaseNumPad">
      <xsl:attribute name="class">
        <xsl:value-of select="$cssClassName"/>
      </xsl:attribute>
      <xsl:attribute name="data-brease-widget">
        <xsl:value-of select="$qualifiedName"/>
      </xsl:attribute>
      <xsl:apply-templates select="numpad:Header"/>
      <xsl:apply-templates select="numpad:Section"/>
      <xsl:apply-templates select="numpad:Label"/>
      <xsl:apply-templates select="numpad:NodeInfo"/>
      <xsl:apply-templates select="numpad:UnitInfo"/>
      <xsl:apply-templates select="numpad:Value"/>
      <xsl:apply-templates select="numpad:Slider"/>
      <xsl:apply-templates select="numpad:ValueButton"/>
      <xsl:apply-templates select="numpad:ActionButton"/>
      <xsl:apply-templates select="numpad:ActionImage"/>
    </div>
  </xsl:template>

  <xsl:template match="numpad:Section">
    <section>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:text>_S</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:apply-templates select="numpad:Label">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:NodeInfo">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:UnitInfo">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:Value">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:Slider">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:ValueButton">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:ActionButton">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:ActionImage">
        <xsl:with-param name="prefix" select="position()"/>
      </xsl:apply-templates>
    </section>
  </xsl:template>

  <xsl:template match="numpad:Header">
    <header class="breaseNumpadHeader">
      <xsl:apply-templates select="numpad:Label">
        <xsl:with-param name="prefix" select="'H'"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:NodeInfo">
        <xsl:with-param name="prefix" select="'H'"/>
      </xsl:apply-templates>
      <xsl:apply-templates select="numpad:UnitInfo">
        <xsl:with-param name="prefix" select="'H'"/>
      </xsl:apply-templates>
    </header>
  </xsl:template>

  <xsl:template match="numpad:Label">
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

  <xsl:template match="numpad:NodeInfo">
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

  <xsl:template match="numpad:UnitInfo">
    <xsl:param name="prefix"></xsl:param>
    <label>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_UnitInfo</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:attribute name="class">
        <xsl:value-of select="'unitInfo'"/>
      </xsl:attribute>
    </label>
  </xsl:template>

  <xsl:template match="numpad:Value">
    <xsl:param name="prefix"></xsl:param>
    <div>
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_Value</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
      <xsl:choose>
        <xsl:when test="@value='min'">
          <xsl:attribute name="class">
            <xsl:value-of select="'minValue'"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:when test="@value='max'">
          <xsl:attribute name="class">
            <xsl:value-of select="'maxValue'"/>
          </xsl:attribute>
        </xsl:when>
        <xsl:otherwise>
          <xsl:attribute name="class">
            <xsl:value-of select="'breaseNumpadNumericValue'"/>
          </xsl:attribute>
        </xsl:otherwise>
      </xsl:choose>
    </div>
  </xsl:template>
  <xsl:template match="numpad:Slider">
    <xsl:param name="prefix"></xsl:param>
    <div class="breaseNumpadSlider">
      <xsl:attribute name="id">
        <xsl:value-of select="$widgetName"/>
        <xsl:if test="$prefix">
          <xsl:text>_S</xsl:text>
          <xsl:value-of select="$prefix"/>
        </xsl:if>
        <xsl:text>_Slider</xsl:text>
        <xsl:value-of select="position()"/>
      </xsl:attribute>
        <xsl:for-each select="@*">
          <xsl:if test="name()!='top' and name()!='left' and name()!='width' and name()!='height' and name()!='zIndex'">
            <xsl:attribute name="data-{name()}">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:if>
        </xsl:for-each>
    </div>
  </xsl:template>

  <xsl:template match="numpad:ValueButton">
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
      <xsl:attribute name="data-display">
        <xsl:value-of select="@display"/>
      </xsl:attribute>

      <span class="display">
        <xsl:value-of select="@display"/>
      </span>
    </button>
  </xsl:template>

  <xsl:template match="numpad:ActionButton">
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

  <xsl:template match="numpad:ActionImage">
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

</xsl:stylesheet>
