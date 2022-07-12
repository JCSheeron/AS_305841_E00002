<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bdg="http://www.br-automation.com/iat2015/bindingList/engineering/v2"
xmlns:bt="http://www.br-automation.com/iat2015/bindingListTypes/engineering/v2"
xmlns="http://www.br-automation.com/iat2015/bindingList/runtime/v2">

  <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:variable name="separator" select="'_'" />

  <!-- keep comments -->
  <xsl:template match="comment()">
    <xsl:copy>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>

  <xsl:template name="getScope">
    <xsl:choose>
      <xsl:when test="@xsi:type='brease'">
        <xsl:value-of select="'content'"></xsl:value-of>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="'session'"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="getScopeId">
    <xsl:choose>
      <xsl:when test="@xsi:type='brease'">
        <xsl:value-of select="./@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:otherwise>
        <!-- remove with session scope -->
        <xsl:value-of select="'_session'"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="copyContentElement">
    <xsl:variable name="contentId" select="../@contentRefId"/>
    <xsl:element name="{local-name()}">
      <xsl:for-each select="@*">
        <xsl:choose>
          <xsl:when test="name()='widgetRefId'">
            <xsl:attribute name="refId">
              <xsl:value-of select="$contentId"/>
              <xsl:value-of select="$separator"/>
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="{name()}">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyContentList">
    <!-- remove element prefix -->
    <xsl:element name="{local-name()}">
      <!-- process attributes -->
      <xsl:for-each select="@*">
        <xsl:choose>
          <xsl:when test="name()='contentRefId'">
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="{name()}">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
      <!-- copy all the elements -->
      <xsl:for-each select="bt:Element | bt:Default">
        <xsl:call-template name="copyContentElement"/>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copySessionElement">
    <xsl:element name="{local-name()}">
      <xsl:for-each select="@*">
        <xsl:attribute name="{name()}">
          <xsl:value-of select="."/>
        </xsl:attribute>
      </xsl:for-each>
      <xsl:copy-of select="../@attribute"/>
      <xsl:copy-of select="../@serverAlias"/>
      <xsl:copy-of select="../@nameSpaceAlias"/>
      <xsl:copy-of select="../@samplingRate"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copySessionList">
    <xsl:element name="{local-name()}">
      <!-- process attributes -->
      <xsl:for-each select="@*">
        <xsl:choose>
          <!-- do not copy this attributes -->
          <xsl:when test="name()='attribute' or name()='samplingRate' or name()='serverAlias' or name()='nameSpaceAlias'">
          </xsl:when>
          <xsl:when test="name()='xsi:type' and .='session'">
            <xsl:attribute name="{name()}">
              <xsl:value-of select="'variable'"/>
            </xsl:attribute>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="{name()}">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
      <!-- copy all the elements -->
      <xsl:for-each select="bt:Element | bt:Default">
        <xsl:call-template name="copySessionElement" />
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <!-- used to copy the binding observables -->
  <xsl:template match="*">
    <xsl:element name="{local-name()}">
      <xsl:for-each select="@*">
        <xsl:choose>
          <xsl:when test="name()='contentRefId'">
          </xsl:when>
          <xsl:when test="name()='widgetRefId'">
            <xsl:attribute name="refId">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="{name()}">
              <xsl:value-of select="."/>
            </xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
      <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="processBindingList">
    <xsl:variable name="scope">
      <xsl:call-template name="getScope"/>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$scope='content'">
        <xsl:element name="Content">
          <xsl:attribute name="id">
            <xsl:call-template name="getScopeId"/>
          </xsl:attribute>
          <xsl:call-template name="copyContentList"/>
        </xsl:element>
      </xsl:when>
      <xsl:when test="$scope='session'">
        <xsl:element name="Session">
          <xsl:call-template name="copySessionList"/>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          Invalid Scope for list <xsl:copy-of select="bdg:List"/>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="bdg:BindingListsSet">
    <xsl:element name="BindingListDefinition">
      <!--process Bindings -->
      <xsl:for-each select="./bdg:BindingLists/bdg:List">
        <xsl:call-template name="processBindingList"/>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
