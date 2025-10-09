import { useState } from "react";
import { X, Camera, ChevronDown, Loader } from "lucide-react";
import ImgIcon from "../../assets/icons/Image.svg";
import { addInstructor, updateInstructor } from "../../api/instructorApi";
import { StarIcon } from "@heroicons/react/20/solid";
import { instructorSchema } from "../../lib/validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";
import toast from "react-hot-toast";

export default function InstructorModal({ type, instructor, onClose }) {
  const [preview, setPreview] = useState(null);
  const [rate, setRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(instructorSchema),
    defaultValues: instructor || {
      imageUrl: "",
      name: "",
      jobTitle: "",
      rate: 0,
      description: "",
    },
  });

  const renderRatingStars = (rating, onStarClick, readOnly = false) => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        disabled={readOnly}
        onClick={() => !readOnly && onStarClick(index + 1)}
        className={`text-2xl ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        } ${readOnly ? "cursor-default" : "cursor-pointer "}`}
      >
        <StarIcon className="w-5 h-5" />
      </button>
    ));
  };

  const handleRating = (value) => {
    setRate(value);
    setValue("rate", value);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("imageUrl", reader.result);
        setPreview(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        jobTitle: data.jobTitle,
        rate: data.rate,
        description: data.description,
        imageUrl: image,
      };
      setLoading(true);
      if (type === "add") {
        await addInstructor(payload);
        toast.success("Instructor added successfully");
      }
      if (type === "update") {
        await updateInstructor(instructor.id, payload);
        toast.success("Instructor updated successfully");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <>
      {/* Modal */}

      <div className="fixed inset-0 bg-black/60  flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-[20px] border border-foundation-border shadow-xl w-full max-w-150 p-5 space-y-6">
          {/* Modal Header */}
          <div className="flex items-center justify-between  ">
            <h3 className="text-lg font-medium text-content-primary">
              {type === "add" && "Add Instructor"}
              {type === "update" && "Update Instructor"}
              {type === "view" && "View Instructor"}
            </h3>
            <button
              onClick={onClose}
              className="text-content-primary hover:text-gray-600 cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              {/* Image Upload */}

              <div className="mb-6 flex justify-start">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                    {preview ? (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="">
                        <img
                          src={
                            type === "view" || type === "update"
                              ? `http://localhost:5046${instructor.imageUrl}`
                              : ImgIcon
                          }
                          alt="img icon"
                        />
                      </div>
                    )}
                  </div>
                  {type !== "view" && (
                    <label className="absolute bottom-0 -right-2.5 bg-[#5879DC] rounded-full border-2 border-white p-3 cursor-pointer hover:bg-blue-700">
                      <Camera className="h-4 w-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        {...register("imageUrl")}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-red-500 text-sm">
                  {errors.imageUrl?.message}
                </p>
              </div>

              {/* Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="courseName"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Write here"
                  {...register("name")}
                  disabled={type === "view"}
                  className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              </div>

              {/* Job Title and Rate */}
              <div className="grid grid-cols-2 items-center gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Job Title
                  </label>
                  <div className="relative">
                    <select
                      name="jobTitle"
                      {...register("jobTitle")}
                      placeholder="Choose"
                      disabled={type === "view"}
                      className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Choose</option>
                      <option value="BackendDeveloper">
                        Backend Developer
                      </option>
                      <option value="FrontendDeveloper">
                        Frontend Developer
                      </option>
                      <option value="FullstackDeveloper">
                        Fullstack Developer
                      </option>
                      <option value="UXUIDesigner">UX/UI Designer</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                  </div>
                  <p className="text-red-500 text-sm">
                    {errors.jobTitle?.message}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Rate
                  </label>
                  <div className="flex gap-1 ">
                    {type === "view" &&
                      renderRatingStars(instructor.rate, null, true)}

                    {type === "add" &&
                      renderRatingStars(rate, handleRating, false)}

                    {type === "update" &&
                      renderRatingStars(
                        rate || instructor.rate,
                        handleRating,
                        false
                      )}
                  </div>
                  <p className="text-red-500 text-sm">{errors.rate?.message}</p>
                </div>
              </div>

              {/* Description Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  {...register("description")}
                  placeholder="Write here"
                  disabled={type === "view"}
                  rows={4}
                  className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <p className="text-red-500 text-sm">
                  {errors.description?.message}
                </p>
              </div>

              {/* Modal Footer */}
              {type !== "view" && (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className=" px-4 py-3 text-g-700 bg-[#EDEDED] rounded-lg text-size-16 font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-4 py-3 text-size-16 font-medium bg-[#020617] text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {type === "add" ? "Add" : "Update"}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
