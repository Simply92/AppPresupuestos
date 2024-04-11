import { PropsWithChildren} from "react"

const ErrorMessage = ({children} : PropsWithChildren) => {
  return (
    <p className="bg-red-600 text-white font-bold text-sm text-center">
        {children}
    </p>
  )
}

export default ErrorMessage
