<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" encoding="UTF8"/>

<xsl:template match="/">
/********************************************************************\
 * gnc-warnings.c -- overview of warning messages that can be       *
 *                  displayed to the user always or once.           *
 *                                                                  *
 * ATTENTION: this file is autogenerated based on the gsettings     *
 *    schema file org.gnucash.GnuCash.warnings.gschema.xml.in       *
 *                                                                  *
 * If you need any modifications in this file, please update the    *
 * schema source file (or the xsl translation file depending on the *
 * kind of change required) instead.                                *
 *                                                                  *
 * Copyright (C) 2013 Geert Janssens &lt;geert@kobaltwit.be&gt;     *
 *                                                                  *
 * This program is free software; you can redistribute it and/or    *
 * modify it under the terms of the GNU General Public License as   *
 * published by the Free Software Foundation; either version 2 of   *
 * the License, or (at your option) any later version.              *
 *                                                                  *
 * This program is distributed in the hope that it will be useful,  *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of   *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the    *
 * GNU General Public License for more details.                     *
 *                                                                  *
 * You should have received a copy of the GNU General Public License*
 * along with this program; if not, contact:                        *
 *                                                                  *
 * Free Software Foundation           Voice:  +1-617-542-5942       *
 * 51 Franklin Street, Fifth Floor    Fax:    +1-617-542-2652       *
 * Boston, MA  02110-1301,  USA       gnu@gnu.org                   *
 *                                                                  *
\********************************************************************/


#include &lt;gnc-warnings.h&gt;

static GncWarningSpec warning_spec [] =
{<xsl:for-each select="//schema[@id='org.gnucash.GnuCash.warnings.permanent']/key">
  { GNC_PREF_WARN_<xsl:value-of select="translate(@name,$smallcase,$uppercase)"/>,
    "<xsl:value-of select="summary"/>",
    "<xsl:value-of select="description"/>",
  },</xsl:for-each>
  { NULL }
};

const GncWarningSpec *gnc_get_warnings (void)
{
    return warning_spec;
}
</xsl:template>
<xsl:variable name="smallcase" select="'-abcdefghijklmnopqrstuvwxyz'" />
<xsl:variable name="uppercase" select="'_ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />

</xsl:stylesheet> 
