import { useEffect, useState } from "react";
import { apiClient } from "../lib/apiClient";
import { PRODUCTS } from "../lib/constants";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchProducts() {
      try {
        const response = await apiClient.get(PRODUCTS);
        if (response.status === 200) {
          setProducts(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto container gap-8 py-10 px-10 sm:px-5">
      {products.map((product) => (
        <Link
          to={`/product/${product._id}`}
          className="card bg-base-300 w-full shadow-sm"
          key={product._id}
          data-aos="fade-right"
        >
          <figure>
            <img
              src={product.image}
              alt="Product image"
            />
          </figure>
          <div className="card-body flex flex-row justify-between items-center">
            <div>
              <h2 className="card-title">{product.title}</h2>
              <p> ₹{product.price} </p>
            </div>
            <div>
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
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
