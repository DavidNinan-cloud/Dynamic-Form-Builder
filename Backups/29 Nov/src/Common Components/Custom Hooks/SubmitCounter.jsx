import React, { useEffect, useRef } from 'react';


    export const incrementCounter = (increment) => {
        
        const firstClick = useRef(true);
        if(!increment){
            firstClick.current = true
            console.log('firstClick reset')
        }else if(firstClick.current){
            console.log('firstClick true')
            firstClick.current = false;
            return true
        }else{
            console.log('firstClick false')
            return false
        }

    }
    