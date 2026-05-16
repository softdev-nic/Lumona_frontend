import React from 'react'
import { useState } from 'react';

function PopUp({ message,  type = 'success' }) {
    const [isOpen, setIsOpen] = useState('flex');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm " style={{display:isOpen}}>
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4 transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col items-center text-center gap-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {type === 'error' ? '✕' : '✓'}
          </div>
          <p className="text-gray-800 font-medium text-lg">{message}</p>
          <div className="flex">
            <button 
            onClick={(e)=>{setIsOpen('none')}}
            className="w-10 py-2 bg-blue-600 hover:bg-blue-700 text-white  font-semibold transition-colors">
            Ok
          </button>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default PopUp