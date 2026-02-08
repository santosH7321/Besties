import useSWR, { mutate } from 'swr'
import Card from '../shared/Card'
import Fetcher from '../../lib/Fetcher'
import { Skeleton } from 'antd'
import Error from '../shared/Error'
import CatchError from '../../lib/CatchError'
import HttpInterceptor from '../../lib/HttpInterceptor'
import { useState } from 'react'
import SmallButton from '../shared/SmallButton'
import moment from 'moment'
import { toast } from 'react-toastify'

const FriendSuggestion = () => {
    const [loading, setLoading] = useState({state: false, index: 0})
    const {data, error, isLoading} = useSWR("/friend/suggestion", Fetcher)

    const sendFriendRequest = async (id: string, index: number)=>{
        try {
            setLoading({state: true, index})
            await HttpInterceptor.post("/friend", {friend: id})
            toast.success("Friend request sent !", {position: "top-center"})
            mutate("/friend/suggestion")
            mutate("/friend")
        }
        catch(err)
        {
            CatchError(err)
        }
        finally {
            setLoading({state: false, index: 0})
        }
    }

    return (
        <div className="h-62.5 overflow-auto">
            <Card title="Suggested" divider>
                { isLoading && <Skeleton active /> }

                { error && <Error message={error.message} /> }

                {
                    data &&
                    <div className="space-y-8">
                        {
                            data.map((item: any, index: number)=>(
                                <div key={index} className='space-y-4'>
                                    <div className="flex gap-4 items-center">
                                        <img 
                                            src= {item.image || "/images/myimage.jpeg"}
                                            alt="jpeg" 
                                            className="w-12 h-12 rounded object-cover" 
                                        />
                                        <div>
                                            <h1 className="text-black font-medium capitalize">{item.fullname}</h1>
                                            <small className='text-gray-400'>{moment(item.createdAt).format('DD MMM, YYYY')}</small>
                                        </div>
                                        
                                    </div>
                                    
                                    <SmallButton loading={loading.state && loading.index === index} onClick={()=>sendFriendRequest(item._id, index)} type="secondary" icon='user-add-line'>Add Friend</SmallButton>
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