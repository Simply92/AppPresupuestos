import { useReducer, createContext, Dispatch, ReactNode } from "react"
import { BudgetActions, budgetReducer, budgetState, initialState } from "../reducers/budgetReducer"

type BudgetContextProps = {
    state: budgetState
    dispatch: Dispatch<BudgetActions>
}

type BudgetProviderProps = {
    children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children} : BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState)

    return(
       <BudgetContext.Provider
            value={{
            state,
            dispatch
       }}>
           {children}
       </BudgetContext.Provider>
    )
}