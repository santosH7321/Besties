import Button from '../shared/Button'
import Card from '../shared/Card'

const Audio = () => {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">

        <Card title="Santosh Kumar">
          <div className="flex flex-col items-center py-4 space-y-4">
            <div className="
              relative
              w-40 h-40
              rounded-full
              p-0.75
              bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500
            ">
              <img
                src="/images/myimage.jpeg"
                alt="avt"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Speaking
            </div>

          </div>
        </Card>


        <Card title="Santosh Kumar">
          <div className="flex flex-col items-center py-4 space-y-4">

            <div className="
              w-40 h-40
              rounded-full
              overflow-hidden
              shadow-lg
            ">
              <img
                src="/images/myimage.jpeg"
                alt="image"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <p className="text-gray-400 text-sm">
              Listening...
            </p>

          </div>
        </Card>

      </div>

      <div className="
        flex items-center justify-between
        bg-white
        rounded-2xl
        px-6 py-4
        shadow-lg
      ">

        <div className="flex items-center gap-4">
          <button className="
            w-14 h-14
            rounded-full
            bg-amber-500
            hover:bg-amber-400
            text-white
            flex items-center justify-center
            shadow-md
            hover:scale-105
            transition
          ">
            <i className="ri-mic-line text-xl"></i>
          </button>

          <span className="text-gray-500 text-sm">
            Mic is on
          </span>

        </div>

        <Button icon="close-circle-fill" type="danger">
          End Room
        </Button>

      </div>
    </div>
  )
}

export default Audio