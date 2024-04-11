import { useBudget } from "../hooks/useBudget"
import AmountDisplay from "./AmountDisplay"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const BudgetTracker = () => {

  const { state, totalExp, remainingBudget, dispatch } = useBudget()

  const percentage = +((totalExp / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: percentage > 70 && percentage < 90 ? '#FFFF00' : percentage > 90 ? '#DC2626' : '#3b82f6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: percentage > 70 && percentage < 90 ? '#FFFF00' : percentage > 90 ? '#DC2626' : '#3b82f6'
          })}
          text={`${percentage}% Gastado`} />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button type="button"
          onClick={() => dispatch({ type: 'reset-app' })}
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg">
          Resetear App
        </button>
        <AmountDisplay
          label="Presupuesto"
          amount={state.budget} />
        <AmountDisplay
          label="Disponible"
          amount={remainingBudget} />
        <AmountDisplay
          label="Gastado"
          amount={totalExp} />
      </div>
    </div>
  )
}

export default BudgetTracker
