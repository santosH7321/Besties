import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Card from '../../shared/Card';
import SmallButton from '../../shared/SmallButton';

const FriendSuggestion = ()=>{
  return (
    <Card title="Suggestions" divider>
      <div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            }
          }}
        >
          {
            Array(5).fill(0).map((item, index)=>(
              <SwiperSlide key={index}>
                  <div className='flex flex-col items-center gap-2 border border-gray-100 p-3 rounded-lg'>
                    <img src="/images/myimage.jpeg" className='w-20 h-20 rounded-full object-cover' />
                    <h1 className='text-base font-medium text-black'>Santosh Kumar</h1>
                    <SmallButton type='success' icon="user-add-line">Add</SmallButton>
                  </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </Card>
  );
}

export default FriendSuggestion