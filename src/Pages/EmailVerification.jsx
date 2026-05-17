import { useParams, useNavigate } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import API from "../services/api";

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await API.put(`/api/verify/${token}`);
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setMessage(error.response?.data?.message || "Verification failed or link expired.");
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">Email Verification</h1>
        <p className={`text-lg ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {message || "Verifying your email..."}
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;