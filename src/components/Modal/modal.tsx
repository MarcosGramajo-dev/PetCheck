import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Close from '../../images/icons/close.svg'

import Login from './login'
import NewSell from './newSell'
import { useLoginState } from '../Context/Context'
interface IProps {
  modalType: string,
}

export default function Modal(props: IProps) {

  const cancelButtonRef = useRef(null)

  const login = useLoginState()

  return (
    <Transition.Root show={login?.authContext.showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={ () => login?.authContext.toggleOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >

              <Dialog.Panel className="w-full py-5 px-3 relative transform overflow-hidden rounded-lg border-vet-purple-light border-4 bg-white text-left shadow-xl transition-all sm:my-8 max-sm:w-full sm:max-w-lg">
                <div onClick={() => login?.authContext.toggleOpen()} className="cursor-pointer absolute right-[-0.5rem] top-[-0.5rem] w-10 h-10 p-2 rounded-full bg-vet-purple-light"> <img src={Close} alt="#" /> </div>
                {props.modalType === "login" ? <Login /> : null}
                {props.modalType === "newSell" ? <NewSell/> : null}

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

{/* <Dialog.Panel className="w-full py-5 px-3 relative transform overflow-hidden rounded-lg border-vet-purple-light border-4 bg-white text-left shadow-xl transition-all sm:my-8 max-sm:w-full sm:max-w-lg">
<div onClick={() => login?.authContext.toggleOpen()} className="cursor-pointer absolute right-[-0.5rem] top-[-0.5rem] w-10 h-10 p-2 rounded-full bg-vet-purple-light"> <img src={Close} alt="#" /> </div>
{props.modalType === "login" ? <Login toggleOpen={props.toggleOpen} toggleLogin={props.toggleLogin} /> : null}
{props.modalType === "newSell" ? <NewSell toggleOpen={props.toggleOpen}/> : null}

</Dialog.Panel> */}