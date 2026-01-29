import Card from "../shared/Card"

const Friends = () => {
  return (
    <div className="
      grid 
      sm:grid-cols-1 
      lg:grid-cols-2 
      xl:grid-cols-3 
      gap-5
    ">
      {
        Array(20).fill(0).map((item, index)=>(
          <Card key={index}>
            <div className="
              group
              flex flex-col items-center
              py-7
              gap-3
              rounded-xl
              border border-transparent
              transition-all duration-200
              hover:border-gray-200
              hover:bg-gray-50/70
            ">

              <img 
                src="/images/myimage.jpeg"
                className="
                  w-20 h-20 
                  rounded-full 
                  object-cover
                  ring-2 ring-gray-100
                  transition
                  group-hover:ring-gray-200
                "
              />

              <h1 className="
                text-gray-800 
                font-semibold 
                text-base
              ">
                Santosh Kumar
              </h1>

              <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Online
              </div>

              <button className="
                mt-2
                px-4 py-1.5
                text-sm
                font-semibold
                rounded-lg
                bg-gray-100
                text-gray-700
                hover:bg-rose-500
                hover:text-white
                transition
              ">
                <i className="ri-user-minus-line mr-1"></i>
                Unfriend
              </button>

            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Friends