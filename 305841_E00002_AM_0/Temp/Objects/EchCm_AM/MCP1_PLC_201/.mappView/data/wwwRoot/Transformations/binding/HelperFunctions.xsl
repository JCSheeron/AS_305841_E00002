<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Author: Brugger Martin
// Created: Augus 20, 2014
// Stylesheet to transform XML Binding definiton into runtime valid binding definition
-->

<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


	<xsl:template match="*" mode="copy-no-namespaces">
		<xsl:element name="{name(.)}">
			<xsl:copy-of select="@*"/>
			<xsl:apply-templates mode="copy-no-namespaces"/>
			<!--select="node()" mode="copy-no-namespaces"-->
		</xsl:element>
	</xsl:template>

	<!-- Helper Function to process a String Replace-->
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

	<!-- Helper Function to get the index Position of a string-->
	<xsl:template name="index-of">
		<xsl:param name="input" />
		<xsl:param name="substr" />

		<xsl:choose>
			<xsl:when test="contains($input, $substr)">
				<xsl:value-of select="string-length(substring-before($input, $substr))+1"/>
			</xsl:when>
			<xsl:otherwise>0</xsl:otherwise>
		</xsl:choose>

	</xsl:template>

</xsl:stylesheet>