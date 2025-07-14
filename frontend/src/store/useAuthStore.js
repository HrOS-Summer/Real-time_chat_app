import { create } from  "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    isDeletingProfile: false,
    isRequestingReset: false,
    isResettingPassword: false,
    onlineUsers: [],

    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
        } catch (error) {
            if(error.response?.status !== 401) {
                console.error("Error in checkAuth: ", error)
            }
            
            set({authUser: null})
        } finally {
            set({ isCheckingAuth: false }); //loading state
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data);

            console.log("Signup successfull: ", res.data);

            set({ authUser: res.data});

            toast.success("Account created successfully");

            console.log("Toast called")
            
        } catch (error) {
            console.log("error in signup useAuthStore.js");
            toast.error(error.response?.data?.message || "An error occured");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null })
            toast.success('Logged out successfully')
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in useAuthStore logout")
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile: ", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    deleteProfile: async () => {
        set({ isDeletingProfile: true });
        try {
            await axiosInstance.delete("/auth/delete-profile");
            set({ authUser: null });
            toast.success("Profile deleted successfully");
        } catch (error) {
            console.error("Error in delete profile:", error.response?.data || error);
            throw new Error(error.response?.data?.message || "Failed to delete profile");
        } finally {
            set({ isDeletingProfile: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isRequestingReset: true });
        try {
            await axiosInstance.post("/auth/forgot-password", { email });
            toast.success("Password reset email sent. Check your inbox.");
        } catch (error) {
            console.error("Error in forgot password:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Failed to send reset email");
        } finally {
            set({ isRequestingReset: false });
        }
    },

    resetPassword: async (token, password) => {
        set({ isResettingPassword: true });
        try {
            await axiosInstance.post(`/auth/reset-password/${token}`, { password });
            toast.success("Password reset successfully. Please log in.");
        } catch (error) {
            console.error("Error in reset password:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Failed to reset password");
        } finally {
            set({ isResettingPassword: false });
        }
    },
}));