import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Authentication and User Management Store
// Handles user authentication, registration, and real-time online status
export const useAuthStore = create((set , get) => ({
  // State Management
   authUser: null,                    // Currently authenticated user object
   isRegistering: false,             // Loading state during user registration
   isLoggingIn: false,               // Loading state during user login
   isUpdatingProfile: false,         // Loading state during profile updates
   isCheckingAuth: true,             // Initial authentication check state
   onlineUsers: [],                  // Array of currently online user IDs
   socket: null,                     // Socket.io connection instance


  // Authentication Check
   // Runs on app initialization to verify user session
   checkAuth: async () => {
      try {
         const res = await axiosInstance.get("/auth/check");
         set({ authUser: res.data });
         get().connectSocket();
      } catch (error) {
         console.log("error in checkAuth:", error);
         set({ authUser: null });
      }finally{
         set({ isCheckingAuth: false });
      }
   },
     // User Registration
   // Creates a new user account
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

    // User Logout
   // Ends the current user session
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

  // User Login
   // Authenticates an existing user
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

 // User Profile Update
 // Updates the user's profile information
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

 // Socket.io Connection Setup
   // Establishes real-time connection
 connectSocket: () => {
  const {authUser} = get();
  if (!authUser || get().socket?.cconnect) return;

  // Initialize socket connection with user ID
  const socket = io("http://localhost:5001" ,{
    query: {
      userId: authUser._id,
    },
  });
  socket.connect();

  set({socket:socket});

  // Listen for online users updates
  socket.on("getOnlineUsers" , (userIds) => {
    set({onlineUsers: userIds});
  })
 },

  // Socket.io Disconnection
  // Cleans up socket connection
 disconnectSocket: () => {
  if (get().socket?.connected) get().socket.disconnect();
 }


}));