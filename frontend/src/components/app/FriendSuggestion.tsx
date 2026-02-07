import useSWR from "swr"
import Card from "../shared/Card"
import Fetcher from "../../lib/Fetcher"
import {Skeleton} from "antd"
import Error from "../shared/Error"

const FriendSuggestion = () => {
  const {data, error, isLoading } = useSWR("/friend/suggestion", Fetcher)
  console.log(data)
  return (
    <div className="h-64 overflow-y-auto pr-2">
          <Card title="Suggested" divider>

            {isLoading && <Skeleton active />}
            {error && <Error message={error.message}/>}
            
            {
              data && 
                <div className="space-y-5">
                {
                  data.map((item: any, index: number)=>(
                    <div 
                      key={index} 
                      className="
                        flex gap-3 items-center
                        p-2 rounded-xl
                        hover:bg-gray-50
                        transition
                      "
                    >
                      <img 
                        src={item.image || "/images/myimage.jpeg"} 
                        alt="jpeg" 
                        className="w-14 h-14 rounded-xl object-cover shadow-sm"
                      />

                      <div className="flex-1">
                        <h1 className="text-gray-800 font-semibold text-sm capitalize">
                          {item.fullname}
                        </h1>

                        <button className="
                          mt-1
                          text-xs font-semibold
                          bg-green-500
                          hover:bg-green-600
                          text-white
                          px-3 py-1
                          rounded-full
                          transition
                          shadow-sm
                        ">
                          <i className="ri-user-add-line mr-1"></i>
                          Add Friend
                        </button>
                      </div>
                    </div>
                  ))
                }
                </div>
            }
            
          </Card>
        </div>
  )
}

export default FriendSuggestion