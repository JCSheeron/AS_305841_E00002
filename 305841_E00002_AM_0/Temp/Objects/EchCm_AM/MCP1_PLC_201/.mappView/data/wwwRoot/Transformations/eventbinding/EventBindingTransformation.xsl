<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns="http://www.br-automation.com/iat2014/eventbinding/runtime/v2"
  xmlns:eb="http://www.br-automation.com/iat2014/eventbinding/v2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:variable name="file" select="'./ParameterTypeMapping.xml'"/>
	<xsl:variable name="mappings" select="document($file)//Mappings/*"/>

	<!-- keep comments -->
	<xsl:template match="comment()">
		<xsl:copy>
			<xsl:apply-templates/>
		</xsl:copy>
	</xsl:template>

	<!-- default element match => copy element without namespace (remove engineering namespace)-->
	<xsl:template match="*">
		<xsl:element name="{local-name()}">
			<xsl:apply-templates select="@* | node()"/>
		</xsl:element>
	</xsl:template>

	<!-- default attribute match => copy attribute without namespace (eg. remove xsi: ) -->
	<xsl:template match="@*">
		<xsl:attribute name="{local-name()}">
			<xsl:value-of select="."/>
		</xsl:attribute>
	</xsl:template>

  <!-- rename EventBindingsSet and compute all EventBindings -->
	<xsl:template match="eb:EventBindingSet">
		<xsl:element name="EventBindingDefinition">
			<xsl:apply-templates select="//eb:EventBinding"/>
		</xsl:element>
	</xsl:template>

	<!-- compute and add scope for all EventBinding elements -->
	<xsl:template match="eb:EventBinding">
		<xsl:variable name="scope">
			<xsl:call-template name="getScope"/>
		</xsl:variable>
		<xsl:choose>
			<xsl:when test="$scope='session'">
				<xsl:element name="Visualization">
					<xsl:element name="{local-name()}">
						<xsl:apply-templates select="@*[name()!='comment'] | node()"/>
					</xsl:element>
				</xsl:element>
			</xsl:when>
			<xsl:when test="$scope='content'">
				<xsl:element name="Content">
					<xsl:attribute name="id">
            <xsl:call-template name="getContentScopeId">
              <xsl:with-param name="widgetElements" select="eb:EventHandler//eb:Target[starts-with(@xsi:type,'widgets')] | eb:Operand/eb:ReadTarget[starts-with(@xsi:type,'widgets')] | eb:Source[starts-with(@xsi:type,'widgets')]" />
            </xsl:call-template>
					</xsl:attribute>
					<xsl:element name="{local-name()}">
						<xsl:apply-templates select="@*[name()!='comment'] | node()"/>
					</xsl:element>
				</xsl:element>
			</xsl:when>
			<xsl:otherwise>
				<xsl:message terminate="yes">
          Error: Invalid EventBinding. EventBinding with OpcUa-Event and OpcUa-Action is not supported.
				</xsl:message>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

  <!-- compute lowest scope of source and all targets -->
  <xsl:template name="getScope">
    <xsl:variable name="scope">
      <xsl:call-template name="convertTypeToScope">
        <xsl:with-param name="nodes" select="eb:EventHandler//eb:Target | eb:Operand/eb:ReadTarget | eb:Source" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:value-of select="$scope"/>
  </xsl:template>

  <!-- selects the lowest scope of all nodes -->
  <xsl:template name="convertTypeToScope">
    <xsl:param name="nodes"/>
    <xsl:choose>
      <xsl:when test="$nodes[starts-with(@xsi:type, 'widgets')]">
        <xsl:value-of select="'content'"/>
      </xsl:when>
      <xsl:when test="$nodes[starts-with(@xsi:type, 'clientSystem')]">
        <xsl:value-of select="'session'"/>
      </xsl:when>
      <xsl:when test="$nodes[starts-with(@xsi:type, 'session')]">
        <xsl:value-of select="'session'"/>
      </xsl:when>
      <xsl:when test="$nodes[starts-with(@xsi:type, 'mappSystem')]">
        <xsl:value-of select="'session'"/>
      </xsl:when>
      <xsl:when test="$nodes[starts-with(@xsi:type, 'opcUaSystem')]">
        <xsl:value-of select="'session'"/>
      </xsl:when>
      <xsl:when test="$nodes[starts-with(@xsi:type, 'opcUa.System')]">
        <xsl:value-of select="'session'"/>
      </xsl:when>
      <xsl:when test="$nodes[starts-with(@xsi:type, 'opcUa')]">
        <xsl:value-of select="'plc'"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="'unknown target'"></xsl:value-of>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- returns the content scope id and verifies if the event binding does not use different content scopes -->
  <xsl:template name="getContentScopeId">
    <xsl:param name="widgetElements"/>
    <xsl:variable name="firstFoundId">
      <xsl:value-of select="$widgetElements[1]/@contentRefId" />
    </xsl:variable>
    <xsl:if test="$widgetElements[@contentRefId != $firstFoundId]">
      <xsl:message terminate="yes">
        Error: Event source or targets uses different contents. (First: "<xsl:value-of select="$firstFoundId" />" Second: "<xsl:value-of select="$widgetElements[@contentRefId != $firstFoundId]/@contentRefId" />")
        Only one content can be used in one EventBinding.
      </xsl:message>
    </xsl:if>
    <xsl:value-of select="$firstFoundId" />
  </xsl:template>

  <!-- for all widget elements combine contentRefId and widgetRefId attributes to attribute refId -->
  <xsl:template match="eb:Target[starts-with(@xsi:type,'widgets')] | eb:ReadTarget[starts-with(@xsi:type,'widgets')] | eb:Source[starts-with(@xsi:type,'widgets')]">
    <xsl:element name="{local-name()}">
      <xsl:apply-templates select="@*[local-name() !='widgetRefId' and local-name() != 'contentRefId']"/>
      <xsl:attribute name="refId">
        <xsl:value-of select="./@contentRefId"/>
        <xsl:text>_</xsl:text>
        <xsl:value-of select="./@widgetRefId"/>
      </xsl:attribute>
      <xsl:apply-templates select="node()"/>
    </xsl:element>
  </xsl:template>

  <!-- for all mappSystem actions prepend "ASGlobal::" to refId and add methodRefId attribute; TODO: opcua node id's should be read from a meta data file -->
  <xsl:template match="eb:Target[@xsi:type='mappSystem.Action']">
    <xsl:variable name="refId">
      <xsl:value-of select="concat('ASGlobal::', @refId)"/>
    </xsl:variable>
    <xsl:variable name="methodName">
      <xsl:call-template name="substring-after-last">
        <xsl:with-param name="input" select="./eb:Method/@xsi:type" />
        <xsl:with-param name="separator" select="'.'" />
      </xsl:call-template>
    </xsl:variable>
    <xsl:element name="{local-name()}">
      <xsl:attribute name="refId">
        <xsl:value-of select="$refId"/>
      </xsl:attribute>
      <xsl:attribute name="methodRefId">
        <xsl:value-of select="concat($refId, ':', $methodName)"/>
      </xsl:attribute>
      <xsl:apply-templates select="@*[name()!='refId'] | node()"/>
    </xsl:element>
  </xsl:template>

  <xsl:template name="substring-after-last">
    <xsl:param name="input" />
    <xsl:param name="separator" />
    <xsl:choose>
      <xsl:when test="contains($input, $separator)">
        <xsl:call-template name="substring-after-last">
          <xsl:with-param name="input" select="substring-after($input, $separator)" />
          <xsl:with-param name="separator" select="$separator" />
        </xsl:call-template>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$input" />
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

	<xsl:template match="eb:Method">
		<xsl:variable name="methodType">
			<xsl:value-of select="@xsi:type"/>
		</xsl:variable>

    <xsl:element name="{local-name()}">	
      <!-- copy method type without namespace -->
      <xsl:attribute name="type">
				<xsl:value-of select="$methodType"/>
			</xsl:attribute>
      <!-- transform method attributes to parameter elements -->  
      <xsl:for-each select="@*[name() !='xsi:type']">
				<xsl:variable name="parameterName">
					<xsl:value-of select="local-name()"/>
				</xsl:variable>
				<xsl:variable name="mappedKey">
					<xsl:value-of select="concat($methodType, '.', $parameterName)"/>
				</xsl:variable>
				<!-- Raise error if parameter definition is missing -->
				<xsl:if test="not($mappings[@parameter=$mappedKey]/@type)">
					<xsl:message terminate="yes">
						<xsl:text>Missing Parameter definition: </xsl:text>
						<xsl:value-of select ="$mappedKey" />
					</xsl:message>
				</xsl:if>
				<xsl:variable name="mappedType">
					<xsl:value-of select ="$mappings[@parameter=$mappedKey]/@type" />
				</xsl:variable>
				<xsl:element name="Parameter">
					<xsl:attribute name="name">
						<xsl:value-of select="$parameterName"/>
					</xsl:attribute>
					<xsl:attribute name="xsi:type">
						<xsl:value-of select="$mappedType"/>
					</xsl:attribute>
					<xsl:attribute name="value">
						<xsl:value-of select="."/>
					</xsl:attribute>
				</xsl:element>
			</xsl:for-each>

    <!-- compute alle complex parameters (childs of of Argument element -->
    <xsl:for-each select="*/*">
      <xsl:variable name="parameterName">
        <xsl:value-of select="local-name()"/>
      </xsl:variable>
      <xsl:variable name="mappedKey">
        <xsl:value-of select="concat($methodType, '.', $parameterName)"/>
      </xsl:variable>
      <!-- Raise error if parameter definition is missing -->
      <xsl:if test="not($mappings[@parameter=$mappedKey]/@type)">
        <xsl:message terminate="yes">
          <xsl:text>Missing Parameter definition: </xsl:text>
          <xsl:value-of select ="$mappedKey" />
        </xsl:message>
      </xsl:if>
      <xsl:variable name="mappedType">
        <xsl:value-of select ="$mappings[@parameter=$mappedKey]/@type" />
      </xsl:variable>
      <xsl:element name="Parameter">
        <xsl:attribute name="name">
          <xsl:value-of select="$parameterName"/>
        </xsl:attribute>
        <xsl:attribute name="xsi:type">
          <xsl:value-of select="$mappedType"/>
        </xsl:attribute>
        <!-- copy argument value -->
        <xsl:apply-templates/>
      </xsl:element>
    </xsl:for-each>
    </xsl:element>
	</xsl:template>
</xsl:stylesheet>