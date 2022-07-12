<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template name="string-replace-all">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:value-of select="$by" />
        <xsl:call-template name="string-replace-all">
          <xsl:with-param name="text"
          select="substring-after($text,$replace)" />
          <xsl:with-param name="replace" select="$replace" />
          <xsl:with-param name="by" select="$by" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="get-list-length">

    <xsl:param name="value" />

    <xsl:variable name="listLength1">
      <xsl:call-template name="string-remove-brackets">
        <xsl:with-param name="text" select="$value" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="listLength">
      <xsl:call-template name="count-elements">
        <xsl:with-param name="count" select="0" />
        <xsl:with-param name="text" select="$listLength1" />
      </xsl:call-template>
    </xsl:variable>

    <xsl:value-of select="$listLength" />

  </xsl:template>

  <xsl:template name="string-remove-brackets">
    <xsl:param name="text" />
    <xsl:choose>
      <xsl:when test="contains($text, '(')">
        <xsl:variable name="replacedText">
          <xsl:value-of select="substring-before($text,'(')" />
          <xsl:value-of select="substring-after($text,')')" />
        </xsl:variable>
        <xsl:call-template name="string-remove-brackets">
          <xsl:with-param name="text" select="$replacedText" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$text" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="count-elements">
    <xsl:param name="count" />
    <xsl:param name="text" />
    <xsl:choose>
      <xsl:when test="contains($text, ',')">
        <xsl:variable name="replacedText">
          <xsl:value-of select="substring-after($text,',')" />
        </xsl:variable>
        <xsl:call-template name="count-elements">
          <xsl:with-param name="count" select="$count+1" />
          <xsl:with-param name="text" select="$replacedText" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$count+1" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>