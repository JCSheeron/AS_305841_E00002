/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function (require, exports, module) {
    'use strict';

    var oop = require('../lib/oop');
    var TextHighlightRules = require('./text_highlight_rules').TextHighlightRules;

    var GcodeHighlightRules = function () {
    
        var axisNames = '(X|Y|Z|A|B|C|Q0|Q1|Q2|Q3|Q4|Q5|Q6)';
        var dynamicArgsPrio = '(I1|J1|K1)';
        var dynamicArgs = '(MaxNonCartesianTransitionAngle|I\\s*=\\s*IC|CONNECTION_LINE|G161\\s*I1\\s*=|Y|ALL|J1\\s*=|DIMENSIONY|PHI|CS|POINT|ROLL|ORIENT=|I1\\s*=|Z|K1\\s*=\\s*AC|P\\s*=|MaxCartesianTransitionAngle|X|G161\\s*J|NEG|J\\s*=\\s*IC|G162\\s*I|CHR|NOT_USED|CHF|ZY|DIMENSIONZ|K\\s*=\\s*IC|LP|ACC|CW|HEIGHT|I1\\s*=\\s*AC|YZ|ID|SIG|ZX|RPL|DIMENSIONX|THETA|R=|XZ|R|K1\\s*=|PSI|J1\\s*=\\s*AC|TOP_RADIUS|YX|G161\\s*K1\\s*=|Angle1|M|J1\\s*=\\s*IC|RP|Position|G162\\s*J|K|SF\\s*=|DISTANCE|H|K1\\s*=\\s*IC|LS|YAW|P|STOP|G162\\s*J1\\s*=|POS|Q\\s*=|Angle2|XY|K\\s*=\\s*AC|Radius|J\\s*=\\s*AC|G162\\s*K1\\s*=|PITCH|S|G161\\s*J1\\s*=|I\\s*=\\s*AC|OFF|Length|Q|Angle3|MaxCartesianLength|J|G161\\s*K|PLANE=|ON|I1\\s*=\\s*IC|MaxCartesianDeviation|G162\\s*I1\\s*=|R\\s*=|G161\\s*I|BASE_RADIUS|MaxNonCartesianDeviation|I|G162\\s*K|CCW)';
        var technologyParameters = '(F|D|S)';
        var floatingPoint = '((?:[-+]?[0-9]*\\.?[0-9]+\\.?)(?:EX[-+]?\\d+)?)';           
        var gCodeAlias = '(\\b(FLIN|POS|SAFE_HALFSPACE_REMOVE|AROT|WORK_HALFSPACE_REMOVE|RND|SAFE_CUBOID_REMOVE|ROT|SAFE_CUBOID|CONDITIONAL_STOP|WORK_CUBOID|WORK_HALFSPACE|$TIME|SELF_COLLISION|WIRE_FRAME_MODEL|SAFE_TRUNCATED_CONE_REMOVE|MIRROR|SET_TOOL_PAR|MPLOG_INTERRUPT|SCALE|SPEED|RELEASE|COMPRESSOR_ON|WORK_TRUNCATED_CONE_REMOVE|$WFRAME_TCP|VEL|CHR|FNORM|SAFE_TRUNCATED_CONE|MPLOG_CONTINUE|FEED|WORK_TRUNCATED_CONE|GEOMETRIC_COMPENSATION_OFF|SAFE_HALFSPACE|ASCALE|GEOMETRIC_COMPENSATION_ON|RNDM|CDC_LOOKAHEAD|WORK_CUBOID_REMOVE|ATRANS|CHF|AMIRROR|TRANS|COMPRESSOR_OFF)\\b)';
        var gCode = '(G[0-9]+\\.?[0-9]?)';
        var gCodes = '(' + gCode + '|' + gCodeAlias + ')';
        var mFunction = '(([M])([0-9]+\\.?[0-9]?))';
        var operators1 = '(\\b(MOD|XOR)\\b)';
        var operators2 = '\\+|=|\\-|&|\\*|\\!|\\<|\\>|\\||,|\\^|@';
        var keywordControl = '(\\$(IF|ELSEIF|ENDIF|ELSE|CASE|DEFAULT|SWITCH|ENDSWITCH|FOR|ENDFOR|WHILE|ENDWHILE|ENDWHILE|DO|ENDDO|BREAK|CONTINUE|GOTO)\\b)';
        var keywords = '((L|LL[0-9]+|DEF|\\~DEF|LOCAL|IP_GLOBAL|NC_GLOBAL|PLC_GLOBAL|RETAIN|IP_SYNCH|PATH_SYNCH|FUB|ERROR_LEVEL_[1-4]|(?:NON_)?BLOCKING|REF(:?ERENCE)?|TO|ACCESS|AS|DEFINE|UNDEFINE)\\b)';
        var datatypes = '(\\b(BOOL|SINT|USINT|INT|UINT|DINT|UDINT|REAL|LREAL|STRING|BYTE|WORD|DWORD|WSTRING|DATE_AND_TIME|DATE|TIME_OF_DAY|TIME|FRAME)\\b)';
        var datatypesCS = '(\\b(McOrientType|McPointType|McLatchPositionsType|McFrameType|McToolType|McAxisTargetType|McMonitoredHalfSpaceType|McMonitoredTruncatedConeType|McMonitoredCuboidType|McJointAxisType|McSlaveAxisType|McPosType)\\b)';
        var constants = '\\b(MC_NAME_P6|MC_NAME_TCP_D|MC_NAME_TCP_RZ|MC_NAME_G4|MC_EULER_ZYX_ANGLES|MC_NAME_Y1|MC_NAME_TCP_A6|MC_NAME_TCP_U4|MC_NAME_QP1|MC_NAME_MON_POINT_12|MC_NAME_TCP_P1|MC_NAME_A6|MC_NAME_O5|MC_NAME_B1|MC_NAME_RTCP|MC_NAME_Q3Actuator|MC_NAME_N1|MC_NAME_FRAME_AB|MC_NAME_TCP_A|MC_NAME_TCP_I6|MC_NAME_F2|MC_SCS3|MC_PLANE_YZ|MC_NAME_J|MC_NAME_TCP_U6|MC_NAME_TCP_RX|MC_EULER_XZY_ANGLES|MC_Y|MC_NAME_G2|MC_Z|MC_ALIGNED_TO_NEXT_MOVEMENT|MC_NAME_L6|MC_NAME_RTCP1|MC_NAME_S6|MC_NAME_PQ1|MC_NAME_TCP_X1|MC_NAME_FRAME_BC|MC_NAME_U2|MC_TOOL_PAR_POSITION|MC_NAME_I2|MC_NAME_S5|MC_NAME_X|MC_NAME_MON_POINT_4|MC_NAME_TCP_M2|MC_NAME_TCP_Y3|MC_NAME_D1|MC_NAME_TOOL_POINT_16|MC_NAME_TCP_P3|MC_NAME_TCP_N2|MC_NAME_TCP_E6|MC_NAME_TCP_T2|MC_NAME_S4|MC_NAME_TCP_W|MC_NAME_B5|MC_NAME_TCP_Z3|MC_NAME_TCP_M1|MC_NAME_TCP_S5|MC_NAME_MON_POINT_14|MC_NAME_D3|MC_NAME_TCP_Q1|MC_NAME_TCP_L6|MC_NAME_C3|MC_NAME_TCP_F2|MC_NAME_MON_POINT_8|MC_SCS1|MC_NAME_MON_POINT_10|MC_NAME_T4|MC_NAME_TCP_G|MC_MIRROR|MC_NAME_TCP_Y6|MC_NAME_TCP_S6|MC_NAME_TCP_D2|MC_NAME_TCP_V6|MC_NAME_J2|MC_NAME_TCP_H1|MC_NAME_B2|MC_NAME_FRAME_CB|MC_NAME_TCP_J4|MC_AROT|MC_NEGATIVE_ANGLES|MC_NAME_TCP_V3|MC_NAME_Z5|MC_NAME_TCP_Z5|MC_NAME_TCP_G4|MC_NAME_T2|MC_STOP|MC_NAME_L|MC_NAME_TCP_Y5|MC_NAME_TCP_W5|MC_NAME_D5|MC_NAME_TCP_V2|MC_EULER_XYX_ANGLES|MC_NAME_Y5|MC_NAME_TCP_K6|MC_NAME_F|MC_ID_MAX_TANGENTIAL_TRANSITION_DEVIATION|MC_NAME_DIRECTION_X|MC_NAME_TCP_ALPHA|MC_NAME_I6|MC_AMIRROR|MC_CARDAN_ZXY_ANGLES|MC_ROT|MC_NAME_CDC_ANGLE|MC_NAME_TCP_R2|MC_NAME_E1|MC_CW|MC_SCS2|MC_NAME_L4|MC_NAME_Q1|MC_NAME_TCP_D5|MC_NAME_TOOL_POINT_10|MC_NAME_R6|MC_NAME_TCP_B2|MC_NAME_FLANGE|MC_NAME_Y3|MC_NAME_E4|MC_NAME_C1|MC_NAME_TCP_N|MC_NAME_H2|MC_NAME_TCP_K1|MC_NAME_TCP_J2|MC_NAME_H1|MC_NAME_TCP_F6|MC_NAME_TCP_I4|MC_NAME_G|MC_NAME_J6|MC_NAME_TCP_E2|MC_NAME_RTCP2|MC_NAME_B6|MC_NAME_TCP_N5|MC_NAME_R3|MC_NAME_MON_POINT_13|MC_NAME_I5|MC_NAME_TCP_P2|MC_NAME_TCP_Z|MC_EULER_ZXZ_ANGLES|MC_NAME_Z2|MC_NAME_MON_POINT_1|MC_NAUTICAL_ANGLES|MC_NAME_MON_POINT_3|MC_DEFAULT_ANGLES|MC_NAME_TCP_E3|MC_ORIENT_0|MC_NAME_TCP_Q3|MC_NAME_MON_POINT_11|MC_ID_MAX_CORNER_DEVIATION|MC_NAME_X5|MC_NAME_TCP_P4|MC_NAME_V4|MC_NAME_F1|MC_NAME_R2|MC_NAME_E6|MC_NAME_L5|MC_NAME_TOOL_POINT_13|MC_NAME_F3|MC_NAME_TCP_Z1|MC_NAME_E3|MC_NAME_A2|MC_NAME_Q4|MC_TOOL_PAR_Z|MC_NAME_TCP_I3|MC_NAME_TCP_T5|MC_NAME_Q|MC_NAME_TCP_M6|MC_NAME_Y6|MC_NAME_TOOL_POINT_6|MC_NAME_TCP_C3|MC_NAME_TCP_M5|MC_NAME_TOOL_POINT_8|MC_CARDAN_XYZ_ANGLES|MC_NAME_W6|MC_NAME_TCP_O5|MC_NAME_TCP_I2|MC_NAME_TCP_B4|MC_NAME_K4|MC_NAME_N4|MC_NAME_TCP_K5|MC_NAME_TCP_Q6|MC_NAME_TCP_A4|MC_NAME_G6|MC_NAME_TOOL_POINT_3|MC_NAME_I|MC_NAME_MON_POINT_16|MC_NAME_N6|MC_NAME_R4|MC_NAME_TCP_K3|MC_NAME_TCP_P5|MC_NAME_TCP_QZ|MC_NAME_TCP_S3|MC_NAME_TCP_A2|MC_NAME_O4|MC_NAME_TCP_O1|MC_NAME_TCP_T6|MC_NAME_Q3|MC_NAME_A|MC_NAME_TOOL_POINT_7|MC_NAME_T6|MC_NAME_L3|MC_NAME_TCP_X3|MC_NAME_TCP_J3|MC_NAME_C|MC_NAME_P5|MC_NAME_TCP_H2|MC_NAME_P|MC_TOOL_PAR_X|MC_NAME_TCP_QY|MC_NAME_W2|MC_NAME_M2|MC_NAME_TCP_QW|MC_NAME_TCP_M3|MC_NAME_F4|MC_EULER_XYZ_ANGLES|MC_NAME_TCP_F4|MC_X|MC_NAME_TCP_PSI|MC_NAME_A1|MC_NAME_FRAME_CA|MC_NAME_E2|MC_EULER_YXY_ANGLES|MC_NAME_TCP_O3|MC_NAME_M1|MC_TAIT_BRYAN_ANGLES|MC_NAME_TCP_F1|MC_NAME_TCP_G2|MC_EULER_ZYZ_ANGLES|MC_NAME_D4|MC_NAME_W|MC_NAME_E5|MC_NAME_V1|MC_NAME_TOOL_POINT_15|MC_NAME_F6|MC_NAME_O3|MC_ALIGNED_TO_PATH|MC_NAME_TCP_B5|MC_EULER_YXZ_ANGLES|MC_NAME_D|MC_NAME_S|MC_NAME_TCP_E1|MC_NAME_M6|MC_NAME_V3|MC_TRANS|MC_ASCALE|MC_NAME_TCP_U2|MC_NAME_TOOL_POINT_4|MC_NAME_TCP_J|MC_NAME_TCP_W6|MC_EULER_YZY_ANGLES|MC_NAME_DIRECTION_Y|MC_NAME_O1|MC_NAME_W3|MC_NAME_TCP_Q5|MC_NAME_TCP_U1|MC_NAME_TCP_X|MC_NAME_T5|MC_NAME_TCP_H5|MC_NAME_V6|MC_NAME_TCP_X5|MC_NAME_TAPER|MC_NAME_L1|MC_NAME_J3|MC_NAME_TCP_C4|MC_NAME_TCP_C1|MC_NAME_MON_POINT_15|MC_NAME_TCP_G1|MC_NAME_TCP_H6|MC_SCALE|MC_NAME_H4|MC_NAME_TCP_V4|MC_NAME_TCP_Z2|MC_NAME_TCP_J5|MC_NAME_S2|MC_EULER_ZXY_ANGLES|MC_NAME_TCP_O|MC_NAME_TCP_W1|MC_NAME_H6|MC_NAME_TCP|MC_NAME_TCP_V|MC_NAME_TCP_RY|MC_NAME_P3|MC_FRM_0|MC_NAME_X2|MC_NAME_K5|MC_NAME_N2|MC_NAME_LEAD|MC_NAME_MON_POINT_6|MC_NAME_TOOL_POINT_12|MC_NAME_Y|MC_NAME_TCP_C2|MC_NAME_W1|MC_NAME_TCP_R|MC_NAME_TCP_H|MC_NAME_TCP_Q4|MC_NAME_TOOL_POINT_9|MC_NAME_R5|MC_NAME_Z6|MC_NAME_TCP_T|MC_NAME_B4|MC_NAME_TCP_B3|MC_NAME_B0|MC_NAME_TOOL_POINT_1|MC_TOOL_PAR_RADIUS|MC_NAME_TCP_S1|MC_EDGE_POINT|MC_NAME_Q6|MC_NAME_T3|MC_NAME_TCP_Z6|MC_NAME_TCP_S2|MC_NAME_X6|MC_NAME_M|MC_NAME_K2|MC_NAME_V5|MC_NAME_TCP_W2|MC_NAME_Q2|MC_NAME_J5|MC_NAME_TCP_T3|MC_NAME_TCP_X6|MC_NAME_TCP_E|MC_NAME_TCP_C5|MC_NAME_TCP_C|MC_NAME_TCP_L3|MC_NAME_TCP_D4|MC_NAME_TCP_D6|MC_NAME_S3|MC_NAME_R1|MC_NAME_TCP_THETA|MC_NAME_Q5|MC_NAME_C2|MC_NAME_TCP_G5|MC_NAME_TCP_R5|MC_TOOL_PAR_Y|MC_NAME_G3|MC_NAME_TOOL_POINT_2|MC_NAME_TCP_F|MC_NAME_TCP_J1|MC_NAME_TCP_A3|MC_NAME_TCP_V1|MC_JACS|MC_NAME_TCP_R4|MC_EULER_XZX_ANGLES|MC_NAME_TCP_R3|MC_NAME_F5|MC_NAME_L2|MC_NAME_Y4|MC_EDGE_NOT_USED|MC_NAME_T|MC_NAME_C4|MC_NAME_TCP_Y2|MC_NAME_U6|MC_NAME_TCP_P6|MC_CCW|MC_NAME_TCP_A5|MC_NAME_O2|MC_NAME_A0|MC_ATRANS|MC_NAME_TCP_G6|MC_NAME_I3|MC_NAME_O6|MC_NAME_TCP_D3|MC_TOOL_PAR_ANGLE2|MC_NAME_U4|MC_CARDAN_ANGLES|MC_NAME_TCP_S|MC_NAME_TCP_L4|MC_NAME_K|MC_NAME_TCP_L2|MC_NAME_Q2Anchor|MC_NAME_TCP_M4|MC_NAME_H3|MC_NAME_TCP_N3|MC_NAME_M5|MC_NAME_TCP_I|MC_SCS4|MC_POINT_0|MC_NAME_J1|MC_NAME_TCP_K4|MC_NAME_B3|MC_NAME_TANG_AXIS|MC_NAME_A5|MC_TOOL_PAR_ANGLE1|MC_NAME_TCP_C6|MC_NAME_TCP_U5|MC_NAME_TCP_PHI|MC_CARDAN_YXZ_ANGLES|MC_NAME_V|MC_NAME_K1|MC_NAME_R|MC_NAME_Q2Actuator|MC_NAME_TCP_X4|MC_NAME_TCP_N4|MC_NAME_TCP_P|MC_NAME_TCP_Y1|MC_REF_0|MC_NAME_MON_POINT_5|MC_NAME_A3|MC_NAME_Z|MC_NAME_TCP_K|MC_NAME_K3|MC_CARDAN_ZYX_ANGLES|MC_NAME_E|MC_NAME_Y2|MC_NAME_TCP_M|MC_NAME_W5|MC_DIRECT_ANGLES|MC_NAME_W4|MC_PLANE_ZX|MC_SCS5|MC_NAME_TOOL_POINT_14|MC_NAME_TCP_G3|MC_NAME_TCP_B1|MC_NAME_TCP_R1|MC_NAME_H|MC_NAME_Q3Anchor|MC_NAME_TCP_T4|MC_NAME_TCP_I5|MC_NAME_TCP_I1|MC_NAME_TCP_Z4|MC_NAME_TCP_L|MC_NAME_V2|MC_EULER_ANGLES|MC_NAME_D6|MC_NAME_TCP_O4|MC_NAME_MON_POINT_7|MC_NAME_J4|MC_INDIRECT_ANGLES|MC_NAME_N3|MC_EDGE_CONNECTION_LINE|MC_NAME_Z1|MC_NAME_TCP_R6|MC_NAME_D2|MC_NAME_TCP_O2|MC_NAME_X4|MC_NAME_TCP_D1|MC_CARDAN_XZY_ANGLES|MC_NAME_TCP_QX|MC_NAME_TCP_E5|MC_NAME_Z4|MC_NAME_I4|MC_NAME_TCP_Y4|MC_NAME_TCP_W4|MC_NAME_K6|MC_ACS|MC_NAME_O|MC_MCS|MC_NAME_I1|MC_NAME_TCP_W3|MC_EULER_YZX_ANGLES|MC_NAME_G1|MC_NAME_U3|MC_NAME_TCP_V5|MC_PLANE_XY|MC_NAME_Z3|MC_NAME_TCP_N1|MC_NAME_TCP_U|MC_NAME_TCP_B6|MC_NAME_A4|MC_NAME_FRAME_BA|MC_NAME_TOOL_POINT_11|MC_NAME_P4|MC_CARDAN_YZX_ANGLES|MC_NAME_TCP_L1|MC_NAME_MON_POINT_9|MC_NAME_TCP_S4|MC_TOOL_PAR_ANGLE3|MC_NAME_TCP_X2|MC_NAME_U5|MC_NAME_TCP_J6|MC_PCS|MC_NAME_TCP_K2|MC_NAME_H5|MC_NAME_N5|MC_NAME_U|MC_NAME_TCP_Q2|MC_NAME_TCP_H3|MC_NAME_M4|MC_NAME_TCP_Y|MC_TOOL_PAR_LENGTH|MC_NAME_M3|MC_NAME_C6|MC_NAME_TCP_B|MC_NAME_B|MC_NAME_TCP_T1|MC_NAME_TCP_H4|MC_NAME_TOOL_POINT_5|MC_NAME_X1|MC_NAME_P2|MC_NAME_TCP_U3|MC_NAME_TCP_Q|MC_NAME_C5|MC_NAME_U1|MC_NAME_TCP_O6|MC_NAME_MON_POINT_2|MC_NAME_TCP_F5|MC_NAME_TCP_E4|MC_NAME_TCP_L5|MC_NAME_MP|MC_NAME_X3|MC_NAME_S1|MC_NAME_N|MC_NAME_TCP_A1|MC_NAME_G5|MC_POSITIVE_ANGLES|MC_NAME_TCP_N6|MC_NAME_T1|MC_NAME_DIRECTION_Z|MC_NAME_TCP_F3|MC_NAME_FRAME_AC|MC_NAME_P1)\\b';
        var procedures = '\\b(FAPPLY|FRESET|MPLOG_WRITE|WFRAME_ADD|WAIT_UNTIL|FTRANS|FEULER|WFRAME_TCP|WAIT_UNTIL_SYNC|SET_FRAME_INDEX|FROTX|WFRAME|FROTY|WAIT_UNTIL_FLUSH|SET_FRAME|ADD_FRAME|FROTZ|SET_PCS|FTRANSZ|SET_FRAME_PROPERTY|FTRANSY|FRPY|FTRANSX)\\b';
        var functions = '\\b(MEM_SIZE_IP_LIB|NUM_LOADED_PROG_FILES|SIZEOF|ROUND|SQR|BOUND|TAN|MAXVAL|SIN|FUP|FIX|SQRT|ADR|LN|NUM_LOADED_FILES|MEM_SIZE_IP_STACK_SPACE|EXP|MEM_SIZE_SHLIB|MINVAL|ABS|LOG|ACOS|DEXP|MEM_SIZE_IP_ALL|FRACT|ATAN2|MEM_SIZE_FILE|INV|BOOL|ATAN|ASIN|COS|INT)\\b';
        var sysvars = '(\\$(FRAME_I|RAD|WFRAME|WFRAME_ADD)\\b)';
        var pvMacros = '(\\b(ACC|RDISABLE|SBLOF|SBLON|AILON)\\b)';
        
        var inGcode = false;
        
        var OnGCodeEntry = function () {
            var args = arguments;
            inGcode = true;
            return this.token;
        };  
        
        var OnGCodeExit = function () {
            var args = arguments;
            inGcode = false;
            return this.token;
        };  
        
        var OnDynamicArg = function () {
            var args = arguments;
            if (inGcode) {
                return this.token;
            } else {
                return 'text';
            }
        };  
            
        var OnDynamicArgWithParam = function () {
            var args = arguments;
            if (inGcode) {
                return ['variable.parameter', 'keyword.operator', 'constant.numeric'];
            } else if (arguments[1] == '') {
                return ['text', 'keyword.operator', 'text'];
            } else {
                return ['text', 'keyword.operator', 'constant.numeric'];
            }
        }; 
              
        this.$rules = {
            'start': [ {
                // two-level deep nested comment
                token: 'comment',
                regex: '\\(',
                push: 
                        [ 
                            { token: 'comment', regex: '\\)', next: 'pop' },
                            { token: 'comment', regex: '$', next: 'pop', onMatch: OnGCodeExit },
                            { token: 'comment',
regex: '\\(',
                                push: 
                            [ 
                                { token: 'comment', regex: '\\)', next: 'pop' },
                                { token: 'comment', regex: '$', next: 'pop', onMatch: OnGCodeExit },                          
                                { defaultToken: 'comment' } 
                            ]
                            },
                            { defaultToken: 'comment' } 
                        ]
            }, { 
                // line continuation
                caseInsensitive: true,
                token: 'comment',
                regex: '(\\\\.*)'
            }, {
                // block number
                caseInsensitive: true,
                token: 'comment',
                regex: '([N])([0-9]+)'
            }, {
                // G-code
                caseInsensitive: true,
                token: 'support.function',
                regex: gCodes,
                onMatch: OnGCodeEntry
            }, {
                // M-code
                caseInsensitive: true,
                token: 'support.function',
                regex: mFunction
            }, {
                // floating point literal
                caseInsensitive: true,
                token: 'constant.numeric',
                regex: floatingPoint
            }, {
                // technology parameters followed by constant with optional '='
                caseInsensitive: true, 
                token: function (first, second, third) {
                    inGcode = false;
                    return ['support.function', 'keyword.operator', 'constant.numeric'];
                },
                regex: technologyParameters + '(\\s*=?\\s*)' + floatingPoint
            }, {
                // technology parameters with boundary
                caseInsensitive: true,
                token: 'support.function',
                regex: '\\b' + technologyParameters + '\\b',
                onMatch: OnGCodeExit
            }, {                
                // axis names followed by constant with optional '='
                caseInsensitive: true,
                token: ['variable.parameter', 'keyword.operator', 'constant.numeric'], 
                regex: axisNames + '(\\s*=?\\s*)' + floatingPoint
            }, {
                // axis names with boundary
                caseInsensitive: true,
                token: 'variable.parameter',   
                regex: '\\b' + axisNames + '\\b'
            }, {
                // priority dynamic arguments followed by constant with optional '='
                caseInsensitive: true,
                token: OnDynamicArgWithParam, 
                regex: dynamicArgsPrio + '(\\s*=?\\s*)' + floatingPoint
            }, {
                // priority dynamic arguments with boundary
                caseInsensitive: true,
                token: 'variable.parameter',   
                regex: '\\b' + dynamicArgsPrio + '\\b',
                onMatch: OnDynamicArg
            }, {
                // dynamic arguments followed by constant with optional '='
                caseInsensitive: true,
                token: OnDynamicArgWithParam, 
                regex: dynamicArgs + '(\\s*=?\\s*)' + floatingPoint
            }, {
                // dynamic arguments with boundary
                caseInsensitive: true,
                token: 'variable.parameter',   
                regex: '\\b' + dynamicArgs + '\\b',
                onMatch: OnDynamicArg
            }, {
                // general keywords
                caseInsensitive: true,
                token: 'keyword.other',
                regex: keywords, 
                onMatch: OnGCodeExit
            }, {
                // control block keywords
                caseInsensitive: true,
                token: 'keyword.control',
                regex: keywordControl, 
                onMatch: OnGCodeExit
            }, {
                // operators with boundary
                caseInsensitive: true,
                token: 'keyword.operator',
                regex: operators1
            }, {
                // operators
                caseInsensitive: true,
                token: 'keyword.operator',
                regex: operators2
            }, {
                // data types
                caseInsensitive: true,
                token: 'support.type',
                regex: datatypes
            }, {
                // data types - case sensitive
                token: 'support.type',
                regex: datatypesCS
            }, {
                // constants
                caseInsensitive: true,
                token: 'support.constant',
                regex: constants
            }, {
                // system variables
                caseInsensitive: true,
                token: 'support.variable',
                regex: sysvars
            }, {
                // procedures
                caseInsensitive: true,
                token: 'support.function',
                regex: procedures, 
                onMatch: OnGCodeExit
            }, {
                // PV Macros
                caseInsensitive: true,
                token: 'support.function',
                regex: pvMacros, 
                onMatch: OnGCodeExit
            }, {
                // functions
                caseInsensitive: true,
                token: 'support.function',
                regex: functions, 
                onMatch: OnGCodeExit
            }, {
                // parenthesis
                token: 'paren',
                regex: '\\[|{'
            }, {
                // parenthesis
                token: 'paren',
                regex: '\\]|}'
            }, { 
                // string
                token: 'string.start',
                regex: '"',
                push: 
                    [ 
                        { token: 'string.end',
                            regex: '"',
                            next: 'pop' },
                        { defaultToken: 'string' } 
                    ]
            }, {
                // identifier, plain text
                token: 'text',
                regex: '\\w+'
            }, { 
                // end of line
                token: 'text',
                regex: '$',
                onMatch: OnGCodeExit
            }
            ]
        };        
        this.normalizeRules();
    };

    oop.inherits(GcodeHighlightRules, TextHighlightRules);

    exports.GcodeHighlightRules = GcodeHighlightRules;
});
