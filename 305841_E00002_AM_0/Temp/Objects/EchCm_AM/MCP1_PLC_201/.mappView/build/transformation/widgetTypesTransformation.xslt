<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	  xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:wdg="http://www.br-automation.com/iat2014/widget"
    xmlns:cat="http://schemas.microsoft.com/xsd/catalog" >
  <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:strip-space elements="*"></xsl:strip-space>
  <xsl:param name="basePath"></xsl:param>
  <xsl:param name="libPath"></xsl:param>
  <xsl:variable name="baseTypes" select="document(concat($basePath,'/WidgetLibraryBase.mapping'))"></xsl:variable>
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
      <xsl:apply-templates select="cat:Schema"></xsl:apply-templates>
    </xsl:element>
  </xsl:template>

  <xsl:template match="cat:Schema">
    <!-- remove element prefix -->
    <xsl:variable name="ref">
      <xsl:call-template name="string-replace-all">
        <xsl:with-param name="text" select="./@href"></xsl:with-param>
        <xsl:with-param name="replace" select="'.xsd'"></xsl:with-param>
        <xsl:with-param name="by" select="'.widget'"></xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <xsl:apply-templates select="document(concat($libPath,$ref))"></xsl:apply-templates>
  </xsl:template>

  <xsl:template match="wdg:WidgetLibrary/wdg:Widget">
    <xsl:apply-templates select="wdg:Methods/wdg:Method">
      <xsl:with-param name="wName" select="@name"></xsl:with-param>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="wdg:Methods/wdg:Method">
    <xsl:param name="wName"></xsl:param>
    <xsl:apply-templates select="wdg:Arguments/wdg:Argument">
      <xsl:with-param name="wName" select="concat($wName,'.Action.',@name)"></xsl:with-param>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="wdg:Arguments/wdg:Argument">
    <xsl:param name="wName"></xsl:param>
    <xsl:element name="Mapping">
      <xsl:attribute name="parameter">
        <xsl:value-of select="concat($wName,'.',@name)"/>
      </xsl:attribute>
      <xsl:variable name="x" select="@type"></xsl:variable>
      <xsl:variable name="baseType" select="$baseTypes//Mapping[@name=$x]"></xsl:variable>

      <xsl:attribute name="type">
        <xsl:value-of select="$baseType/@type"></xsl:value-of>
      </xsl:attribute>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>