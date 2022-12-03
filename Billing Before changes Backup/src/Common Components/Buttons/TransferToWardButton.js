import React from 'react'

function TransferToWardButton({onClick}) {
  return (
    <div>
    <button
      type="button"
      className="h-10 px-3  bg-customBlue  text-white rounded text-sm font-medium"
      onClick={onClick}
    >
    Transfer To Ward
    </button>
  </div>
  )
}

export default TransferToWardButton