import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Zustand store for authentication
export const useAuthStore = create((set , get) => ({
   // Stores the authenticated user
   authUser: null,
   isRegistering: false,
   isLoggingIn: false,
   isUpdatingProfile: false,
   isCheckingAuth: true, // Initially checking authentication status
   onlineUsers: [],
   socket:null,


   // Function to check if the user is authenticated
   checkAuth: async () => {
      try {
         const res = await axiosInstance.get("/auth/check");
         set({ authUser: res.data });
         get().connectSocket();
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
        get().connectSocket();
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
     get().disconnectSocket();
   } catch (error) {
     toast.error(error.response.data.message);
   }
 },

 login: async (data) => {
   set({ isLoggingIn: true });
   try {
     const res = await axiosInstance.post("/auth/login", data);
     set({ authUser: res.data });
     toast.success("Logged in successfully");
     get().connectSocket();
   } catch (error) {
     toast.error(error.response.data.message);
   } finally {
     set({ isLoggingIn: false });
   }
 },

 updateProfile: async (data) => {
   set({ isUpdatingProfile: true });
   try {
     const res = await axiosInstance.put("/auth/update-profile", data);
     set({ authUser: res.data });
     toast.success("Profile updated successfully");
   } catch (error) {
     console.log("error in update profile:", error);
     toast.error(error.response.data.message);
   } finally {
     set({ isUpdatingProfile: false });
   }
 },

 connectSocket: () => {
  const {authUser} = get();
  if (!authUser || get().socket?.cconnect) return;

  const socket = io("http://localhost:5001" ,{
    query: {
      userId: authUser._id,
    },
  });
  socket.connect();

  set({socket:socket});

  socket.on("getOnlineUsers" , (userIds) => {
    set({onlineUsers: userIds});
  })
 },

 disconnectSocket: () => {
  if (get().socket?.connected) get().socket.disconnect();
 }


}));