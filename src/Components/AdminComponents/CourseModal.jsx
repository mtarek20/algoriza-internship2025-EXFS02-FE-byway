import { useEffect, useState } from "react";
import { ArrowLeft, PlusCircle, Trash2Icon, Upload, X } from "lucide-react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
  BtnUndo,
  BtnRedo,
} from "react-simple-wysiwyg";
import { getInstructors } from "../../api/instructorApi";
import { getCategories } from "../../api/categoryApi";
import { StarIcon } from "@heroicons/react/20/solid";
import { courseSchema } from "../../lib/validation";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CourseModal({
  isOpen,
  onClose,
  modalType = "add",
  onSave,
  course,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rate, setRate] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseSchema),
    defaultValues: course || {
      name: "",
      imageUrl: "",
      categoryId: "",
      level: "",
      instructorId: "",
      cost: 0,
      totalHours: 0,
      rate: 0,
      description: "",
      certification: "",
      contents: [],
    },
  });

  useEffect(() => {
    const fetchInstructors = async () => {
      const res = await getInstructors();
      setInstructors(res);
    };
    const fetchCategories = async () => {
      const res = await getCategories();
      setCategories(res);
    };
    fetchCategories();
    fetchInstructors();
  }, []);

  const nextStep = async (e) => {
    e.preventDefault();
    const isValid = await trigger([
      "name",
      "imageUrl",
      "categoryId",
      "level",
      "instructorId",
      "cost",
      "totalHours",
      "rate",
      "description",
      "certification",
    ]);
    if (isValid) setCurrentStep(2);
  };

  // Add Content
  const addContent = () => {
    const contents = getValues("contents") || [];
    setValue(
      "contents",
      [...contents, { name: "", lecturesNumber: 0, time: 0 }],
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  // Remove Content
  const removeContent = (index) => {
    const contents = getValues("contents") || [];
    const updated = contents.filter((_, i) => i !== index);
    setValue("contents", updated, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  // Upload Image
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("imageUrl", reader.result, { shouldDirty: true });
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      contents: (data.contents || []).map((c) => ({
        name: c.name,
        lecturesNumber: Number(c.lecturesNumber),
        time: Number(c.time),
      })),
    };
    if (onSave) {
      await onSave(payload, modalType, course?.id);
    }
    reset();
    setSelectedImage(null);
    setCurrentStep(1);
    onClose();
  };

  const renderRatingStars = (rating, onStarClick, readOnly = false) =>
    [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        disabled={readOnly}
        onClick={() => !readOnly && onStarClick(i + 1)}
        className={`text-2xl ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        <StarIcon className="w-5 h-5" />
      </button>
    ));

  const handleRating = (value) => {
    setRate(value);
    setValue("rate", value, { shouldDirty: true });
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-[20px] mt-10 border border-foundation-border p-6 shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl flex items-center text-content-primary font-medium">
          {currentStep === 2 && (
            <ArrowLeft
              onClick={() => setCurrentStep(1)}
              className="mr-4 cursor-pointer"
            />
          )}
          {modalType === "add" && "Add Course"}
          {modalType === "update" && "Update Course"}
          {modalType === "view" && "View Course"}
          <span className="text-[#626C83] text-size-16 font-medium ml-4">
            Step {currentStep} of 2
          </span>
        </h2>
        <button
          onClick={() => {
            reset();
            setSelectedImage(null);
            setCurrentStep(1);
            onClose();
          }}
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 - Details */}
        {currentStep === 1 && (
          <div>
            <h3 className="text-xl text-content-primary mt-6 mb-4">
              Course Details
            </h3>
            <label className="flex items-start space-x-8 border border-violet-light rounded-lg p-6 mb-6">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={modalType === "view"}
              />
              <div className="bg-[#F2F4F5] w-61 h-33 p-2 rounded-lg border border-graylight flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="object-cover rounded-lg"
                  />
                ) : modalType !== "add" && course?.imageUrl ? (
                  <img
                    src={`http://localhost:5046${course.imageUrl}`}
                    alt="Selected"
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center ">
                    <Upload className="w-5 h-5 text-content-secondery" />
                    <span className="text-sm font-medium text-content-secondery">
                      Upload Image
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="text-lg font-medium text-content-primary ">
                  Size: 700x430 pixels
                </p>
                <p className="text-lg font-medium text-content-primary ">
                  File Support: .jpg, .jpeg, png, or .gif
                </p>
              </div>
            </label>
            <p className="text-red-500 text-sm">{errors.imageUrl?.message}</p>

            {/* Course Form Inputs */}
            <div className=" flex flex-col space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="courseName"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  placeholder="Course Name"
                  {...register("name")}
                  disabled={modalType === "view"}
                  className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-red-500 text-sm">{errors.name?.message}</p>
              </div>

              {/* Category and Level */}
              <div className=" grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    {...register("categoryId")}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>
                      {modalType === "add"
                        ? "Choose Category"
                        : course?.categoryName}
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm">
                    {errors.categoryId?.message}
                  </p>
                </div>

                {/* Level */}
                <div>
                  <label
                    htmlFor="courseName"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    level
                  </label>
                  <select
                    name="level"
                    {...register("level")}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <p className="text-red-500 text-sm">
                    {errors.level?.message}
                  </p>
                </div>
              </div>

              {/* Instructor and Cost */}

              <div className=" grid grid-cols-2 gap-4">
                {/* Instructor */}
                <div>
                  <label
                    htmlFor="instructorName"
                    className="block text-sm font-medium text-gray-900 mb-2"
                  >
                    Instructor
                  </label>

                  <select
                    {...register("instructorId")}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>
                      {modalType === "add"
                        ? "Choose Instructor"
                        : course?.instructorName}
                    </option>
                    {instructors.map((ins) => (
                      <option key={ins.id} value={ins.id}>
                        {ins.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 text-sm">
                    {errors.instructorId?.message}
                  </p>
                </div>
                {/* Cost */}

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Cost
                  </label>

                  <input
                    type="number"
                    id="costId"
                    placeholder="write Here"
                    {...register("cost")}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-red-500 text-sm">{errors.cost?.message}</p>
                </div>
              </div>

              {/* Total Hours And Rating */}
              <div className=" grid grid-cols-2 gap-4">
                {/* Total Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Total Hours
                  </label>
                  <input
                    type="number"
                    placeholder="Total Hours"
                    {...register("totalHours")}
                    disabled={modalType === "view"}
                    className="w-full px-3 py-3.5 border border-[#DFE1E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.totalHours?.message}
                  </p>
                </div>

                {/* Rating */}

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Rate
                  </label>
                  <div className="flex gap-1 ">
                    {modalType === "view" &&
                      renderRatingStars(course.rate, null, true)}

                    {modalType === "add" &&
                      renderRatingStars(rate, handleRating, false)}

                    {modalType === "update" &&
                      renderRatingStars(
                        rate || course.rate,
                        handleRating,
                        false
                      )}
                  </div>
                  <p className="text-red-500 text-sm">{errors.rate?.message}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <EditorProvider>
                      <Editor
                        placeholder="Write Here"
                        {...field}
                        disabled={modalType === "view"}
                      >
                        <Toolbar>
                          <BtnBold />
                          <BtnItalic />
                          <BtnUnderline />
                          <BtnNumberedList />
                          <BtnBulletList />
                          <BtnLink />
                          <BtnUndo />
                          <BtnRedo />
                        </Toolbar>
                      </Editor>
                    </EditorProvider>
                  )}
                />
                <p className="text-red-500 text-sm">
                  {errors.description?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Certification
                </label>
                <Controller
                  control={control}
                  name="certification"
                  render={({ field }) => (
                    <EditorProvider>
                      <Editor
                        placeholder="Write Here"
                        {...field}
                        readOnly={modalType === "view"}
                      >
                        <Toolbar>
                          <BtnBold />
                          <BtnItalic />
                          <BtnUnderline />
                          <BtnNumberedList />
                          <BtnBulletList />
                          <BtnLink />
                          <BtnUndo />
                          <BtnRedo />
                        </Toolbar>
                      </Editor>
                    </EditorProvider>
                  )}
                />
                <p className="text-red-500 text-sm">
                  {errors.certification?.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 - Contents */}
        {currentStep === 2 && (
          <>
            <h3 className="text-xl text-content-primary mt-6 mb-4">
              Add Content
            </h3>
            {(getValues("contents") || []).length === 0 ? (
              <p className="text-sm text-gray-500 mb-2">
                <strong>Add Content</strong>
              </p>
            ) : (
              getValues("contents").map((content, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-[#F7F8F9] space-y-4 mb-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Write here"
                      {...register(`contents.${index}.name`)}
                      disabled={modalType === "view"}
                      className="w-full px-3 py-3.5 border bg-white border-[#DFE1E8] rounded-lg"
                    />
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-full">
                      <label className="block text-size-16 font-medium text-gray-900 mb-2">
                        Lectures Number
                      </label>
                      <input
                        type="number"
                        {...register(`contents.${index}.lecturesNumber`)}
                        disabled={modalType === "view"}
                        className="w-full px-3 py-3.5 border bg-white border-[#DFE1E8] rounded-lg"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-size-16 font-medium text-gray-900 mb-2">
                        Time
                      </label>
                      <input
                        type="number"
                        {...register(`contents.${index}.time`)}
                        disabled={modalType === "view"}
                        className="w-full px-3 py-3.5 border bg-white border-[#DFE1E8] rounded-lg"
                      />
                    </div>
                  </div>
                  {modalType !== "view" && (
                    <button
                      type="button"
                      onClick={() => removeContent(index)}
                      className="bg-[#FDEEEE] p-4 rounded-lg text-[#EB5757] hover:bg-red-100"
                    >
                      <Trash2Icon />
                    </button>
                  )}
                </div>
              ))
            )}

            {modalType !== "view" && (
              <button
                type="button"
                onClick={addContent}
                className="flex items-center w-full justify-center bg-[#ECEEF0] py-3 px-3.5 rounded-lg mt-2 text-sm text-content-primary font-semibold hover:bg-gray-200"
              >
                Add Content <PlusCircle className="ml-2 w-4 h-4" />
              </button>
            )}
          </>
        )}

        {/* Footer */}
        <div className="flex justify-between gap-3 mt-6">
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectedImage(null);
              setCurrentStep(1);
              onClose();
            }}
            className="px-4 py-3 text-[#EB5757] bg-[#FDEEEE] rounded-lg text-size-16 font-medium hover:bg-red-100"
          >
            Cancel
          </button>
          {currentStep === 1 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 px-4 py-3 text-size-16 font-medium bg-[#020617] text-white rounded-lg hover:bg-gray-800"
            >
              Next
            </button>
          ) : (
            modalType !== "view" && (
              <button
                type="submit"
                className="flex-1 px-4 py-3 text-size-16 font-medium bg-[#020617] text-white rounded-lg hover:bg-gray-800"
              >
                {modalType === "add" ? "Add" : "Update"}
              </button>
            )
          )}
        </div>
      </form>
    </div>
  );
}
