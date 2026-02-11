import type { FC } from 'react'
import Card from '../../shared/Card'
import SmallButton from '../../shared/SmallButton'
import IconButton from '../../shared/IconButton'
import { Link } from 'react-router-dom'

interface FriendsListInterface {
  gap?: number
  columns?: number
}

const FriendList: FC<FriendsListInterface> = ({gap=8, columns=3}) => {
  return (
    <div className={`grid grid-cols-${columns} gap-${gap}`}>
      {
        Array(12).fill(0).map((item, index)=>(
          <Card>
              <div className='flex flex-col items-center gap-3'>
                <img src="/images/myimage.jpeg" className='rounded-full object-cover w-20 h-20' />
                <h1>Santosh Kumar</h1>
                <div className='relative'>
                  <SmallButton type="danger" icon="user-minus-line">Unfollow</SmallButton>
                  <div className='w-2 h-2 bg-green-400 rounded-full absolute -top-1 -right-1 animate__animated animate__pulse animate__infinite'/>
                </div>
                <div className='flex gap-3 mt-3'>
                  <Link to="/app/chat">
                    <IconButton icon='chat-ai-line' type="warning" />
                  </Link>
                  <Link to="/app/audio-chat">
                    <IconButton icon='phone-line' type="success" />
                  </Link>
                  <Link to="/app/video-chat">
                    <IconButton icon='video-on-ai-line' type="danger" />
                  </Link>
                </div>
              </div>
              
          </Card>
        ))
      }
    </div>
  )
}

export default FriendList