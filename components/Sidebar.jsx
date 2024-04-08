import React from 'react'
import { Button } from './ui/button'

const Sidebar = () => {
  return (
    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
   <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 flex flex-col">
      <ul className="space-y-4 mt-12 font-medium flex-grow">
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <img src='/home-svgrepo-com.svg' className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
               <span className="ms-3 text-lg">Home</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
            <img src='/live-svgrepo-com.svg' className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
               <span className="flex-1 ms-3 text-lg whitespace-nowrap">Live Stream</span>
            </a>
         </li>
         <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
               <img src="/about-filled-svgrepo-com.svg" className="w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
               <span className="flex-1 ms-3 text-lg whitespace-nowrap">About Team</span>            
            </a>
         </li>
         
         
            
      </ul>

      <div className='w-full mb-12 font-bold mt-auto'>
         
   <div class="flex items-center gap-4">
      <img class="w-10 h-10 rounded-full" src="https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-avatar-placeholder-abstract-white-blue-green-png-image_3918476.jpg" alt=""/>
      <div class="font-medium dark:text-white">
         <div>Samarth Mishra</div>
         <div class="text-sm text-gray-500 dark:text-gray-400">Garud Object Detection</div>
      </div>
   </div>

      </div>
   </div>
</aside>
  )
}

export default Sidebar