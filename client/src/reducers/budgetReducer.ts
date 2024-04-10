export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' }

export type budgetState = {
    budget: number,
    modal: boolean
}

export const initialState: budgetState = {
    budget: 0,
    modal: false
}

export const budgetReducer = (state: budgetState = initialState, action: BudgetActions) => {
    if (action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget

        }
    }
    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }
    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false
        }
    }

    return state
}