import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

/**
 * HomePage Component
 * Main chat interface that displays either the chat container or a placeholder
 * when no chat is selected.
 */
const HomePage = () => {
  // Get the currently selected user from the chat store
  const { selectedUser } = useChatStore();

  return (
    // Main container with full height and background
    <div className="h-screen bg-base-200">
      {/* Centered content container with padding */}
      <div className="flex items-center justify-center pt-20 px-4">
        {/* Chat window container with max width and rounded corners */}
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          {/* Flex container for sidebar and chat area */}
          <div className="flex h-full rounded-lg overflow-hidden">
            {/* Sidebar component for user list */}
            <Sidebar />

            {/* Conditional rendering based on selected user */}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;