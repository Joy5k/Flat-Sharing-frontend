
import img1 from '@/assets/svgs/SpeedFlatmating_blue.svg'
import img2 from '@/assets/images/LiveRentFree.svg'
import img3 from '@/assets/images/crisis.png'
import Image from 'next/image'

const FeaturedCart=()=>{
    return(
       <div>
        <h4 className='text-3xl text-center text-sky-700'>As featured</h4>
         <div className='flex flex-col md:flex-row lg:flex-row justify-center gap-6 my-20'>
            <div className='flex flex-col justify-center text-center border w-full md:w-[500px] lg:w-[500] items-center align-middle p-10 gap-5'>
                <Image src={img1} width={300} alt="featured image" />
                <p className='row-auto mt-8'>Find a room or meet potential flatmates face to face. Events held every week in London and Manchester.</p>
            </div>
            
            <div className='flex flex-col justify-center text-center border w-full md:w-[500px] lg:w-[500] items-center align-middle  gap-5'>
                <Image src={img3} width={300} height={10} alt="featured image" />
                <p className='row-auto'>We’re proud to partner with Crisis and support their work to end homelessness.</p>
            </div>
            <div className='flex flex-col justify-center text-center border w-full md:w-[500px] lg:w-[500] items-center align-middle p-10 gap-5'>
                <Image src={img2} width={300} alt="featured image" />
                <p className='row-auto mt-8'>Enter for the chance to win a month rent. <br /> Held every month.</p>
            </div>
        </div>
       </div>
    )
}
export default FeaturedCart;