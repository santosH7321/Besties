import { useRazorpay } from "react-razorpay";
import type {RazorpayOrderOptions} from "react-razorpay"
import Button from './shared/Button';
import CatchError from '../lib/CatchError';
import HttpInterceptor from '../lib/HttpInterceptor';
const env = import.meta.env

const Home = () => {
  const { Razorpay } = useRazorpay()

  const pay = async ()=>{
    try {
      const {data} = await HttpInterceptor.post("/payment/order", {amount: 500})
      const options: RazorpayOrderOptions = {
        key: env.VITE_RAZORPAY_KEY_ID,
        name: 'Coding Courses',
        description: 'React course',
        image: 'https://www.pexels.com/photo/santosh7321-17771457/',
        amount: data.amount,
        currency: env.VITE_CURRENCY,
        order_id: data.id,
        handler: (data)=>{
          console.log(data)
        }
      }

      const rzp = new Razorpay(options)
      rzp.open()

      rzp.on("payment.failed", ()=>{
        console.log("Payment failed")
      })
    }
    catch(err)
    {
      CatchError(err)
    }
  }

  return (
    <div>
      <Button onClick={pay}>Pay now</Button>
    </div>
  )
}

export default Home