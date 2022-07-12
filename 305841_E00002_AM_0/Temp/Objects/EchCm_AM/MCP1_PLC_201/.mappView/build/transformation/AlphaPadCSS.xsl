<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Transformation of AlphaPad XML to widget SCSS
-->

<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:kb="http://www.br-automation.com/iat2019/alphapadDefinition/v1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      exclude-result-prefixes="xsi">

  <xsl:output method="text" encoding="UTF-8" indent="yes" />

  <xsl:param name="cssClassName"></xsl:param>
  <xsl:param name="widgetName"></xsl:param>

  <xsl:template match="/">
    <xsl:apply-templates select="kb:AlphaPad"/>
  </xsl:template>

  <xsl:template match="kb:AlphaPad">
    <xsl:text>@import "mixins.scss";
    .</xsl:text>
    <xsl:value-of select="$cssClassName"/>
    <xsl:text>{
    color: black;
    font-size:14px;
    background-size:cover;
    border: 9px solid #333333;
    button {
        border: 1px solid #555555;
        background-color:#FFF;
        background-size:cover;
        color:#000;
        font-size:20px;
        &amp;.active,  &amp;.selected {
          background-color:#FFA800;
        }
        position:absolute;
        white-space: nowrap;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        @include appearance(none);
        -webkit-tap-highlight-color: initial;
        outline: none;
        sub {
          font-size: 10px;
          position: absolute;
          bottom: 1px;
          right: 1px;
        }
        sup {
          font-size: 10px;
          position: absolute;
          top: 1px;
          right: 1px;
        }
    }
    .ActionImage {
      position:absolute;
      background-size:cover;
    }
    .ValueOutput:focus {
      outline:none;
    }
    .breaseIME {
        position:absolute;
        box-sizing: border-box;
        ol{
          background-color: transparent;
          font-family: inherit;
          font-size: inherit;
          color: inherit;

          li{
            list-style-position: inside; 
            padding: 5px; 
            white-space: nowrap; 
            color: inherit;
            background-color: transparent;
            font-size: inherit;
            font-family: inherit;
            border-top-style: none;
            border-bottom-style: none;
          }
          li:first-of-type{
            border-left-style: none;
          }
          li:last-of-type{
            border-right-style: none;
          }
        }
    }
    .breaseLayoutSelector {
        position:absolute;
        .dropdown {
            position: relative;
            height:100%;

            .button {
                outline: none;
                font-family: inherit;
                margin: 0;
                box-sizing: border-box;
                padding: 0;
                background-image: inherit;
                color: inherit;
                display:flex;
                justify-content: center;
                flex-direction: column;
                height:100%;
            }

            .dropdownlist {
                display: none;
                position: absolute;
                overflow: hidden;
                background-color: #fff;
                bottom: 20px;
                left: -1px;
                border: 1px solid #333;
                z-index: 11;
                background-image: inherit;
                font-family: inherit;
                color: inherit;

                div {
                    padding: 18px 22px;
                    background-image: inherit;
                    background-color: inherit;
                    font-family: inherit;
                    color: inherit;
                    line-height: initial;
                }

                div.selected {
                    background-color:#FFA800;
                }

                &amp;.open {
                    display: block;
                }
            }
        }
    }
  </xsl:text>
    <xsl:apply-templates select="kb:Header" mode="class"/>
    <xsl:text>
}
    </xsl:text>
    <xsl:apply-templates select="kb:Header" mode="elements"/>
    <xsl:apply-templates select="kb:Section"/>
    <xsl:apply-templates select="kb:Label"/>
    <xsl:apply-templates select="kb:NodeInfo"/>
    <xsl:apply-templates select="kb:Value"/>
    <xsl:apply-templates select="kb:ValueButton"/>
    <xsl:apply-templates select="kb:ActionButton"/>
    <xsl:apply-templates select="kb:ActionImage"/>
    <xsl:apply-templates select="kb:LayoutSelector"/>
    <xsl:apply-templates select="kb:IME"/>
  </xsl:template>

  <xsl:template match="kb:Header" mode="class">
    <xsl:text>header.breaseKeyboardHeader {
      display:block;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      margin: 0px;
      </xsl:text>
    <xsl:choose>
      <xsl:when test="@height">
        <xsl:text>height:</xsl:text>
        <xsl:value-of select="@height"/>
        <xsl:text>px;</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>height: 42px;</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
    <xsl:text>
      label {
        color: #fff;
        font-size: 18px;
      }
    }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:Header" mode="elements">
    <xsl:apply-templates select="kb:Label">
      <xsl:with-param name="prefix" select="'H'"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:NodeInfo">
      <xsl:with-param name="prefix" select="'H'"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="kb:Section">
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:text>_S</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
  position:absolute;
  display:inline-table;
  text-align:center;
  top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px; width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>

    <xsl:apply-templates select="kb:Label">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:NodeInfo">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:Value">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:ValueButton">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:ActionButton">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:ActionImage">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:LayoutSelector">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="kb:IME">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="kb:Label">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_Label</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
            position:absolute;
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            overflow: hidden;
            display:block;
            </xsl:text>
    <xsl:call-template name="textAlign"><xsl:with-param name="textAlign" select="@textAlign" /></xsl:call-template>
    <xsl:call-template name="multiLine"><xsl:with-param name="multiLine" select="@multiLine" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:NodeInfo">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_NodeInfo</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
            position:absolute;
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            overflow: hidden;
            display:block;
    </xsl:text>
    <xsl:call-template name="textAlign"><xsl:with-param name="textAlign" select="@textAlign" /></xsl:call-template>
    <xsl:call-template name="multiLine"><xsl:with-param name="multiLine" select="@multiLine" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:Value">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_Value</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
            position:absolute;
            box-sizing: border-box;
            text-overflow: ellipsis;
            overflow: hidden;
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px; line-height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:ValueButton">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>

    <xsl:text>_ValueButton</xsl:text>

    <xsl:value-of select="position()"/>
    <xsl:text> {
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:ActionButton">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_ActionButton</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:ActionImage">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_ActionImage</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:LayoutSelector">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_LayoutSelector</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="kb:IME">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_IME</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
            top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;
            width:</xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px; height:</xsl:text>
    <xsl:value-of select="@height"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex"><xsl:with-param name="zIndex" select="@zIndex" /></xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template name="zIndex">
    <xsl:param name="zIndex"></xsl:param>
    <xsl:if test="$zIndex">
      <xsl:text> z-index:</xsl:text>
      <xsl:value-of select="$zIndex" />
      <xsl:text>;</xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template name="textAlign">
    <xsl:param name="textAlign"></xsl:param>
    <xsl:if test="$textAlign">
      <xsl:text>text-align:</xsl:text>
      <xsl:value-of select="$textAlign"/>
      <xsl:text>;
      </xsl:text>
    </xsl:if>
  </xsl:template>

  <xsl:template name="multiLine">
    <xsl:param name="multiLine"></xsl:param>
    <xsl:choose>
      <xsl:when test="$multiLine='true'">
            <xsl:text>white-space: normal;</xsl:text>
      </xsl:when>
      <xsl:otherwise>
            <xsl:text>text-overflow: ellipsis;
            white-space: nowrap;</xsl:text>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

</xsl:stylesheet>
