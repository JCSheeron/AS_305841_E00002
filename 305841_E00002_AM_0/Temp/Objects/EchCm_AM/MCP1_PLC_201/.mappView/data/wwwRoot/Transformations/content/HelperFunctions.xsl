<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:template match="*" mode="copy-no-namespaces">
    <xsl:element name="{name(.)}">
      <xsl:copy-of select="@*"/>
      <xsl:apply-templates mode="copy-no-namespaces"/>
    </xsl:element>
  </xsl:template>

  <!-- replace all occurences of "by" in "text" -->
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

  <!-- get path to widget folder -->
  <xsl:template name="getPathToWidgetFolder">
    <xsl:param name="basepath" />
    <xsl:param name="widgetFolders" />
    <xsl:param name="xsiType" />
    <xsl:param name="elpathdelimiter" />

    <xsl:variable name="widgetPath">
      <xsl:call-template name="getWidgetPath">
        <xsl:with-param name="xsiType" select="$xsiType" />
        <xsl:with-param name="elpathdelimiter" select="$elpathdelimiter"/>
      </xsl:call-template>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="$widgetFolders!='none'">
        <xsl:variable name="widgetPathMapping" select="document($widgetFolders)" />
        <xsl:value-of select="concat($widgetPathMapping//Widget[@type=$xsiType]/@path,$widgetPath,$elpathdelimiter)" />
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="concat($basepath,'widgets',$elpathdelimiter,$widgetPath,$elpathdelimiter)" />
      </xsl:otherwise>
    </xsl:choose>

  </xsl:template>


  <!-- template to get the widget name without namespace e.g. "Button" from fully qualified name, e.g. "widgets.brease.Button" -->
  <xsl:template name="getWidgetName">
    <xsl:param name="xsiType" />
    <xsl:choose>
      <xsl:when test="contains($xsiType,'.')">
        <xsl:call-template name="getWidgetName">
          <xsl:with-param name="xsiType" select="substring-after($xsiType,'.')" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$xsiType"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- template to get the widget path e.g. "brease\Button" from fully qualified name, e.g. "widgets.brease.Button" -->
  <xsl:template name="getWidgetPath">
    <xsl:param name="xsiType"></xsl:param>
    <xsl:param name="elpathdelimiter"></xsl:param>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="substring-after($xsiType,'.')" />
      <xsl:with-param name="replace" select="'.'" />
      <xsl:with-param name="by" select="$elpathdelimiter" />
    </xsl:call-template>
  </xsl:template>

  <!-- template to get the widget type e.g. "widgets/brease/Button" from fully qualified name, e.g. "widgets.brease.Button" -->
  <xsl:template name="getWidgetType">
    <xsl:param name="xsiType"></xsl:param>
    <xsl:call-template name="string-replace-all">
      <xsl:with-param name="text" select="$xsiType" />
      <xsl:with-param name="replace" select="'.'" />
      <xsl:with-param name="by" select="'/'" />
    </xsl:call-template>
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