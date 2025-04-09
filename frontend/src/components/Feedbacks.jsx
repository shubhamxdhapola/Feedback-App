import { FaRegUserCircle } from "react-icons/fa";

const Feedbacks = ({ feedbacks }) => {
  return (
    <div className={`${feedbacks.length > 0  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex justify-center items-center'} `}>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div
            className="card w-full bg-base-200 card-md shadow-sm"
            key={feedback._id}
            data-aos="fade-right"
          >
            <div className="card-body">
              <h5 className="card-title text-sm">{feedback.title}</h5>
              <p className="text-sm text-base-content/90">{feedback.description}</p>
              <div className="flex justify-between mt-4 text-base-content/80">
                <span className="flex items-center gap-1">
                  <FaRegUserCircle className="size-4" />
                  {feedback.user.username}
                </span>
                <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg" data-aos="fade-down">
          No feedbacks for this product{" "}
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
