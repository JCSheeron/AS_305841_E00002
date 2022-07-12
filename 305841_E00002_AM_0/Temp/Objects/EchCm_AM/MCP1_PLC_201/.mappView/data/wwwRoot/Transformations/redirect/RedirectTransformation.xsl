<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
  <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />

  <!-- remove all whitespace, newline -->
  <xsl:template match="text()" />

  <!-- templates for json -->
  
  <xsl:template match="Element[@ID='RedirectConfiguration']">
    <xsl:text>{</xsl:text>
    <xsl:apply-templates />
    <xsl:text>}</xsl:text>
  </xsl:template>

  <xsl:template match="Group[starts-with(@ID, 'DataRule')]">
    <xsl:call-template name="writeRule"></xsl:call-template>
    <xsl:text>,</xsl:text>
  </xsl:template>

  <xsl:template name="writeRule" match="Group[starts-with(@ID, 'DataRule')][last()]">
    <xsl:text>"</xsl:text>
    <xsl:value-of select="Property[@ID='Name']/@Value" />
    <xsl:text>"</xsl:text>
    <xsl:text>:{</xsl:text>
    <xsl:text>"visu":"</xsl:text>
    <xsl:value-of select="Property[@ID='VisuId']/@Value" />
    <xsl:text>", "op":"</xsl:text>
    <xsl:apply-templates />
    <xsl:text>"</xsl:text>
    <xsl:text>}</xsl:text>
  </xsl:template>

  <xsl:template match="Group[starts-with(@ID, 'DataRule')]/Property[@ID='VisuId' and not(@Value)]">
    <xsl:message terminate="yes">
      <xsl:text>No VisuId configured in rule: '</xsl:text>
      <xsl:value-of select="../Property[@ID='Name']/@Value" />
      <xsl:text>'!</xsl:text>
    </xsl:message>
  </xsl:template>
  
  <!-- templates for operation -->

  <!--templates for logical operators -->

  <xsl:template match="Group[@ID = 'Condition' or starts-with(@ID, 'Or')]">
    <xsl:apply-templates />
    <xsl:text>||</xsl:text>
  </xsl:template>

  <xsl:template match="Group[@ID = 'Condition' or starts-with(@ID, 'Or')][last()]">
    <xsl:apply-templates />
  </xsl:template>

  <xsl:template match="Group[starts-with(@ID, 'And')]">
    <xsl:text>&amp;&amp;</xsl:text>
    <xsl:apply-templates />
  </xsl:template>

  <!--templates for variables (meta data) -->

  <xsl:template match="Selector[@ID='Type']">
    <xsl:value-of select="@Value" />
    <xsl:apply-templates />
  </xsl:template>

  <xsl:template match="Selector[@ID='Type' and @Value='0']">
    <xsl:message terminate="yes">
      <xsl:text>No meta data type configured in rule: '</xsl:text>
      <xsl:value-of select="../../Property[@ID='Name']/@Value" />
      <xsl:text>'!</xsl:text>
    </xsl:message>
  </xsl:template>

  <!--templates for comparison operators -->

  <xsl:template match="Property[@ID = 'Operator' and @Value = 'EQ']">
    <xsl:text>===</xsl:text>
  </xsl:template>
  
  <xsl:template match="Property[@ID = 'Operator' and @Value = 'NEQ']">
    <xsl:text>!==</xsl:text>
  </xsl:template>

  <xsl:template match="Property[@ID = 'Operator' and @Value = 'LT']">
    <xsl:text>&lt;</xsl:text>
  </xsl:template>

  <xsl:template match="Property[@ID = 'Operator' and @Value = 'LE']">
    <xsl:text>&lt;=</xsl:text>
  </xsl:template>

  <xsl:template match="Property[@ID = 'Operator' and @Value = 'GT']">
    <xsl:text>&gt;</xsl:text>
  </xsl:template>

  <xsl:template match="Property[@ID = 'Operator' and @Value = 'GE']">
    <xsl:text>&gt;=</xsl:text>
  </xsl:template>

  <!--templates for methods -->

  <!-- String-Contains (hostname.indexOf('string')!==-1) -->
  <xsl:template match="Property[@ID = 'Operator' and @Value = 'CT']" >
    <xsl:text>.indexOf(</xsl:text>
    <xsl:call-template name="writeValueString">
      <xsl:with-param name="Context" select="following-sibling::Property" />
    </xsl:call-template>
    <xsl:text>)!==-1</xsl:text>
  </xsl:template>

  <!-- String-Not-Contains (hostname.indexOf('string')===-1) -->
  <xsl:template match="Property[@ID = 'Operator' and @Value = 'NCT']" >
    <xsl:text>.indexOf(</xsl:text>
    <xsl:call-template name="writeValueString">
      <xsl:with-param name="Context" select="following-sibling::Property" />
    </xsl:call-template>
    <xsl:text>)===-1</xsl:text>
  </xsl:template>

  <!-- IP-Compare (IPGT => ipaddress.gt('192.168.0.255')) -->
  <xsl:template match="Property[@ID = 'Operator' and starts-with(@Value, 'IP')]" >
    <xsl:text>.</xsl:text>
    <xsl:value-of select="translate(substring-after(@Value, 'IP'), $uppercase, $lowercase)"/>
    <xsl:text>(</xsl:text>
    <xsl:call-template name="writeValueString">
      <xsl:with-param name="Context" select="following-sibling::Property" />
    </xsl:call-template>
    <xsl:text>)</xsl:text>
  </xsl:template>

  <!--templates for values -->
  <xsl:template match="Property[substring-after(@ID, '_') = 'ValueNumeric']" >
    <xsl:value-of select="@Value" />
  </xsl:template>
  
  <xsl:template match="Property[substring-after(@ID, '_') = 'ValueString' 
                and ../Property[@ID = 'Operator' 
                and @Value != 'CT' and @Value != 'NCT'
                and not(starts-with(@Value, 'IP'))]]" name="writeValueString" >
      <xsl:param name="Context" select="."/>
      <xsl:text>'</xsl:text>
      <xsl:call-template name="stringEscape" >
        <xsl:with-param name="string" select="$Context/@Value" />
      </xsl:call-template>
      <xsl:text>'</xsl:text>
  </xsl:template>

  <xsl:template match="Property[substring-after(@ID, '_') = 'ValueRatio']" >
    <xsl:variable name="ratioSymbol" select="':'" />
    <xsl:value-of select="format-number(number(substring-before(@Value, $ratioSymbol)) 
                  div number(substring-after(@Value, $ratioSymbol)), '#.##')" />
  </xsl:template>

  <xsl:template match="Property[not(@Value)][substring-after(@ID, '_') = 'ValueRatio' or substring-after(@ID, '_') = 'ValueString' or substring-after(@ID, '_') = 'ValueNumeric']">
    <xsl:message terminate="yes">
      <xsl:text>No value configured in condition: '</xsl:text>
      <xsl:value-of select="ancestor::Group[1]/@ID" />
      <xsl:text>', rule: '</xsl:text>
      <xsl:value-of select="ancestor::Group[starts-with(@ID, 'DataRule')]/Property[@ID='Name']/@Value" />
      <xsl:text>'!</xsl:text>
    </xsl:message>
  </xsl:template>
  
  <!-- xslt utility functions -->
  <!-- escape javascript special string characters: ',",\\ -->
  <xsl:template name="stringEscape">
    <xsl:param name="string" select="''"/>
    
    <xsl:variable name="escapedSlash">
      <xsl:call-template name="stringReplaceAll">
        <xsl:with-param name="text" select="$string" />
        <xsl:with-param name="replace">\</xsl:with-param>
        <xsl:with-param name="by">\\</xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="escapedQuote">
      <xsl:call-template name="stringReplaceAll">
        <xsl:with-param name="text" select="$escapedSlash" />
        <xsl:with-param name="replace">"</xsl:with-param>
        <xsl:with-param name="by">\"</xsl:with-param>
      </xsl:call-template>
    </xsl:variable>
    <xsl:call-template name="stringReplaceAll">
      <xsl:with-param name="text" select="$escapedQuote" />
      <xsl:with-param name="replace">'</xsl:with-param>
      <xsl:with-param name="by">\'</xsl:with-param>
    </xsl:call-template>
  </xsl:template>
    
  <xsl:template name="stringReplaceAll">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
      <xsl:when test="$text = '' or $replace = '' or not($replace)" >
        <xsl:value-of select="$text" />
      </xsl:when>
      <xsl:when test="contains($text, $replace)">
        <xsl:value-of select="substring-before($text,$replace)" />
        <xsl:value-of select="$by" />
        <xsl:call-template name="stringReplaceAll">
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

</xsl:stylesheet>
