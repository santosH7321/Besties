import type { FC, FormEvent, ReactNode } from "react"

export type FormDataType = Record<string, string>
interface FormInterface {
    children: ReactNode
    className: string
    reset?: boolean
    onValue?: (value: FormDataType)=>void
}


const Form: FC<FormInterface> = ({children, className, reset=false, onValue}) => {
    const handelForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget;
        const formData = new FormData(form)
        const data: FormDataType = {}
        formData.forEach((value, name) => {
            data[name] = value.toString()
        })
        if(onValue) 
        {
            onValue(data);
            reset && form.reset()
        }
    }
    return (
        <form className={className} onSubmit={handelForm}>
            {children}
        </form>
    )
}   

export default Form