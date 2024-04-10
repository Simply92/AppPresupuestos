import formatCurrency from "../helpers"

type AmountDisplayProps = {
  label: string,
  amount: number
}

const AmountDisplay = ({amount, label} : AmountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label}: {''}
      <span className="font-back text-black">{formatCurrency(amount)}</span>
    </p>
  )
}

export default AmountDisplay
