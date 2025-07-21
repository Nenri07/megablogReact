import React, { useId } from 'react'

function Select({
  options,
 label,
 className="",
 ref,
 ...props
 

}) {
  const Id= useId();
  return (
    <div className='w-full'>
      {label && <label htmlFor={Id} className='text-sm font-medium text-gray-700'>{label}</label>}
      <select  
      id={Id} 
      ref={ref}
      {...props}
      className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option)=>(
          <option key={option}  value={option}>
            {option}
          </option>
        ))}

      </select>
    </div>
  )
}

export default Select