<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.br-automation.com/iat2014/snippet/runtime/v1"
  xmlns:eng="http://www.br-automation.com/iat2015/snippet/engineering/v3"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>

	<!-- keep comments -->
	<xsl:template match="comment()">
		<xsl:copy>
			<xsl:apply-templates/>
		</xsl:copy>
	</xsl:template>

  <xsl:template match="eng:Snippet" mode="copy">
    <xsl:element name="Snippet">
      <xsl:copy-of select="@id"/>
      <xsl:copy-of select="@type"/>
      <xsl:copy-of select="@formatItem"/>
      <!-- TODO: create scope entry from xsi:type -->
    </xsl:element>
  </xsl:template>

  <xsl:template match="*" mode="copy">
    <xsl:element name="{name(.)}">
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates mode="copy-no-namespaces"/>
    </xsl:element>
  </xsl:template>

  <!--Starting Point of the Transformation-->
  <xsl:template match="/">

    <xsl:if test="eng:SnippetsSet">
      <xsl:element name="SnippetDefinition">
        <!--process all snippets -->
        <xsl:for-each select="eng:SnippetsSet/eng:Snippets">
          <xsl:apply-templates mode="copy" select="./*"></xsl:apply-templates>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>
