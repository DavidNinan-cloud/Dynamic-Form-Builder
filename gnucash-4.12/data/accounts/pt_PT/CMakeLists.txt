set(account_DATA
  acctchrt_brokerage.gnucash-xea
  acctchrt_business.gnucash-xea
  acctchrt_carloan.gnucash-xea
  acctchrt_cdmoneymkt.gnucash-xea
  acctchrt_checkbook.gnucash-xea
  acctchrt_childcare.gnucash-xea
  acctchrt_common.gnucash-xea
  acctchrt_eduloan.gnucash-xea
  acctchrt_fixedassets.gnucash-xea
  acctchrt_homeloan.gnucash-xea
  acctchrt_homeown.gnucash-xea
  acctchrt_otherloan.gnucash-xea
  acctchrt_renter.gnucash-xea
  acctchrt_retiremt.gnucash-xea
  acctchrt_spouseinc.gnucash-xea
  acctchrt_spouseretire.gnucash-xea)

set_dist_list(PT_PT_DIST ${account_DATA} CMakeLists.txt)

install(FILES ${account_DATA} DESTINATION ${ACCOUNTS_INSTALL_DIR}/pt_PT)

foreach(acct_file ${account_DATA})
    configure_file(${acct_file} ${ACCOUNTS_BUILD_DIR}/pt_PT/${acct_file} COPYONLY)
endforeach()
