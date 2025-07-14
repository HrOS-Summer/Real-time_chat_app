import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { resetPassword, isResettingPassword } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            toast.error("Both password fields are required");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        try {
            await resetPassword(token, password);
            navigate("/login");
        } catch (error) {
            console.error("Reset password error:", error);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-base-200">
            <div className="max-w-md w-full p-6 bg-base-300 rounded-xl shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">Reset Password</h1>
                <p className="text-center text-zinc-400 mb-6">
                    Enter your new password below.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <div className="text-sm text-zinc-400 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            New Password
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="w-full px-4 py-2.5 bg-base-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isResettingPassword}
                        />
                    </div>
                    <div className="space-y-1.5">
                        <div className="text-sm text-zinc-400 flex items-center gap-2">
                            <Lock className="w-4 h-4" />
                            Confirm Password
                        </div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2.5 bg-base-200 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isResettingPassword}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50"
                        disabled={isResettingPassword}
                    >
                        {isResettingPassword ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
                <p className="text-center text-sm text-zinc-400 mt-4">
                    Back to <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ResetPassword;