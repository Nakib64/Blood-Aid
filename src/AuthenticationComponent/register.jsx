import React, { useContext, useEffect, useState } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiUpload,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router"; // v6+
import { useForm } from "react-hook-form";
import axios from "axios";
import { authContext } from "../Authentication/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Slide, toast } from "react-toastify";

/* ──────────────────────────────────────────── */
/* 1. Strong‑password regex                     */
/* ──────────────────────────────────────────── */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

export default function RegistrationForm() {
  /* ──────────────────────── local state ─────────────────────── */
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(authContext);
  const navigate = useNavigate();

  /* ──────────────── react‑hook‑form setup ──────────────── */
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      avatar: "",
      bloodGroup: "",
      district: "",
      upazila: "",
      password: "",
      confirmPassword: "",
    },
  });

  /* ───────────────── district → upazila ───────────────── */
  const selectedDistrict = watch("district");

  useEffect(() => {
    axios
      .get("/bd_districts_with_upazilas.json")
      .then((res) => setDistricts(res.data))
      .catch((err) => console.error("District load error:", err));
  }, []);

  useEffect(() => {
    const found = districts.find((d) => d.district === selectedDistrict);
    setUpazilas(found ? found.upazilas : []);
    setValue("upazila", "");
  }, [selectedDistrict, districts, setValue]);

  /* ────────────────── avatar upload to imgbb ────────────────── */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const fd = new FormData();
      fd.append("image", file);
      fd.append("key", import.meta.env.VITE_IMGBB_KEY);
      const { data } = await axios.post("https://api.imgbb.com/1/upload", fd);
      setValue("avatar", data.data.url, { shouldValidate: true });
    } catch (err) {
      console.error("Avatar upload failed:", err);
    }
  };

  /* ─────────────────── form success flow ─────────────────── */
  const onSubmit = (values) => {
    signIn(values.email, values.password)
      .then(() =>
        updateProfile(auth.currentUser, {
          displayName: values.name,
          photoURL: values.avatar,
        })
      )
      .then(() => {
        reset();
        navigate("/authentication/login");
        toast.success(
          <span className="flex items-center gap-2">
            <FiCheckCircle className="text-xl" />
            Registration Successful! 🎉
          </span>,
          { transition: Slide, closeButton: false, hideProgressBar: false }
        );
      })
      .catch(() =>
        toast.error(
          <span className="flex items-center gap-2">
            <FiAlertCircle className="text-xl" />
            Invalid email or password
          </span>,
          { transition: Slide, closeButton: false, hideProgressBar: false }
        )
      );
  };

  /* ───────────────── form error → toast ───────────────── */
  const onError = (errObj) => {
    const firstError = Object.values(errObj)[0];
    if (!firstError) return;
    toast.error(
      <span className="flex items-center gap-2">
        <FiAlertCircle className="text-xl" />
        {firstError.message}
      </span>,
      { transition: Slide, closeButton: false, hideProgressBar: false }
    );
  };

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <div
      className="min-h-screen bg-[url('https://i.ibb.co/7JySbmCy/nguy-n-hi-p-2r-NHli-X6-XHk-unsplash.jpg')] bg-cover flex items-center justify-center px-4"
      data-theme="light"
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="bg-transparent backdrop-blur-lg rounded-xl p-8 w-full max-w-2xl space-y-4 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {/* email */}
        <input
          type="email"
          placeholder="Email"
          className="input"
          {...register("email", { required: "Email is required" })}
        />

        {/* name */}
        <input
          type="text"
          placeholder="Full Name"
          className="input"
          {...register("name", { required: "Name is required" })}
        />

        {/* avatar */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <FiUpload />
            <input type="file" className="hidden" onChange={handleImageUpload} />
            Upload Avatar
          </label>
          {watch("avatar") && (
            <img src={watch("avatar")} alt="avatar" className="w-10 h-10 rounded-full" />
          )}
        </div>

        {/* blood group */}
        <select
          className="input"
          {...register("bloodGroup", { required: "Select blood group" })}
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        {/* district */}
        <select
          className="input"
          {...register("district", { required: "Select district" })}
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.district_id} value={d.district}>
              {d.district}
            </option>
          ))}
        </select>

        {/* upazila */}
        <select
          className="input"
          {...register("upazila", { required: "Select upazila" })}
        >
          <option value="">Select Upazila</option>
          {upazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        {/* password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input"
            {...register("password", {
              required: "Password required",
              minLength: { value: 6, message: "Min 6 characters" },
              pattern: {
                value: passwordRegex,
                message: "Must contain 1 uppercase, 1 lowercase & 1 digit",
              },
            })}
          />
          <span
            className="absolute right-3 top-3 cursor-pointer text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        {/* confirm password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          {...register("confirmPassword", {
            validate: (v) => v === watch("password") || "Passwords do not match",
          })}
        />

        {/* submit */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 font-semibold transition"
        >
          Register
        </button>

        {/* link */}
        <p className="text-center mt-4 text-md">
          Already have an account?{" "}
          <Link to="/authentication/login" className="text-red-600 hover:underline">
            Login now
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
