import React from 'react'

export default function ViewAllButton({onClick}) {
  return (
    <div>
         <button
    type="button"
    className="h-10 px-3 border border-customOrange text-customOrange rounded text-base font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
    onClick={onClick}
  >
    View All
  </button></div>
  )
}