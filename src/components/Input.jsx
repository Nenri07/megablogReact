import React, { useId } from 'react'


const Input= (function Input({
    label,
    type='text',
    className="",
    ref,
    ...props
    

}){
    const id= useId();
    return (
        <div className='w-full'>
            {label && <label
             className='inline-block mb-2 text-sm font-medium'
             htmlFor={id}
             >
                {label}
            </label>}
            <input type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            {...props}
            ref={ref}
            id={id}

            
/>
        </div>
    )
})

export default Input