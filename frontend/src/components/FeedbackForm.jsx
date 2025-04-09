import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ADD_FEEDBACK } from "../lib/constants";
import { apiClient } from "../lib/apiClient";
import { setProduct } from "../store/slices/productSlice";
import toast from "react-hot-toast";
import { Loader2 } from 'lucide-react'

const FeedbackForm = () => {

  const { username } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const initialFormData = {
    title: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [ submitting, setSubmitting ] = useState(false)

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true)
    try {
      const response = await apiClient.post(`${ADD_FEEDBACK}/${id}`, {
        ...formData,
        username,
      });
      if (response.status === 200) {
        document.getElementById("my_modal_3").close();
        toast.success("Feedback added successfully!")
        dispatch(setProduct({ product: response.data.product }));
        setSubmitting(false)
        setFormData(initialFormData);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setSubmitting(false)
    } finally {
      setSubmitting(false)
    }
  };

  return (
    <div data-aos="zoom-in"> 
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border border-base-300 p-4 rounded-box">
              <legend className="fieldset-legend">Add Feedback</legend>

              <label className="fieldset-label">Title</label>
              <input
                type="text"
                name="title"
                className="input w-full"
                placeholder="Title"
                value={formData.title}
                onChange={handleOnChange}
              />

              <label className="fieldset-label mt-2">Description</label>
              <textarea
                className="textarea w-full"
                rows={6}
                placeholder="Leave your review here"
                name="description"
                onChange={handleOnChange}
                value={formData.description}
              ></textarea>

              <button className="btn btn-primary mt-4" disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin" />  : 'Submit'}
                </button>
            </fieldset>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default FeedbackForm;
