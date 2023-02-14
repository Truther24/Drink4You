import React from 'react'
import '../style/LoadingSpinner.css'


export default function LoadingSpinner() {
  return (
    <div>
        <br/>
        <br/>
        <br/>
        <div  className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
