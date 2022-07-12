<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bdg="http://www.br-automation.com/iat2015/binding/engineering/v2"
xmlns:be="http://www.br-automation.com/iat2015/bindingListEmbedded/engineering/v2"
xmlns:blt="http://www.br-automation.com/iat2015/bindingListTypes/engineering/v2"
xmlns:br="http://www.br-automation.com/iat2015/bindingList/runtime/v2"
xmlns="http://www.br-automation.com/iat2014/binding/runtime/v1">

  <xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:param name="expressionContentMappingFile" select="'./ExpressionContentMapping.xml'"/>
  <xsl:variable name="mappings" select="document($expressionContentMappingFile)//Mappings/*"/>

  <!-- all the lists with target brease -->
  <xsl:variable name="contentListBindings" select="//*/*[@xsi:type='listElements'][(../bdg:Target[@xsi:type='brease'])]"/>
  <xsl:variable name="newline">
    <xsl:text>
    </xsl:text>
  </xsl:variable>

  <!-- keep comments -->
  <xsl:template match="comment()">
    <xsl:copy>
      <xsl:apply-templates/>
    </xsl:copy>
  </xsl:template>

  <xsl:template name="getListScope">
    <xsl:param name="listId"/>
    <xsl:choose>
      <xsl:when test="$contentListBindings/@refId=$listId">
        <xsl:value-of select="'content'"></xsl:value-of>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="'visualization'"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="getExpressionScope">
    <xsl:param name="expressionId"/>
    <xsl:value-of select="'content'"/>
  </xsl:template>
  
  <xsl:template name="getScope">
    <xsl:choose>
      <!-- content scope -->
      <xsl:when test="bdg:Target/@xsi:type='brease'">
        <xsl:value-of select="'content'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Source/@xsi:type='brease'">
        <xsl:value-of select="'content'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Target/@xsi:type='expression'">
        <xsl:call-template name="getExpressionScope">
          <xsl:with-param name="expressionId" select="bdg:Target/@refId"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="bdg:Source/@xsi:type='expression'">
        <xsl:call-template name="getExpressionScope">
          <xsl:with-param name="expressionId" select="bdg:Source/@refId"/>
        </xsl:call-template>
      </xsl:when>
      <!-- listElement -->
      <xsl:when test="bdg:Source/bdg:Selector/@xsi:type='brease' or bdg:Source/be:List/@xsi:type='be:brease'">
        <xsl:value-of select="'content'"></xsl:value-of>
      </xsl:when>
      <!-- mixed scopes -->
      <xsl:when test="bdg:Target/@xsi:type='listSelector'">
        <xsl:call-template name="getListScope">
          <xsl:with-param name="listId" select="bdg:Target/@refId"/>
        </xsl:call-template>
      </xsl:when>
      <!-- session scopes: A&P 545630: Regression: Textkeys mit Snippets werden erst nach einem Refresh der Visualisierung korrekt angezeigt-->
      <xsl:when test="bdg:Source/@xsi:type='snippet' or bdg:Target/@xsi:type='snippet'">
        <xsl:value-of select="'session'"></xsl:value-of>
      </xsl:when>
      <!-- visualization scopes -->
      <xsl:when test="bdg:Source/@xsi:type='session'">
        <xsl:value-of select="'visualization'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Target/@xsi:type='session'">
        <xsl:value-of select="'visualization'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Source/@xsi:type='text'">
        <xsl:value-of select="'visualization'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Target/@xsi:type='text'">
        <xsl:value-of select="'visualization'"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Source/bdg:Selector/@xsi:type='session' or bdg:Source/be:List/@xsi:type='be:session'">
        <xsl:value-of select="'visualization'"></xsl:value-of>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="'server'"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="getListScopeId">
    <xsl:param name="listId"/>
    <xsl:choose>
      <xsl:when test="$contentListBindings/@refId=$listId">
        <xsl:variable name="listBinding" select="$contentListBindings[@refId=$listId]"/>
        <xsl:variable name="targetBinding" select="$listBinding/../bdg:Target"/>
        <!-- we assume that the target type is brease (our list only selects targets of type brease-->
        <xsl:value-of select="$targetBinding/@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="'visualization'"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="getExpressionScopeId">
    <xsl:param name="expression"/>
    <xsl:choose>
      <xsl:when test="$mappings[@expressionRefId=$expression/@refId]">
        <xsl:value-of select="$mappings[@expressionRefId=$expression/@refId]/@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:when test="$expression/@contentRefId">
        <!-- All expressions should be in expression mapping file (builder)!
          contentRefId is now deprecated in expression binding! We have to keep this for version 1.x (compatibility)
        <xsl:message terminate="no">
          Deprecated scope definition for expression <xsl:copy-of select="$expression"/>.
        </xsl:message>
        -->
        <xsl:value-of select="$expression/@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:otherwise>
        <!-- Could not find referenced expression in mapping file => builder error. -->
        <xsl:message terminate="yes">
          Referenced expression is unavailable: <xsl:copy-of select="$expression"/>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
    </xsl:template>
  
  <xsl:template name="getScopeId">
    <xsl:choose>
      <xsl:when test="bdg:Target/@xsi:type='brease'">
        <xsl:value-of select="bdg:Target/@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Source/@xsi:type='brease'">
        <xsl:value-of select="bdg:Source/@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Target/@xsi:type='expression'">
        <xsl:call-template name="getExpressionScopeId">
          <xsl:with-param name="expression" select="bdg:Target"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="bdg:Source/@xsi:type='expression'">
        <xsl:call-template name="getExpressionScopeId">
          <xsl:with-param name="expression" select="bdg:Source"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:when test="bdg:Source/bdg:Selector/@xsi:type='brease'">
        <xsl:value-of select="bdg:Source/bdg:Selector/@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Source/be:List/@xsi:type='be:brease'">
        <xsl:value-of select="bdg:Source/be:List/@contentRefId"></xsl:value-of>
      </xsl:when>
      <xsl:when test="bdg:Target/@xsi:type='listSelector'">
        <xsl:call-template name="getListScopeId">
          <xsl:with-param name="listId" select="bdg:Target/@refId"/>
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <!-- remove with session scope -->
        <xsl:value-of select="'_session'"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="copyAnyBinding">
    <!-- remove element prefix -->
    <xsl:element name="{local-name()}">
      <!-- process attributes -->
      <xsl:for-each select="@*">
        <xsl:attribute name="{name()}">
          <xsl:value-of select="."/>
        </xsl:attribute>
      </xsl:for-each>
      <xsl:apply-templates/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyContentElement">
    <xsl:value-of select="$newline"/>
    <xsl:element name="br:{local-name()}">
      <xsl:for-each select="@*">
        <xsl:choose>
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
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyContentList">
    <xsl:value-of select="$newline"/>
    <!-- remove element prefix -->
    <xsl:element name="br:{local-name()}">
      <!-- process attributes -->
      <!-- process attributes -->
      <xsl:attribute name="xsi:type">
        <xsl:value-of select="'br:brease'"/>
      </xsl:attribute>
      <xsl:attribute name="id">
        <xsl:call-template name="getIdFromTarget" />
      </xsl:attribute>
      <!-- copy all the elements -->
      <xsl:for-each select="blt:Element | blt:Default">
        <xsl:call-template name="copyContentElement"/>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copySessionElement">
    <xsl:value-of select="$newline"/>
    <xsl:element name="br:{local-name()}">
      <xsl:for-each select="@*">
        <xsl:attribute name="{local-name()}">
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
    <xsl:value-of select="$newline"/>
    <xsl:element name="br:{local-name()}">
      <!-- process attributes -->
      <xsl:attribute name="xsi:type">
        <xsl:choose>
          <xsl:when test="substring-after(@xsi:type, ':')='session'">
            <xsl:value-of select="'br:variable'"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:value-of select="concat('br:', substring-after(@xsi:type, ':'))"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:attribute>
      <xsl:attribute name="id">
        <xsl:call-template name="getIdFromTarget" />
      </xsl:attribute>
      <!-- copy all the elements -->
      <xsl:for-each select="blt:Element | blt:Default">
        <xsl:call-template name="copySessionElement" />
      </xsl:for-each>
    </xsl:element>
  </xsl:template>


  <xsl:template name="getIdFromTarget">
    <xsl:choose>
      <xsl:when test="../../bdg:Target/@xsi:type = 'brease'">
        <xsl:value-of select="concat(../../bdg:Target/@xsi:type, '*', ../../bdg:Target/@contentRefId, '_', ../../bdg:Target/@widgetRefId, '*', ../../bdg:Target/@attribute)"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="concat(../../bdg:Target/@xsi:type, '*', ../../bdg:Target/@refId, '*', ../../bdg:Target/@attribute)"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template name="copyListElement">
    <!-- copy source-->
    <xsl:element name="{local-name()}">
      <!-- copy all attributes + mode from binding-element (A&P 587115: Listbinding oneWayToSource is not working with session variable as target) -->
      <xsl:copy-of select="../@mode | @*"/>
      <!-- copy selector -->
      <xsl:for-each select="./bdg:Selector">
        <xsl:call-template name="copyScopedElement"/>
      </xsl:for-each>
      <!-- copy embedded list -->
      <xsl:for-each select="./be:List">
        <xsl:choose>
          <xsl:when test="substring-after(@xsi:type, ':')='opcUa' or substring-after(@xsi:type, ':')='session'">
            <xsl:call-template name="copySessionList"/>
          </xsl:when>
          <xsl:when test="substring-after(@xsi:type, ':')='brease'">
            <xsl:call-template name="copyContentList"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="copyScopedElement"/>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
      <!-- copy ref to external list -->
      <xsl:for-each select="./bdg:List">
        <xsl:element name="List">
          <xsl:copy-of select="@*"/>
        </xsl:element>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <!-- copy any element and remove enginieering binding attributes -->
  <xsl:template name="copyScopedElement">
    <xsl:element name="{local-name()}">
      <xsl:for-each select="@*">
        <xsl:choose>
		      <xsl:when test="name()='xsi:type' and (.='server' or .='session')">
		        <xsl:attribute name="{name()}">
              <xsl:value-of select="'variable'"/>
            </xsl:attribute>
		      </xsl:when>
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

  <xsl:template match="*">
    <xsl:choose>
      <xsl:when test="@xsi:type='listElement'">
        <xsl:call-template name="copyListElement"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:call-template name="copyScopedElement"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="processBinding">
    <xsl:variable name="scope">
      <xsl:call-template name="getScope"/>
    </xsl:variable>
    <xsl:choose>
      <xsl:when test="$scope='content'">
        <xsl:element name="Content">
          <xsl:attribute name="id">
            <xsl:call-template name="getScopeId"/>
          </xsl:attribute>
          <xsl:call-template name="copyAnyBinding"/>
        </xsl:element>
      </xsl:when>
	  <xsl:when test="$scope='visualization'">
        <xsl:element name="Visualization">
          <xsl:call-template name="copyAnyBinding"/>
        </xsl:element>
      </xsl:when>
      <xsl:when test="$scope='session'">
        <xsl:element name="Session">
          <xsl:call-template name="copyAnyBinding"/>
        </xsl:element>
      </xsl:when>
      <xsl:when test="$scope='server'">
        <xsl:element name="Server">
          <xsl:call-template name="copyAnyBinding"/>
        </xsl:element>
      </xsl:when>
      <xsl:otherwise>
        <xsl:message terminate="yes">
          Invalid Scope for source <xsl:copy-of select="bdg:Source"/> target <xsl:copy-of select="bdg:Target"/>
        </xsl:message>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="bdg:BindingsSet">
    <xsl:element name="BindingDefinition">
      <!--process Bindings -->
      <xsl:for-each select="./bdg:Bindings/bdg:Binding">
        <xsl:call-template name="processBinding"/>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

</xsl:stylesheet>
