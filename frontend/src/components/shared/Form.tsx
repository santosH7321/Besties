import type { FC, FormEvent, ReactNode } from "react"

type DataType = Record<string, string>
interface FormInterface {
    children: ReactNode
    className: string
    onValue: (value: DataType)=>void
}


const Form: FC<FormInterface> = ({children, className, onValue}) => {
    const handelForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget;
        const formData = new FormData(form)
        const data: DataType = {}
        formData.forEach((value, name) => {
            data[name] = value.toString()
        })
        onValue(data)
    }
    return (
        <form className={className} onSubmit={handelForm}>
            {children}
        </form>
    )
}   

export default Form