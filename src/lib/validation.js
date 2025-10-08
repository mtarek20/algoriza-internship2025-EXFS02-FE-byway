import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

// Instructor Schema

export const instructorSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  jobTitle: yup.string().required("Job title is required"),
  rate: yup.number().min(1).max(5).required("Rate is required"),
  description: yup.string().required("Description is required"),
  imageUrl: yup.string().required("Image is required"),
});

// Course Schema
export const courseSchema = yup.object().shape({
  imageUrl: yup.mixed().required("Course image is required"),
  name: yup.string().required("Course name is required"),
  categoryId: yup
    .number()
    .typeError("Category is required")
    .required("Category is required"),
  level: yup
    .string()
    .oneOf(["Beginner", "Intermediate", "Expert"], "Invalid level")
    .required("Level is required"),
  instructorId: yup
    .number()
    .typeError("Instructor is required")
    .required("Instructor is required"),
  cost: yup
    .number()
    .typeError("Cost must be a number")
    .positive("Cost must be positive")
    .required("Cost is required"),
  totalHours: yup
    .number()
    .typeError("Total hours must be a number")
    .positive()
    .required("Total hours required"),
  rate: yup
    .number()
    .min(1, "Minimum 1 star")
    .max(5, "Maximum 5 stars")
    .required("Rate is required"),
  description: yup.string().required("Description is required"),
  certification: yup.string().required("Certification field is required"),
  contents: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Content name is required"),
        lecturesNumber: yup
          .number()
          .typeError("Must be a number")
          .positive()
          .required("Lectures number is required"),
        time: yup
          .number()
          .typeError("Must be a number")
          .positive()
          .required("Time is required"),
      })
    )
    .min(1, "At least one content is required"),
});

// Payment Schema
export const paymentSchema = yup.object().shape({
  nameOnCard: yup.string().required("Name on card is required"),
  cardNumber: yup.string().required("Card number is required"),
  expiryDate: yup.string().required("Expiry date is required"),
  cvc: yup.string().required("CVC is required"),
  country: yup.string().required("Country is required"),
  state: yup.string().required("State is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Amount is required"),
  userId: yup.number().required("User ID is required"),
});
