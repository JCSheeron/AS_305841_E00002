<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Harald Blab
// Created: November 12, 2014
// Stylesheet to transform datasource binding definitions
//
// Source format: Engineering Binding
// Target format: Engineering Binding
//
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:bdg="http://www.br-automation.com/iat2015/binding/engineering/v2"
xmlns="http://www.br-automation.com/iat2015/binding/engineering/v2" >
  <xsl:output method="xml" encoding="UTF-8" indent="yes" />

  <!-- Template Function to process a page-->
  <xsl:template name="processBindings">
    <xsl:element name="Bindings">
      <xsl:for-each select="bdg:Binding">
        <xsl:choose>
          <xsl:when test="bdg:Source/@xsi:type='dataSource'">
            <xsl:call-template name="createDataSourceBindings"></xsl:call-template>
          </xsl:when>
          <xsl:otherwise>
            <xsl:call-template name="copyAnyBinding"></xsl:call-template>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:for-each>
    </xsl:element>
  </xsl:template>

  <xsl:template name="copyAnyBinding">
    <xsl:copy-of select="."/>
  </xsl:template>

  <!-- create a Data Source binding from the currently selected Binding entry -->
  <xsl:template name="createDataSourceViewBinding">
    <xsl:element name="Binding">
      <xsl:attribute name="mode">
        <xsl:text>oneWay</xsl:text>
      </xsl:attribute>
      <!-- Source from data source -->
      <xsl:element name="Source">
        <xsl:copy-of select="bdg:Source/@xsi:type"/>
        <xsl:copy-of select="bdg:Source/@refId"/>
        <xsl:copy-of select="bdg:Source/@attribute"/>
      </xsl:element>
      <!-- target from data source -->
      <xsl:element name="Target">
        <xsl:copy-of select="bdg:Target/@*"/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

  <!-- create a Data Source Query binding from the currently selected Binding entry -->
  <xsl:template name="createDataSourceQueryBinding">
    <xsl:if test="boolean(./bdg:Source/bdg:Selectors/bdg:SelectorQuery)">
      <xsl:element name="Binding">
        <xsl:attribute name="mode">
          <xsl:text>oneWay</xsl:text>
        </xsl:attribute>
        <!-- Source from SelectorQuery -->
        <xsl:element name="Source">
          <xsl:copy-of select="bdg:Source/bdg:Selectors/bdg:SelectorQuery/bdg:Target/@*"/>
        </xsl:element>
        <!-- Target from data source -->
        <xsl:element name="Target">
          <xsl:copy-of select="bdg:Source/@xsi:type"/>
          <xsl:copy-of select="bdg:Source/@refId"/>
          <xsl:attribute name="attribute">
            <xsl:text>query</xsl:text>
          </xsl:attribute>
        </xsl:element>
      </xsl:element>
    </xsl:if>
  </xsl:template>

  <!-- create a Data Source count binding from the currently selected Binding entry -->
  <xsl:template name="createDataSourceCountBinding">
    <xsl:if test="boolean(./bdg:Source/bdg:Selectors/bdg:SelectorCount)">
      <xsl:element name="Binding">
        <xsl:attribute name="mode">
          <xsl:text>oneWay</xsl:text>
        </xsl:attribute>
        <!-- Source from data source -->
        <xsl:element name="Source">
          <xsl:copy-of select="bdg:Source/@xsi:type"/>
          <xsl:copy-of select="bdg:Source/@refId"/>
          <xsl:attribute name="attribute">
            <xsl:text>count</xsl:text>
          </xsl:attribute>
        </xsl:element>
        <!-- Target from SelectorCount -->
        <xsl:element name="Target">
          <xsl:copy-of select="bdg:Source/bdg:Selectors/bdg:SelectorCount/bdg:Target/@*"/>
        </xsl:element>
      </xsl:element>
    </xsl:if>
  </xsl:template>

  <!-- create a Data Source Limit binding from the currently selected Binding entry -->
  <xsl:template name="createDataSourceLimitBinding">
    <xsl:if test="boolean(./bdg:Source/bdg:Selectors/bdg:SelectorLimit)">
      <xsl:element name="Binding">
        <xsl:attribute name="mode">
          <xsl:text>oneWay</xsl:text>
        </xsl:attribute>
        <!-- Source from SelectorQuery -->
        <xsl:element name="Source">
          <xsl:copy-of select="bdg:Source/bdg:Selectors/bdg:SelectorLimit/bdg:Target/@*"/>
        </xsl:element>
        <!-- Target from data source -->
        <xsl:element name="Target">
          <xsl:copy-of select="bdg:Source/@xsi:type"/>
          <xsl:copy-of select="bdg:Source/@refId"/>
          <xsl:attribute name="attribute">
            <xsl:text>limit</xsl:text>
          </xsl:attribute>
        </xsl:element>
      </xsl:element>
    </xsl:if>
  </xsl:template>

  <!-- create a Data Source Offset binding from the currently selected Binding entry -->
  <xsl:template name="createDataSourceOffsetBinding">
      <xsl:if test="boolean(./bdg:Source/bdg:Selectors/bdg:SelectorOffset)">
        <xsl:element name="Binding">
          <xsl:attribute name="mode">
            <xsl:text>oneWay</xsl:text>
          </xsl:attribute>
          <!-- Source from SelectorQuery -->
          <xsl:element name="Source">
            <xsl:copy-of select="bdg:Source/bdg:Selectors/bdg:SelectorOffset/bdg:Target/@*"/>
          </xsl:element>
          <!-- Target from data source -->
          <xsl:element name="Target">
            <xsl:copy-of select="bdg:Source/@xsi:type"/>
            <xsl:copy-of select="bdg:Source/@refId"/>
            <xsl:attribute name="attribute">
              <xsl:text>offset</xsl:text>
            </xsl:attribute>
          </xsl:element>
        </xsl:element>
      </xsl:if>
  </xsl:template>

	<!-- create a Data Source Notification binding from the currently selected Binding entry -->
	<xsl:template name="createDataSourceNotificationBinding">
		<xsl:if test="boolean(./bdg:Source/bdg:Selectors/bdg:SelectorNotification)">
			<xsl:element name="Binding">
				<xsl:attribute name="mode">
					<xsl:text>oneWay</xsl:text>
				</xsl:attribute>
				<!-- Source from data source -->
				<xsl:element name="Source">
					<xsl:copy-of select="bdg:Source/@xsi:type"/>
					<xsl:copy-of select="bdg:Source/@refId"/>
					<xsl:attribute name="attribute">
						<xsl:text>notification</xsl:text>
					</xsl:attribute>
				</xsl:element>
				<!-- Target from SelectorNotification -->
				<xsl:element name="Target">
					<xsl:copy-of select="bdg:Source/bdg:Selectors/bdg:SelectorNotification/bdg:Target/@*"/>
				</xsl:element>
			</xsl:element>
		</xsl:if>
	</xsl:template>

	<!-- create a Data Source Busy binding from the currently selected Binding entry -->
	<xsl:template name="createDataSourceBusyBinding">
		<xsl:if test="boolean(./bdg:Source/bdg:Selectors/bdg:SelectorBusy)">
			<xsl:element name="Binding">
				<xsl:attribute name="mode">
					<xsl:text>oneWay</xsl:text>
				</xsl:attribute>
				<!-- Source from data source -->
				<xsl:element name="Source">
					<xsl:copy-of select="bdg:Source/@xsi:type"/>
					<xsl:copy-of select="bdg:Source/@refId"/>
					<xsl:attribute name="attribute">
						<xsl:text>busy</xsl:text>
					</xsl:attribute>
				</xsl:element>
				<!-- Target from SelectorNotification -->
				<xsl:element name="Target">
					<xsl:copy-of select="bdg:Source/bdg:Selectors/bdg:SelectorBusy/bdg:Target/@*"/>
				</xsl:element>
			</xsl:element>
		</xsl:if>
	</xsl:template>

	<!-- create a Data Source SlotId binding from the currently selected Binding entry -->
	<xsl:template name="createDataSourceSlotIdBinding">
		<xsl:element name="Binding">
			<xsl:attribute name="mode">
				<xsl:text>oneWay</xsl:text>
			</xsl:attribute>
			<!-- Source from session variable -->
			<xsl:element name="Source">
				<xsl:attribute name="xsi:type">
					<xsl:text>session</xsl:text>
				</xsl:attribute>
				<xsl:attribute name="refId">
					<xsl:text>::SYSTEM:clientInfo.slotId</xsl:text>
				</xsl:attribute>
				<xsl:attribute name="attribute">
					<xsl:text>value</xsl:text>
				</xsl:attribute>
			</xsl:element>
			<!-- Target from DataSource -->
			<xsl:element name="Target">
				<xsl:copy-of select="bdg:Source/@xsi:type"/>
				<xsl:copy-of select="bdg:Source/@refId"/>
				<xsl:attribute name="attribute">
					<xsl:text>slotid</xsl:text>
				</xsl:attribute>
			</xsl:element>
		</xsl:element>
	</xsl:template>

  <!-- Extraction of Datasource Binding-->
  <!-- Any selector is translated to a runtime datasource binding -->
  <xsl:template name="createDataSourceBindings">
    <xsl:call-template name="createDataSourceViewBinding"/>
    <xsl:call-template name="createDataSourceQueryBinding"/>
    <xsl:call-template name="createDataSourceCountBinding"/>
    <xsl:call-template name="createDataSourceLimitBinding"/>
    <xsl:call-template name="createDataSourceOffsetBinding"/>
		<xsl:call-template name="createDataSourceNotificationBinding"/>
		<xsl:call-template name="createDataSourceBusyBinding"/>
		<xsl:call-template name="createDataSourceSlotIdBinding"/>
	</xsl:template>

  <xsl:template match="/">
    <xsl:if test="bdg:BindingsSet">
      <xsl:element name="BindingsSet">
        <!-- copy attributes -->
        <xsl:for-each select="bdg:BindingsSet/@*">
          <xsl:attribute name="{name()}">
            <xsl:value-of select="."/>
          </xsl:attribute>
        </xsl:for-each>
        <!--process Bindings -->
        <xsl:for-each select="bdg:BindingsSet/bdg:Bindings">
          <xsl:call-template name="processBindings"></xsl:call-template>
        </xsl:for-each>
      </xsl:element>
    </xsl:if>
  </xsl:template>

</xsl:stylesheet>