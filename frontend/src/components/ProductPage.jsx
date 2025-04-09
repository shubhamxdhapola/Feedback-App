import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCTS } from "../lib/constants";
import { apiClient } from "../lib/apiClient";
import Feedbacks from "./Feedbacks";
import FeedbackForm from "./FeedbackForm";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../store/slices/productSlice";
import toast from "react-hot-toast";

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    setLoading(true);
    async function fetchProduct() {
      try {
        const response = await apiClient.get(`${PRODUCTS}/${id}`);
        if (response.status === 200) {
          dispatch(setProduct({ product: response.data }));
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.err(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  function handleOnclick() {
    if (isAuthenticated) {
      document.getElementById("my_modal_3").showModal();
    } else {
      navigate("/login");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-10">
      <div className="px-4 py-4 mx-auto flex bg-base-200 rounded-lg drop-shadow overflow-hidden w-fit transform transition-transform items-center" data-aos="fade-down">
        <img
          className="aspect-square h-20 md:h-40 object-cover rounded-lg"
          src={product.image}
          alt="product image"
        />
        <div className="p-2 md:p-6 h-full flex flex-col md:justify-between">
          <div className="flex">
            <div>
              <h3 className="text-sm md:text-lg font-bold md:mb-2 uppercase  leading-4">
                {product.title}
              </h3>
              <p className="pb-0 md:pb-4">
                <span className="text-md md:text-lg font-bold text-green-600">
                  ₹{product.price}
                </span>
              </p>
              <p className="text-gray-100 text-sm">{product.description}</p>
            </div>
            <button className="btn btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-[1.2em]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>

          <button className="btn bg-primary mt-5" onClick={handleOnclick}>
            Add your feedback
          </button>
          <FeedbackForm />
        </div>
      </div>
      <h2 className="text-center text-xl" data-aos="fade-down">Feebacks</h2>
      <div className="mx-auto">
        <Feedbacks feedbacks={product.feedbacks} />
      </div>
    </div>
  );
};

export default ProductPage;
