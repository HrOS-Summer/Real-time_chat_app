import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { forgotPassword, isRequestingReset } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Email is required");
            return;
        }
        await forgotPassword(email);
        setEmail(""); // Clear form
    };

    return (
        <div className="h-screen flex items-center justify-center bg-base-200">
            <div className="max-w-md w-full p-6 bg-base-300 rounded-xl shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>
                <p className="text-center text-zinc-400 mb-6">
                    Enter your email to receive a password reset link.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <div className="text-sm text-zinc-400 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2.5 bg-base-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isRequestingReset}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full btn btn-primary py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50"
                        disabled={isRequestingReset}
                    >
                        {isRequestingReset ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
                <p className="text-center text-sm text-zinc-400 mt-4">
                    Back to <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;