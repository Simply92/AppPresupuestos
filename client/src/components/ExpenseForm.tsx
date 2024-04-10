
const ExpenseForm = () => {
    return (
        <form className="space-y-5">
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
                Nuevo gasto
            </legend>

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
                    name="expenseName" />
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
                    name="amount" />
            </div>

        </form>
    )
}

export default ExpenseForm
