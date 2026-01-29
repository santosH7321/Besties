import Avatar from '../shared/Avatar'
import Input from '../shared/Input'
import Button from '../shared/Button'

const Chat = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="
        flex-1 overflow-y-auto
        space-y-6
        pr-4
        pb-6
      ">

        {Array(20).fill(0).map((_, index) => (
          <div key={index} className="space-y-6">
            <div className="flex gap-3 items-end">
              <Avatar image='/images/myimage.jpeg' size='md' />

              <div className="
                relative
                max-w-[70%]
                bg-gray-100
                px-4 py-3
                rounded-2xl rounded-bl-sm
                text-gray-700
                shadow-sm
              ">
                <h1 className="text-sm font-semibold text-gray-900 mb-1">
                  Santosh Kumar
                </h1>

                <p className="text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>

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
                <h1 className="text-sm font-semibold mb-1">
                  You
                </h1>

                <p className="text-sm leading-relaxed opacity-90">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>

              <Avatar image='/images/myimage.jpeg' size='md' />

            </div>

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

          <form className="flex gap-3 flex-1">
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
          </form>

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