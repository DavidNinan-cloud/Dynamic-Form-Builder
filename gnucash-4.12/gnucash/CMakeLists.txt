# CMakeLists.txt for gnucash/

# Preparations for macro add_gschema_targets and gschemas.compiled target
set(SCHEMADIR_BUILD ${DATADIR_BUILD}/glib-2.0/schemas)
file(MAKE_DIRECTORY ${SCHEMADIR_BUILD})
unset(gschema_depends CACHE)
unset(gschema_preftrans_files CACHE)
# The subdirectories
add_subdirectory (gnome)
add_subdirectory (gnome-utils)
add_subdirectory (gnome-search)
add_subdirectory (gtkbuilder)
add_subdirectory (html)
add_subdirectory (import-export)
add_subdirectory (python)
add_subdirectory (register)
add_subdirectory (report)
add_subdirectory (ui)
# gschemas directory goes last to ensure all schema files are installed
# before glib-compile-schemas is called
add_subdirectory (gschemas)

add_definitions (-DHAVE_CONFIG_H)

# Some settings are platform dependent. Let's define them per platform.
if (WIN32)
    # Windows specific settings go here:
    set (GNUCASH_RESOURCE_FILE ${CMAKE_CURRENT_BINARY_DIR}/gnucash.rc)
    configure_file(gnucash.rc.in gnucash.rc @ONLY NEWLINE_STYLE WIN32)

else()
  # All other platforms use these settings:
  set (PLATFORM_FILES gnucash-valgrind)

endif()

set(gnucash_noinst_HEADERS
    gnucash-commands.hpp
    gnucash-core-app.hpp
    gnucash-locale-platform.h
)

set (gnucash_SOURCES
  gnucash.cpp
  gnucash-commands.cpp
  gnucash-core-app.cpp
  gnucash-gresources.c
  ${GNUCASH_RESOURCE_FILE}
  )

if (MINGW)
  list(APPEND gnucash_SOURCES "gnucash-locale-windows.c")
elseif (MAC_INTEGRATION)
    list(APPEND gnucash_SOURCES "gnucash-locale-macos.mm")
endif()

add_executable (gnucash
    ${gnucash_SOURCES}
    ${gnucash_noinst_HEADERS}
)

target_compile_definitions(gnucash PRIVATE -DG_LOG_DOMAIN=\"gnc.bin\")

target_link_libraries (gnucash
   gnc-ledger-core gnc-gnome gnc-gnome-utils gnc-app-utils
   gnc-engine gnc-module gnc-core-utils gnucash-guile
   gnc-qif-import gnc-csv-import gnc-csv-export gnc-log-replay
   gnc-bi-import gnc-customer-import gnc-report
   PkgConfig::GTK3 ${GUILE_LDFLAGS} ${GLIB2_LDFLAGS}
   ${Boost_LIBRARIES}
)

set(gnucash_cli_SOURCES
    gnucash-cli.cpp
    gnucash-commands.cpp
    gnucash-core-app.cpp
    )

if (MINGW)
  list(APPEND gnucash_cli_SOURCES "gnucash-locale-windows.c")
elseif (MAC_INTEGRATION)
    list(APPEND gnucash_cli_SOURCES "gnucash-locale-macos.mm")
endif()

add_executable (gnucash-cli
    ${gnucash_cli_SOURCES}
    ${GNUCASH_RESOURCE_FILE}
    ${gnucash_noinst_HEADERS}
)

if (MINGW)
    target_link_options(gnucash-cli PRIVATE -mconsole)
endif()

add_dependencies (gnucash-cli gnucash)

target_compile_definitions(gnucash-cli PRIVATE -DG_LOG_DOMAIN=\"gnc.bin\")

target_link_libraries (gnucash-cli
   gnc-gnome-utils gnc-app-utils
   gnc-engine gnc-core-utils gnucash-guile gnc-report
   ${GUILE_LDFLAGS} ${GLIB2_LDFLAGS}
   ${Boost_LIBRARIES}
)

if (BUILDING_FROM_VCS)
    target_compile_definitions(gnucash PRIVATE -DGNC_VCS=\"git\")
    target_compile_definitions(gnucash-cli PRIVATE -DGNC_VCS=\"git\")
    target_compile_definitions(gnc-gnome-utils PRIVATE -DGNC_VCS=\"git\")
endif()

# Get glib executable for generating the gresource file
execute_process(
   COMMAND
       ${PKG_CONFIG_EXECUTABLE} gio-2.0 --variable glib_compile_resources
   OUTPUT_VARIABLE
       GLIB_COMPILE_RESOURCES_NAME
   OUTPUT_STRIP_TRAILING_WHITESPACE
)

find_program(GLIB_COMPILE_RESOURCES_EXECUTABLE ${GLIB_COMPILE_RESOURCES_NAME})

# Get the dependencies of the gresource

execute_process(
  OUTPUT_VARIABLE
      gr_files
  COMMAND "${GLIB_COMPILE_RESOURCES_EXECUTABLE}"
     --sourcedir=${CMAKE_CURRENT_SOURCE_DIR}
     --generate-dependencies
     ${CMAKE_CURRENT_SOURCE_DIR}/gnucash-gresources.xml
)

string (REPLACE "\n" ";" gresource_files ${gr_files})

add_custom_command(
   OUTPUT gnucash-gresources.c
   COMMAND
    "${GLIB_COMPILE_RESOURCES_EXECUTABLE}"
    --target=gnucash-gresources.c
    --sourcedir=${CMAKE_CURRENT_SOURCE_DIR}
    --generate-source
    ${CMAKE_CURRENT_SOURCE_DIR}/gnucash-gresources.xml
   DEPENDS
    ${CMAKE_CURRENT_SOURCE_DIR}/gnucash-gresources.xml ${gresource_files}
   WORKING_DIRECTORY
    ${CMAKE_CURRENT_BINARY_DIR}
)

if (MAC_INTEGRATION)
  target_compile_options(gnucash PRIVATE ${OSX_EXTRA_COMPILE_FLAGS})
  target_link_libraries(gnucash ${OSX_EXTRA_LIBRARIES})
  target_compile_options(gnucash-cli PRIVATE ${OSX_EXTRA_COMPILE_FLAGS})
  target_link_libraries(gnucash-cli ${OSX_EXTRA_LIBRARIES})
endif()

install(TARGETS gnucash gnucash-cli DESTINATION ${CMAKE_INSTALL_BINDIR})
# No headers to install.


set(TOP_SRC_DIR ${CMAKE_SOURCE_DIR})
set(GNUCASH_BIN_INSTALL_NAME "gnucash")

set(VALGRIND_OUTDIR ${BINDIR_BUILD})

configure_file(gnucash-valgrind.in ${CMAKE_CURRENT_BINARY_DIR}${CMAKE_FILES_DIRECTORY}/gnucash-valgrind @ONLY)

file(COPY ${CMAKE_CURRENT_BINARY_DIR}${CMAKE_FILES_DIRECTORY}/gnucash-valgrind
          DESTINATION ${VALGRIND_OUTDIR}
          FILE_PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE
)

## Create the environment file

file(STRINGS ${CMAKE_CURRENT_SOURCE_DIR}/environment.in ENV_STRINGS_IN)

set(ENV_STRINGS_LIST "")

foreach(line ${ENV_STRINGS_IN})
  string(REPLACE ";" "\;" line2 "${line}")
  if(NOT "${line2}" MATCHES "@NOTE")
    list(APPEND ENV_STRINGS_LIST "${line2}\n")
  endif()
endforeach()

string(CONCAT ENV_STRINGS ${ENV_STRINGS_LIST})
string(CONFIGURE "${ENV_STRINGS}" ENV_STRINGS_CONF @ONLY)

set(ENV_FILE_OUT ${CMAKE_CURRENT_BINARY_DIR}${CMAKE_FILES_DIRECTORY}/environment)
set(BUILD_ENV_FILE_OUT ${CMAKE_CURRENT_BINARY_DIR}${CMAKE_FILES_DIRECTORY}/environment.build)

file(WRITE ${ENV_FILE_OUT} "${ENV_STRINGS_CONF}")
file(WRITE ${BUILD_ENV_FILE_OUT} "${ENV_STRINGS_CONF}")

set(XDG_TEXT "
# GnuCash was not installed in the default location.
# XDG_DATA_DIRS will be set so that our documentation
# and gsettings schema are found.\n"
)

if (NOT(${CMAKE_INSTALL_FULL_DATADIR} STREQUAL "/usr/share") AND NOT(${CMAKE_INSTALL_FULL_DATADIR} STREQUAL "/usr/local/share"))
  file(APPEND ${ENV_FILE_OUT} ${XDG_TEXT})
  file(APPEND ${ENV_FILE_OUT} "XDG_DATA_DIRS={GNC_HOME}/share;{XDG_DATA_DIRS};" "${GNC_SYSTEM_XDG_DATA_DIRS}\n")
endif()
file(APPEND ${BUILD_ENV_FILE_OUT} ${XDG_TEXT})
file(APPEND ${BUILD_ENV_FILE_OUT} "XDG_DATA_DIRS=${DATADIR_BUILD};{XDG_DATA_DIRS};" "${GNC_SYSTEM_XDG_DATA_DIRS}\n")

if (LIBDBI_LIBRARY AND LIBDBI_DRIVERS_DIR)
  get_filename_component(libdir ${LIBDBI_LIBRARY} DIRECTORY)
  string(FIND ${LIBDBI_DRIVERS_DIR} ${libdir} is_subdir)
  if (NOT is_subdir EQUAL 0)
    file(APPEND ${BUILD_ENV_FILE_OUT} "GNC_DBD_DIR=${LIBDBI_DRIVERS_DIR}\n")
  endif()
endif()

if (WITH_PYTHON)
  set(PYTHON_TEXT "
# Define PYTHONPATH for non default installation path.\n"
 )
  if (NOT(${CMAKE_INSTALL_PREFIX} STREQUAL "/usr") AND NOT(${CMAKE_INSTALL_PREFIX} STREQUAL "/usr/local"))

    file(APPEND ${ENV_FILE_OUT} ${PYTHON_TEXT})
    file(APPEND ${ENV_FILE_OUT} "PYTHONPATH=${PYTHON_SYSCONFIG_OUTPUT};{PYTHONPATH}\n")
  endif()

  file(APPEND ${BUILD_ENV_FILE_OUT} ${PYTHON_TEXT})
  file(APPEND ${BUILD_ENV_FILE_OUT} "PYTHONPATH=${PYTHON_SYSCONFIG_BUILD};{PYTHONPATH}\n")
endif()

if (MAC_INTEGRATION)
  file(APPEND ${ENV_FILE_OUT} "GTK_EXE_PREFIX={GNC_HOME}\n")
  file(APPEND ${ENV_FILE_OUT} "GIO_MODULE_DIR={SYS_LIB}/gio/modules\n")
  file(APPEND ${ENV_FILE_OUT} "XDG_CONFIG_HOME={HOME}/Library/Application Support/${PACKAGE_NAME}/config\n")
  file(APPEND ${ENV_FILE_OUT} "GDK_PIXBUF_MODULE_FILE={SYS_LIB}/gdk-pixbuf-2.0/2.10.0/loaders.cache\n")
  file(APPEND ${ENV_FILE_OUT} "FONTCONFIG_PATH={GNC_HOME}/etc/fonts\n")
  file(APPEND ${ENV_FILE_OUT} "OFX_DTD_PATH={GNC_HOME}/share/libofx/dtd\n")
  file(APPEND ${ENV_FILE_OUT} "GNC_DBD_DIR={SYS_LIB}/dbd\n")
  file(APPEND ${ENV_FILE_OUT} "GTK_IM_MODULE_FILE={GNC_HOME}/lib/gtk-3.0/3.0.0/immodules.cache\n")
endif()

file(COPY ${BUILD_ENV_FILE_OUT}
  DESTINATION ${SYSCONFDIR_BUILD}/gnucash
  FILE_PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE
)
file(RENAME
  ${SYSCONFDIR_BUILD}/gnucash/environment.build
  ${SYSCONFDIR_BUILD}/gnucash/environment
)

set(ENVIRONMENT_FILE_DIR ${CMAKE_CURRENT_BINARY_DIR})
file(COPY ${ENV_FILE_OUT}
  DESTINATION ${ENVIRONMENT_FILE_DIR}
  FILE_PERMISSIONS OWNER_READ OWNER_WRITE OWNER_EXECUTE GROUP_READ GROUP_EXECUTE WORLD_READ WORLD_EXECUTE
)

install(FILES ${SCRIPT_LIST} ${VALGRIND_OUTDIR}/gnucash-valgrind DESTINATION ${CMAKE_INSTALL_BINDIR})
install(FILES ${ENVIRONMENT_FILE_DIR}/environment DESTINATION
  ${CMAKE_INSTALL_FULL_SYSCONFDIR}/gnucash)


# The GResource Files are absolute paths but set_local_dist requires
# relative paths.
foreach(gres_file ${gresource_files})
  file(RELATIVE_PATH rel_file ${CMAKE_CURRENT_SOURCE_DIR} ${gres_file})
  list(REMOVE_ITEM gresource_files ${gres_file})
  list(APPEND gresource_files ${rel_file})
endforeach()


gnc_add_scheme_targets(price-quotes
    SOURCES price-quotes.scm
    OUTPUT_DIR gnucash
    DEPENDS "scm-engine;scm-app-utils;scm-gnome-utils")

set_local_dist(gnucash_DIST_local CMakeLists.txt environment.in generate-gnc-script
    gnucash.cpp gnucash-commands.cpp gnucash-cli.cpp gnucash-core-app.cpp
    gnucash-locale-macos.mm gnucash-locale-windows.c gnucash.rc.in gnucash-valgrind.in
    gnucash-gresources.xml ${gresource_files} price-quotes.scm
    ${gnucash_noinst_HEADERS} ${gnucash_EXTRA_DIST})

set (gnucash_DIST ${gnucash_DIST_local} ${gnome_DIST} ${gnome_search_DIST} ${gnome_utils_DIST}
    ${gschemas_DIST} ${gtkbuilder_DIST} ${html_DIST} ${import_export_DIST} ${python_DIST} ${register_DIST}
    ${report_DIST} ${overrides_DIST} ${test_bin_DIST} ${ui_DIST} PARENT_SCOPE)
