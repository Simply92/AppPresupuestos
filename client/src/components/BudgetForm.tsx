import { useState, ChangeEvent, useMemo, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

const BudgetForm = () => {

  const [budget, setBudget] = useState(0)
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const hableSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault
    dispatch({ type: 'add-budget', payload: { budget } })
  }
  return (
    <>

      <form className="space-y-5" onSubmit={hableSubmit}>
        <div className="flex flex-col space-y-5">
          <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">
            Definir Presupuesto
          </label>
          <input
            id="budget"
            type="number"
            className="w-full bg-white border border-gray-200 p-2"
            placeholder="Define tu presupuesto"
            name="budget"
            min="0"
            value={budget}
            onChange={handleChange} />
        </div>
        <input type="submit"
          value='Definir presupuesto'
          className="bg-blue-500 hover:bg-blue-600 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-10"
          disabled={isValid} />
      </form>

    </>
  )
}

export default BudgetForm
