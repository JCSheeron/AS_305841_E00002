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
    <xsl:element name="Mappings">
      <xsl:message>
        <xsl:value-of select="$basePath"/>
      </xsl:message>
      <xsl:apply-templates select="cat:Schema"></xsl:apply-templates>
    </xsl:element>
  </xsl:template>

  <xsl:template match="cat:Schema">
    <!-- remove element prefix -->
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
    <!-- remove element prefix -->
    <xsl:apply-templates select="xs:simpleType"></xsl:apply-templates>
    <xsl:apply-templates select="xs:complexType"></xsl:apply-templates>
  </xsl:template>

  <xsl:template match="xs:simpleType">
    <!-- remove element prefix -->
    <xsl:element name="Mapping">
      <xsl:attribute name="name">
        <xsl:value-of select="@name"/>
      </xsl:attribute>
      <xsl:attribute name="type">
        <xsl:choose>
          <xsl:when test="@name = 'Boolean'">
            <xsl:text>BOOL</xsl:text>
          </xsl:when>
          <xsl:when test="@name = 'DateTime'">
            <xsl:text>DATE_AND_TIME</xsl:text>
          </xsl:when>
          <xsl:when test="xs:restriction">
            <xsl:call-template name="getDataType">
              <xsl:with-param name="el" select="xs:restriction"></xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:when test="xs:union/xs:simpleType/xs:restriction">
            <xsl:call-template name="getDataType">
              <xsl:with-param name="el" select="xs:union/xs:simpleType/xs:restriction"></xsl:with-param>
            </xsl:call-template>
          </xsl:when>
          <xsl:otherwise></xsl:otherwise>
        </xsl:choose>

      </xsl:attribute>
    </xsl:element>
  </xsl:template>

  <xsl:template match="xs:complexType">
    <xsl:choose>
      <xsl:when test="@name = 'NumberArray1D'">
        <xsl:element name="Mapping">
          <xsl:attribute name="name">
            <xsl:value-of select="@name"/>
          </xsl:attribute>
          <xsl:attribute name="type">
            <xsl:text>ANY_REAL_ARRAY</xsl:text>
          </xsl:attribute>
        </xsl:element>
      </xsl:when>
      <xsl:when test="@name = 'BooleanArray1D'">
        <xsl:element name="Mapping">
          <xsl:attribute name="name">
            <xsl:value-of select="@name"/>
          </xsl:attribute>
          <xsl:attribute name="type">
            <xsl:text>BOOL_ARRAY</xsl:text>
          </xsl:attribute>
        </xsl:element>
      </xsl:when>
      <xsl:when test="@name = 'StringArray1D'">
        <xsl:element name="Mapping">
          <xsl:attribute name="name">
            <xsl:value-of select="@name"/>
          </xsl:attribute>
          <xsl:attribute name="type">
            <xsl:text>ANY_STRING_ARRAY</xsl:text>
          </xsl:attribute>
        </xsl:element>
      </xsl:when>
      <xsl:when test="@name = 'DateTimeArray1D'">
        <xsl:element name="Mapping">
          <xsl:attribute name="name">
            <xsl:value-of select="@name"/>
          </xsl:attribute>
          <xsl:attribute name="type">
            <xsl:text>ANY_STRING_ARRAY</xsl:text>
          </xsl:attribute>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message>
          Unknown complex type:
          <xsl:value-of select="@name"/>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="getDataType">
    <xsl:param name="el"></xsl:param>
    <xsl:choose>
      <xsl:when test="$el/@base = 'xs:string'">
        <xsl:text>ANY_STRING</xsl:text>
      </xsl:when>
      <xsl:when test="$el/@base = 'xs:decimal'">
        <xsl:text>ANY_REAL</xsl:text>
      </xsl:when>
      <xsl:when test="$el/@base = 'xs:double'">
        <xsl:text>ANY_REAL</xsl:text>
      </xsl:when>
      <xsl:when test="$el/@base = 'xs:integer'">
        <xsl:text>ANY_INT</xsl:text>
      </xsl:when>
      <xsl:when test="$el/@base = 'xs:boolean'">
        <xsl:text>BOOL</xsl:text>
      </xsl:when>
      <xsl:when test="$el/@base = 'types:AutoSize'">
        <xsl:text>ANY_STRING</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          Unknown base type:
          <xsl:value-of select="$el/@base"/>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>
</xsl:stylesheet>
