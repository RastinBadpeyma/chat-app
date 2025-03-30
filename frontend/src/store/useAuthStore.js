import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

// Zustand store for authentication
export const useAuthStore = create((set) => ({
   // Stores the authenticated user
   authUser: null,
   isRegistering: false,
   isLoggingIn: false,
   isUpdatingProfile: false,
   isCheckingAuth: true, // Initially checking authentication status

   // Function to check if the user is authenticated
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
   // Function to register a new user
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

    
  logout: async () => {
   try {
     await axiosInstance.post("/auth/logout");
     set({ authUser: null });
     toast.success("Logged out successfully");
   } catch (error) {
     toast.error(error.response.data.message);
   }
 },

}));