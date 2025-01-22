import img1 from '../../assets/Services/recruitment.jpg'
import img2 from '../../assets/Services/interviewing.jpeg'
import img3 from '../../assets/Services/R.jpeg'
const Services = () => {
    return (
        <div className="mt-20">
            <h1 className="text-3xl font-bold text-center my-10">We Can Do More Than Just HR</h1>
            <div className="flex gap-4 justify-around">
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            className='h-52 w-full object-cover'
                            src={img1}
                            alt="recruitment" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Recruitment</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>

                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            className='h-52 w-full object-cover'
                            src={img2}
                            alt="interview" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Interviewing</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>

                    </div>
                </div>
                <div className="card card-compact bg-base-100 w-96 shadow-xl">
                    <figure>
                        <img
                            className='h-52 w-full object-cover'
                            src={img3}
                            alt="interview" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Personal Development</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Services;