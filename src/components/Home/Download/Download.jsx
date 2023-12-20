import { FaGooglePlay, FaApple } from 'react-icons/fa';
import image from '../../../assets/download.png';
const Download = () => (
    <div className='w-full mx-auto mb-5'>
        <div className='bg-[#f1c40f]'>
            <div className='bg-[#f1c40f] w-11/12 py-5 mx-auto md:flex lg:flex items-center gap-5 justify-center'>
                <div className='text-white md:w-1/2'>
                    <div className='flex items-center gap-4 my-4'>
                        <div className='h-1 w-7 bg-red-400'></div>
                        <h1 className='text-lg text-black uppercase font-bold'>Mobile Application</h1>
                    </div>
                    <div className='space-y-5'>
                        <h1 className='lg:text-6xl text-3xl text-black md:text-4xl font-bold'>Download  Our <br />Application</h1>
                        <p className="text-gray-700">Quaerat debitis, vel, sapiente dicta sequi
                            labore porro pariatur harum expedita.
                        </p>
                        <div className='flex items-center gap-5 pb-4'>
                            <button className='btn bg-[#a4850a] lg:px-8'>
                                <FaGooglePlay className='text-white'></FaGooglePlay>
                                <h1 className="text-white">Play Store</h1>
                            </button>
                            <button className='btn bg-[#a4850a] lg:px-8'>
                                <FaApple className='text-white'></FaApple>
                                <h1 className="text-white">Apple Store</h1>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-1/2  hidden md:block lg:block flex-1'>
                    <img className='' src={image} alt="" />
                </div>
            </div>
        </div>
    </div>
);

export default Download;