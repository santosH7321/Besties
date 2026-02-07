import type { FC } from "react"


interface ErrorInterface {
  message: string
}

const Error: FC<ErrorInterface> = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full py-6">
      <div className="flex items-start gap-4 max-w-md w-full rounded-xl border border-red-200 bg-red-50 px-6 py-4 shadow-sm">
        

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
          <i className="ri-error-warning-line text-xl"></i>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-red-700">
            Something went wrong
          </h3>
          <p className="mt-1 text-sm text-red-600">
            {message}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Error
