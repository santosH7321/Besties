import Button from '../shared/Button'

const Video = () => {
  return (
    <div className="space-y-6">
      <div className="
        relative w-full rounded-2xl overflow-hidden
        bg-linear-to-br from-gray-900 to-black
        shadow-2xl
      ">
        <div className="pb-[56.25%]" />

        <video className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent" />
        <span className="
          absolute bottom-4 left-4
          text-xs px-3 py-1.5
          rounded-full
          backdrop-blur-md
          bg-white/10
          text-white
        ">
          Santosh Kumar
        </span>
        <button className="
          absolute bottom-4 right-4
          w-10 h-10
          flex items-center justify-center
          rounded-full
          backdrop-blur-md
          bg-white/10
          text-white
          hover:scale-110
          transition
        ">
          <i className="ri-fullscreen-line"></i>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">

        <div className="
          relative rounded-xl overflow-hidden
          bg-gray-900 shadow-lg
        ">
          <div className="pb-[56.25%]" />
          <video className="absolute inset-0 w-full h-full object-cover" />
          <span className="
            absolute bottom-2 left-2
            text-[10px] px-2 py-1
            rounded-full
            bg-black/60
            text-white
          ">
            Santosh Kumar
          </span>
        </div>

        <button className="
          flex flex-col items-center justify-center
          rounded-xl
          border-2 border-dashed border-gray-300
          hover:border-indigo-500
          hover:bg-indigo-50
          transition
          min-h-30
        ">
          <i className="ri-user-add-line text-2xl text-gray-400"></i>
          <span className="text-sm text-gray-500 mt-1">
            Add participant
          </span>
        </button>

      </div>

      <div className="
        flex items-center justify-between
        bg-white
        rounded-2xl
        px-6 py-4
        shadow-lg
      ">

        <div className="flex gap-4">

          <button className="
            w-12 h-12 rounded-full
            bg-green-500
            hover:bg-green-400
            text-white
            flex items-center justify-center
            shadow-md
            hover:scale-105
            transition
          ">
            <i className="ri-vidicon-line text-lg"></i>
          </button>

          <button className="
            w-12 h-12 rounded-full
            bg-amber-500
            hover:bg-amber-400
            text-white
            flex items-center justify-center
            shadow-md
            hover:scale-105
            transition
          ">
            <i className="ri-mic-line text-lg"></i>
          </button>

          <button className="
            w-12 h-12 rounded-full
            bg-blue-500
            hover:bg-blue-400
            text-white
            flex items-center justify-center
            shadow-md
            hover:scale-105
            transition
          ">
            <i className="ri-tv-line text-lg"></i>
          </button>

        </div>
        
        <Button icon="close-circle-fill" type="danger">
          End Call
        </Button>

      </div>
    </div>
  )
}

export default Video