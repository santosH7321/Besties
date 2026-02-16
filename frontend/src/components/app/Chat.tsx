import Avatar from '../shared/Avatar'
import Input from '../shared/Input'
import Button from '../shared/Button'
import socket from '../../lib/Socket'
import { useContext, useEffect, useRef, useState } from 'react'
import Form from '../shared/Form'
import Context from '../../Contex'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import Fetcher from '../../lib/Fetcher'


interface MessageRecievedInterface {
  from: string;
  message: string;
}

const Chat = () => {
  const chatContainer = useRef<HTMLDivElement | null>(null);
  const [chats, setChats] = useState<any>([]);
  const {session} = useContext(Context);
  const {id} = useParams();
  const {data} = useSWR(id ? `/chat/${id}` : null, id ? Fetcher : null);
  

  const messageHandler = (messageRecieved: MessageRecievedInterface) => {
    setChats((prevChats: any) => [...prevChats, messageRecieved]);
  }

  // Listening received messages
  useEffect(() => {
      socket.on("message", messageHandler);
      return () => {
        socket.off("message", messageHandler);
      }
  }, []);

  // Fetch old chats
  useEffect(() => {
    if(data) {
      setChats(data)
    }
  }, [data])

  // Scroll to bottom when new message arrives
  useEffect(() => {
    const chatDiv = chatContainer.current;
    if(chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [chats])

  const sendMessage = (values: any) => {
    const payload = {
      from: session,
      to: id,
      message: values.message
    }
    setChats((prevChats: any) => [...prevChats, payload]);
    socket.emit("message", payload)
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="
        flex-1 overflow-y-auto
        space-y-6
        pr-4
        pb-6
      "
      ref={chatContainer} 
      >

        {chats.map((item: any, index: number) => (
          <div key={index} className="space-y-6">
            {
              (item.from.id === session.id || item.from._id === session.id) ? 
              <div className="flex gap-3 items-end">
              <Avatar 
                image={session.image || '/images/myimage.jpeg'}
                size='md' />

              <div className="
                relative
                max-w-[70%]
                bg-gray-100
                px-4 py-3
                rounded-2xl rounded-bl-sm
                text-gray-700
                shadow-sm
              ">
                <h1 className="text-sm font-semibold text-gray-900 mb-1 capitalize">
                  You
                </h1>

                <p className="text-sm leading-relaxed">
                  {item.message}
                </p>
              </div>
              </div>

              :

              <div className="flex gap-3 items-end justify-end">

              <div className="
                relative
                max-w-[70%]
                bg-indigo-600
                px-4 py-3
                rounded-2xl rounded-br-sm
                text-white
                shadow-md
              ">
                <h1 className="text-sm font-semibold mb-1 capitalize">
                  {item.from.fullname}
                </h1>

                <p className="text-sm leading-relaxed opacity-90">
                  {item.message}
                </p>
              </div>

              <Avatar
                image={item.from.image || '/images/myimage.jpeg'}
                size='md'
               />

              </div>
            }
            

        

          </div>
        ))}

      </div>

      <div className="
        sticky bottom-0
        bg-white
        pt-4
      ">
        <div className="
          flex items-center gap-3
          bg-gray-50
          border border-gray-200
          rounded-2xl
          px-3 py-2
          shadow-sm
        ">

          <Form className="flex gap-3 flex-1" onValue={sendMessage} reset={true}>
            <Input
              name="message"
              placeholder='Type a message...'
            />

            <Button
              type="secondary"
              icon="send-plane-fill"
            >
              Send
            </Button>
          </Form>

          <button className="
            w-11 h-11
            flex items-center justify-center
            rounded-xl
            bg-rose-50
            text-rose-500
            hover:bg-rose-500
            hover:text-white
            transition
          ">
            <i className="ri-attachment-2 text-lg"></i>
          </button>

        </div>
      </div>
    </div>
  )
}

export default Chat