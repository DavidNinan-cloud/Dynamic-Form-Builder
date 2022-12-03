import {configureStore} from '@reduxjs/toolkit'

import authReducer from './authentication/slices/auth'

import messageReducer from './authentication/slices/message'

const reducer={
    auth:authReducer,
    message:messageReducer
}

const store=configureStore({
    reducer:reducer,
    devTools:true
})

export default store