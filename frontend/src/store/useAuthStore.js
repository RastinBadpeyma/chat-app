import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
   authUser: null,
   isRegistering: false,
   isLoggingIn: false,
   isUpdatingProfile: false,
   isCheckingAuth: true,

   checkAuth: async () => {
      try {
         const res = await axiosInstance.get("/auth/check");
         set({ authUser: res.data });
      } catch (error) {
         set({ authUser: null });
      }finally{
         set({ isCheckingAuth: false });
      }
   },
   register: async (data) => {
      set({ isRegistering: true });
      try {
        const res = await axiosInstance.post("/auth/register", data);
        set({ authUser: res.data });
        toast.success("Account created successfully");
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ isRegistering: false });
      }
    },
}));