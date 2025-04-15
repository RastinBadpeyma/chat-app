import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

// Chat Functionality Store
// Manages chat messages, user list, and message operations
export const useChatStore = create((set, get) => ({
  // State Management
  messages: [],                      // Array of chat messages
  users: [],                         // List of available users
  selectedUser: null,                // Currently selected chat partner
  isUsersLoading: false,             // Loading state for user list
  isMessagesLoading: false,          // Loading state for messages

  // Fetch Users
  // Retrieves list of available users for chat
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch Messages
  // Retrieves chat messages for a specific user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },


   // Send Message
  // Sends a new message to the selected user
  sendMessage: async (messageData) => {
   const { selectedUser, messages } = get();
   try {
     const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
     set({ messages: [...messages, res.data] });
   } catch (error) {
     toast.error(error.response.data.message);
   }
 },


  // Set Selected User
  // Updates the currently selected chat partner
 setSelectedUser: (selectedUser) => set({ selectedUser }),
}));