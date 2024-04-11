import { useReducer, createContext, Dispatch, ReactNode, useMemo } from "react"
import { BudgetActions, budgetReducer, budgetState, initialState } from "../reducers/budgetReducer"

type BudgetContextProps = {
    state: budgetState
    dispatch: Dispatch<BudgetActions>
    totalExp: number
    remainingBudget: number
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    const totalExp = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    const remainingBudget = state.budget - totalExp

    return (
        <BudgetContext.Provider
            value={{
                state,
                dispatch,
                totalExp,
                remainingBudget
            }}>
            {children}
        </BudgetContext.Provider>
    )
}