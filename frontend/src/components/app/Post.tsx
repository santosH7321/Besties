import Button from "../shared/Button"
import Card from "../shared/Card"
import Divider from "../shared/Divider"
import IconButton from "../shared/IconButton"

const Post = () => {
  return (
    <div className="space-y-6">
      {
        Array(20).fill(0).map((item, index)=>(
          <Card key={index}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">

                  <img 
                    src="/images/myimage.jpeg"
                    className="w-11 h-11 rounded-full object-cover"
                  />

                  <div>
                    <h1 className="font-semibold text-gray-800 text-sm">
                      Santosh Kumar
                    </h1>

                    <p className="text-xs text-gray-500">
                      Jan 2, 2030 · 7:00 PM
                    </p>
                  </div>

                </div>

                <div className="flex gap-2 opacity-70 hover:opacity-100 transition">
                  <IconButton type="info" icon="edit-line" />
                  <IconButton type="danger" icon="delete-bin-4-line" />
                </div>
              </div>

              <p className="
                text-gray-700
                leading-relaxed
                text-[15px]
              ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis accusamus autem sed quas ea unde ducimus, omnis nobis quia beatae dolorem.
              </p>

              <Divider />

              <div className="flex gap-2">

                <Button
                  icon="thumb-up-line"
                  type="info"
                >
                  20K
                </Button>

                <Button
                  icon="thumb-down-line"
                  type="warning"
                >
                  20K
                </Button>

                <Button
                  icon="chat-ai-line"
                  type="danger"
                >
                  20K
                </Button>

              </div>

            </div>
          </Card>
        ))
      }
    </div>
  )
}

export default Post