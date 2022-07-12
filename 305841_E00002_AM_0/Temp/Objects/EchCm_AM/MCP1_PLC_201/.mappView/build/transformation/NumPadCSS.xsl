<?xml version="1.0" encoding="utf-8"?>
<!--
// COPYRIGHT B&R
// Transformation of NumPad XML to widget SCSS
-->

<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:numpad="http://www.br-automation.com/iat2019/numpadDefinition/v1"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      exclude-result-prefixes="xsi">

  <xsl:output method="text" encoding="UTF-8" indent="yes" />

  <xsl:param name="cssClassName"></xsl:param>
  <xsl:param name="widgetName"></xsl:param>

  <xsl:template match="/">
    <xsl:apply-templates select="numpad:NumPad"/>
  </xsl:template>

  <xsl:template match="numpad:NumPad">
    <!-- import is working, because sass compiler in AS gets a list of includePaths, one of them is BRVisu/css/libs -->
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
        &amp;.active {
          background-color:#FFA800;
        }
        
        position:absolute;
        @include displayFlexBox(false);
        @include flex-direction(row);
        white-space: nowrap;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        @include appearance(none);
        -webkit-tap-highlight-color: initial;
        outline: none;
        span {
            display:inline-block;
            width:100%;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            pointer-events: none;
            box-sizing: border-box;
            margin: 0; padding:0 6px;
            @include flex(0 1 auto);
            @include align-self(center);
        }
      }
      .ActionImage {
        position:absolute;
        background-size:cover;
      }
      .maxValue {
        text-align: right;
      }
      .breaseNumpadNumericValue {
        border-color: #333;
        border-style: solid;
        border-width: 1px;
      }
      .unitInfo {
        position:absolute;
        overflow: hidden;
        display:block;
        box-sizing: border-box;
      }
</xsl:text>
    <xsl:apply-templates select="numpad:Header" mode="class"/>
    <xsl:text>
}
    </xsl:text>
    <xsl:apply-templates select="numpad:Header" mode="elements"/>
    <xsl:apply-templates select="numpad:Section"/>
    <xsl:apply-templates select="numpad:Label"/>
    <xsl:apply-templates select="numpad:NodeInfo"/>
    <xsl:apply-templates select="numpad:UnitInfo"/>
    <xsl:apply-templates select="numpad:Value"/>
    <xsl:apply-templates select="numpad:Slider"/>
    <xsl:apply-templates select="numpad:ValueButton"/>
    <xsl:apply-templates select="numpad:ActionButton"/>
    <xsl:apply-templates select="numpad:ActionImage"/>
  </xsl:template>

  <xsl:template match="numpad:Header" mode="class">
    <xsl:text>header.breaseNumpadHeader {
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
        <xsl:text>height: 33px;</xsl:text>
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

  <xsl:template match="numpad:Header" mode="elements">
    <xsl:apply-templates select="numpad:Label">
      <xsl:with-param name="prefix" select="'H'"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:NodeInfo">
      <xsl:with-param name="prefix" select="'H'"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:UnitInfo">
      <xsl:with-param name="prefix" select="'H'"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="numpad:Section">
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:text>_S</xsl:text>
    <xsl:value-of select="position()"/>
    <xsl:text> {
  position:absolute;
  top:</xsl:text>
    <xsl:value-of select="@top"/>
    <xsl:text>px; left:</xsl:text>
    <xsl:value-of select="@left"/>
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
    <xsl:apply-templates select="numpad:Label">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:NodeInfo">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:UnitInfo">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:Value">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:Slider">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:ValueButton">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:ActionButton">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
    <xsl:apply-templates select="numpad:ActionImage">
      <xsl:with-param name="prefix" select="position()"/>
    </xsl:apply-templates>
  </xsl:template>

  <xsl:template match="numpad:Label">
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
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            overflow: hidden;
            display:block;
    </xsl:text>
    <xsl:call-template name="textAlign">
      <xsl:with-param name="textAlign" select="@textAlign" />
    </xsl:call-template>
    <xsl:call-template name="multiLine">
      <xsl:with-param name="multiLine" select="@multiLine" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="numpad:NodeInfo">
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
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            overflow: hidden;
            display:block;
    </xsl:text>
    <xsl:call-template name="textAlign">
      <xsl:with-param name="textAlign" select="@textAlign" />
    </xsl:call-template>
    <xsl:call-template name="multiLine">
      <xsl:with-param name="multiLine" select="@multiLine" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="numpad:UnitInfo">
    <xsl:param name="prefix"></xsl:param>
    <xsl:text>#</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_UnitInfo</xsl:text>
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
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:call-template name="textAlign">
      <xsl:with-param name="textAlign" select="@textAlign" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="numpad:ValueButton">
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
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="numpad:ActionButton">
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
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="numpad:ActionImage">
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
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="numpad:Value">
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
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            }
    </xsl:text>
  </xsl:template>

  <xsl:template match="numpad:Slider">
    <xsl:param name="prefix"></xsl:param>
    <!-- import is working, because sass compiler in AS gets a list of includePaths, one of them is BRVisu/css/libs -->
    <xsl:text>@import '../../system/widgets/NumPad/libs/NumPadSlider.scss';
  #</xsl:text>
    <xsl:value-of select="$widgetName"/>
    <xsl:if test="$prefix">
      <xsl:text>_S</xsl:text>
      <xsl:value-of select="$prefix"/>
    </xsl:if>
    <xsl:text>_Slider</xsl:text>
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
    <xsl:text>px;</xsl:text>
    <xsl:call-template name="zIndex">
      <xsl:with-param name="zIndex" select="@zIndex" />
    </xsl:call-template>
    <xsl:text>
            .numpadSlider_track {
                width: </xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px;
    .numpadSlider_track_inner {
                width: </xsl:text>
    <xsl:value-of select="@width"/>
    <xsl:text>px;
      }
    }
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
