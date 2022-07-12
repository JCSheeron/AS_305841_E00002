<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns="http://www.br-automation.com/iat2014/session/runtime/v1"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:var="http://www.br-automation.com/iat2015/session/engineering/v1">

  <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>

  <!-- keep comments -->
  <xsl:template match="comment()">
    <xsl:copy>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>


  <xsl:template match="*">
    <xsl:apply-templates select="var:VariablesSet"/>
  </xsl:template>

  <xsl:template match="var:VariablesSet">
    <xsl:element name="VariableDefinition">
      <xsl:apply-templates select="var:Variables/var:Variable"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="getScopeElementName">
    <xsl:variable name="scope" select="./@scope"/>
    <xsl:choose>
      <xsl:when test="not($scope)">
        <xsl:value-of select="'Session'"/>
      </xsl:when>
      <xsl:when test="$scope='session'">
        <xsl:value-of select="'Session'"/>
      </xsl:when>
      <xsl:when test="$scope='server'">
        <xsl:value-of select="'Server'"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          Undefined variable scope <xsl:value-of select="$scope"/>.
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="var:Variables/var:Variable">
    <xsl:variable name="scope" select="./@scope"/>
    <xsl:variable name="scopeElement">
      <xsl:call-template name="getScopeElementName"/>
    </xsl:variable>
    <!-- remove element prefix -->
    <xsl:element name="{$scopeElement}">
      <xsl:element name="{local-name()}">
        <!-- process attributes -->
        <xsl:for-each select="@*">
          <xsl:if test="not(name()='scope')">
            <!-- DON NOT remove attribute prefix -->
            <xsl:attribute name="{name()}">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:if>
        </xsl:for-each>
      </xsl:element>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
