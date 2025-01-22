
import missionImg from "../../assets/AboutUs/mission1.webp"
import visionImg from "../../assets/AboutUs/vision1.jpg"
import achievementImg from "../../assets/AboutUs/achievement.jpg"
const AboutUs = () => {
    return (
        <div className="mt-20">
            <h1 className="text-3xl font-bold text-center my-10"> About Us</h1>
            <div className="max-w-7xl mx-auto p-6 space-y-12 ">
                {/* Section 1 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <img
                        src={missionImg}
                        alt="Company Success"
                        className="w-full md:w-1/2 rounded-lg shadow-lg h-56 object-cover"
                    />
                    <div className="text-center md:text-left md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                        <p className="text-gray-600 leading-7">
                            At our company, we are driven by the mission to deliver exceptional solutions. Our team is passionate about
                            innovation and committed to empowering businesses with cutting-edge technology tailored to your goals.
                        </p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                    <img
                        src={visionImg}
                        alt="Teamwork and Excellence"
                        className="w-full md:w-1/2 rounded-lg shadow-lg h-56 object-cover"
                    />
                    <div className="text-center md:text-left md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
                        <p className="text-gray-600 leading-7">
                            We envision a world where businesses thrive on collaboration and innovation. Through our values of
                            integrity and excellence, we aim to create lasting impacts in our industry and beyond.
                        </p>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <img
                        src={achievementImg}
                        alt="Achieving Milestones"
                        className="w-full md:w-1/2 rounded-lg shadow-lg h-56 object-cover"
                    />
                    <div className="text-center md:text-left md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Achievements</h2>
                        <p className="text-gray-600 leading-7">
                            Over the years, we have celebrated countless milestones and partnerships. Our success is a testament to our
                            dedication to delivering value and driving progress for our clients and community.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AboutUs;
