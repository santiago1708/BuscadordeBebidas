import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { DrinkRecipe } from '../types';
export default function Modal() {
    const modal = useAppStore(state => state.modal)
    const closeModal = useAppStore(state => state.closeModal)
    const drinkRecipe = useAppStore((state) => state.drinkRecipe)

    const renderIngredients = () => {
        const ingredients : JSX.Element[] = []
        for(let i = 1; i <= 6; i++) {
            const ingredien = drinkRecipe[`strIngredient${i}` as keyof DrinkRecipe]
            const measure = drinkRecipe[`strMeasure${i}` as keyof DrinkRecipe]


            if(ingredien && measure) {
                ingredients.push(
                    <li 
                        key={i} 
                        className='text-lg font-normal'
                    >
                        {ingredien} - {measure}
                    </li>
                )
            }
        }
        
        return ingredients
    }

    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                                    <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                                        {drinkRecipe.strDrink}
                                    </Dialog.Title>

                                    <img 
                                        src={drinkRecipe.strDrinkThumb} 
                                        alt={`Imagen de ${drinkRecipe.strDrink}`} 
                                        className='mx-auto w-96'
                                        />
                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Ingredientes y Cantidades
                                    </Dialog.Title>
                                        {renderIngredients()}
                                    <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                                        Instrucciones
                                        <p className='text-lg'>{drinkRecipe.strInstructions}</p>
                                        <div className='mt-5'>
                                            <button
                                                type='button'
                                                className='w-full rounded-lg bg-gray-600 p-3 uppercase font-bold shadow text-white hover:bg-gray-700'
                                            >Cerrar</button>
                                            <button
                                                type='button'
                                                className='w-full rounded-lg bg-gray-600 p-3 uppercase font-bold shadow text-white hover:bg-gray-700'
                                            >Agregar a Favoritos</button>
                                        </div>
                                    </Dialog.Title>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}