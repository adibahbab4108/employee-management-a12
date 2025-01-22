
const TestimonialCard = ({ testimonial }) => {
    const { name, designation, review, rating, date } = testimonial
    console.log(name, designation, review, rating, date)
    return (
        <div className="h-72 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 shadow-lg rounded-xl p-6 max-w-xs text-center mx-4">
            <p className="review italic text-gray-800 mb-4">{review}</p>
            <h4 className="name text-lg font-bold text-gray-900">{name}</h4>
            <p className="designation text-sm text-gray-700">{designation}</p>
            <p className="rating text-yellow-500 text-sm mt-2">{'⭐'.repeat(rating)}</p>
            <p className="date text-xs text-gray-500 mt-4">{new Date(date).toLocaleDateString()}</p>
        </div>
    );
};

export default TestimonialCard;
