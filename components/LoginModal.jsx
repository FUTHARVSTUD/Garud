import { useLoginModalState } from '@/store/store'
import React from 'react'

const LoginModal = () => {
    const setIsOpen = useLoginModalState((state) => state.updateOpen)
  return (
    <div className="z-[999] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-3xl w-full text-center font-semibold text-gray-900 dark:text-white">
                    Login  
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={
                () => setIsOpen(false)
            }>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                Google sign in goes here then redirect them to "/dashboard"
            </div>
        </div>
    </div>
    <div className='bg-[#000000b8] -z-10 absolute inset-0 w-screen min-h-screen' >
    </div>
</div>
  )
}

export default LoginModal