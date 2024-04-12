import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
import Swal from "sweetalert2";

const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })
    const [error, setError] = useState('')
    const [previousAmount, setPreviousAmount] = useState(0)
    const { dispatch, state, remainingBudget } = useBudget()

    useEffect(() => {
        if (state.editId) {
            const editExpense = state.expenses.filter(current => current.id === state.editId)[0]
            setExpense(editExpense)
            setPreviousAmount(editExpense.amount)
        }
    }, [state.editId])

    const handleChage = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        const isAmountField = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }
        if ((expense.amount - previousAmount) > remainingBudget) {
            setError('Este gasto supera el presupuesto')
            return
        }

        if (state.editId) {
            Swal.fire({
                title: "¿Seguro que deseas modificar este gasto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Modificar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Modificado",
                        text: "Su gasto fue modificado",
                        icon: "success"
                    });
                    dispatch({ type: 'update-expense', payload: { expense: { id: state.editId, ...expense } } })
                }
            });
        } else {
            Swal.fire({
                title: "¿Deseas seguir cargando gastos?",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
                cancelButtonText: "No"
            }).then((result2) => {
                if (result2.isConfirmed) {
                    dispatch({ type: 'add-expense', payload: { expense, modal: true } })
                    setExpense({
                        amount: 0,
                        expenseName: '',
                        category: '',
                        date: new Date()
                    })
                } else {
                    dispatch({ type: 'add-expense', payload: { expense, modal: false } })
                }
                Swal.fire({
                    title: "Gasto cargado",
                    text: "Su gasto fue cargado exitosamente",
                    icon: "success"
                });
            })
        }
        setPreviousAmount(0)
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                {state.editId ? 'Guardar cambios' : 'Nuevo gasto'}
            </legend>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl">
                    Nombre gasto:
                </label>
                <input type="text"
                    id="expenseName"
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChage} />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl">
                    Cantidad:
                </label>
                <input type="number"
                    id="amount"
                    placeholder="Añade las cantidad del gasto ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={handleChage} />
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl">
                    Categoria:
                </label>
                <select
                    name="category"
                    id="category"
                    className="bg-slate-100 p-2"
                    value={expense.category}
                    onChange={handleChage}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-2">
                <label
                    htmlFor="date"
                    className="text-xl">
                    Fecha gasto:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0"
                    value={expense.date}
                    onChange={handleChangeDate} />
            </div>
            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
                value={state.editId ? 'Guardar cambios' : 'Registrar gasto'}
            />
        </form>
    )
}

export default ExpenseForm
