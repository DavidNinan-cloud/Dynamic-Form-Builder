import React from 'react'
import OldOPDBill from './OldOPDBill'


export default function OPDBIll({ drawerOpen }) {
    return (
        <>
            <OldOPDBill drawerOpen={drawerOpen}/>
            {/* <NewOPDBill drawerOpen={drawerOpen}/> */}
        </>
    )
}
