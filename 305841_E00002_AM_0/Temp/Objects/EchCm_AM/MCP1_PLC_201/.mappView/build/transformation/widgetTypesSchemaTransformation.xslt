<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	  xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:cat="http://schemas.microsoft.com/xsd/catalog" >
  <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:param name="basePath">../../data/wwwRoot/BRVisu/</xsl:param>
  <!-- keep comments -->
  <xsl:template match="comment()">
    <xsl:copy>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>

  <xsl:template name="string-replace-all">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:value-of select="$by" />
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text" select="substring-after($text,$replace)" />
          <xsl:with-param name="replace" select="$replace" />
          <xsl:with-param name="by" select="$by" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="cat:SchemaCatalog">
    <!-- remove element prefix -->
    <xsl:element name="xs:schema">
      <xsl:attribute name="targetNamespace">
        <xsl:text>http://www.br-automation.com/iat2014/widget</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="xml:xs">
        <xsl:text>http://www.w3.org/2001/XMLSchema</xsl:text>
      </xsl:attribute>
      <xsl:attribute name="elementFormDefault">qualified</xsl:attribute>
      <xsl:element name="xs:simpleType">
        <xsl:attribute name="name">widgetPropertyType</xsl:attribute>
        <xsl:element name="xs:restriction">
          <xsl:attribute name="base">xs:string</xsl:attribute>
          <xsl:apply-templates select="cat:Schema"></xsl:apply-templates>
        </xsl:element>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <xsl:template match="cat:Schema">
    <xsl:variable name="xsdpath">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="./@href"></xsl:with-param>
        <xsl:with-param name="replace" select="'../../common/widgetTypes/'"></xsl:with-param>
        <xsl:with-param name="by" select="concat($basePath, '/schema/widgetTypes/')"></xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <xsl:apply-templates select="document($xsdpath)"></xsl:apply-templates>
  </xsl:template>

  <xsl:template match="xs:schema">
    <xsl:apply-templates select="xs:simpleType"></xsl:apply-templates>
    <xsl:apply-templates select="xs:complexType"></xsl:apply-templates>
  </xsl:template>

  <xsl:template match="xs:simpleType">
    <xsl:element name="xs:enumeration">
      <xsl:attribute name="value">
        <xsl:value-of select="@name"/>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>

  <xsl:template match="xs:complexType">
    <xsl:element name="xs:enumeration">
      <xsl:attribute name="value">
        <xsl:value-of select="@name"/>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>
 
</xsl:stylesheet>