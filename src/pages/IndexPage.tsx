import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinksCard from "../components/DrinksCard"

export default function IndexPage() {

    const drinks = useAppStore((state) => state.drinks)

    const hasDrinks = useMemo(() => drinks.drinks.length > 0 ,[drinks])

    return (
        <>
        <h1 className="text-6xl font-extrabold">Recetas:  </h1>

        {hasDrinks ? (
            <div className="grid gird-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-10">
            {drinks.drinks.map((drink) => (
                <DrinksCard
                    key={drink.idDrink}
                    drink={drink}
                />
            ))}
            
            </div>
        ) : (
            <>
                <p className="my-10 text-center text-2xl">
                    No hay resultados aún, utiliza el formulario para buscar recetas
                </p>
            </>

        )}
        </>
    )
}
