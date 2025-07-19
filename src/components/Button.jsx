import React from 'react'

function Button(
    {
        children,
        className='',
        bgColor='bg-black-500',
        textColor='text-white',
        type='button',
        ...props

    }
) {
  return (
   <button
   className={`px-6 py-2 rounded-full duration-200 ${bgColor} ${textColor} ${className}`}
   {...props}
   >
    {children}
   </button>
  )
}

export default Button