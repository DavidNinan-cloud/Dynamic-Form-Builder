set(account_DATA
  acctchrt_brokerage.gnucash-xea
  acctchrt_business.gnucash-xea
  acctchrt_carloan.gnucash-xea
  acctchrt_cdmoneymkt.gnucash-xea
  acctchrt_childcare.gnucash-xea
  acctchrt_common.gnucash-xea
  acctchrt_currency.gnucash-xea
  acctchrt_eduloan.gnucash-xea
  acctchrt_fixedassets.gnucash-xea
  acctchrt_homeloan.gnucash-xea
  acctchrt_homeown.gnucash-xea
  acctchrt_otherloan.gnucash-xea
  acctchrt_pme-19.gnucash-xea  
  acctchrt_renter.gnucash-xea
  acctchrt_retiremt.gnucash-xea
  acctchrt_spouseinc.gnucash-xea
  acctchrt_spouseretire.gnucash-xea)

set_dist_list(FR_CH_DIST ${account_DATA} CMakeLists.txt)

install(FILES ${account_DATA} DESTINATION ${ACCOUNTS_INSTALL_DIR}/fr_CH)

foreach(acct_file ${account_DATA})
    configure_file(${acct_file} ${ACCOUNTS_BUILD_DIR}/fr_CH/${acct_file} COPYONLY)
endforeach()
