import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  // Get user data and update function from auth store
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  
  // State for storing the selected image (before upload)
  const [selectedImg, setSelectedImg] = useState(null);

  // Handle image upload and conversion to base64
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // Convert image to base64 string
    reader.readAsDataURL(file);

    // When conversion is complete
    reader.onload = async () => {
      const base64Image = reader.result;      setSelectedImg(base64Image); // Show preview
      await updateProfile({ profilePic: base64Image }); // Update profile
    };
  };

  return (
    <div className="h-screen pt-20">
      {/* Main container */}
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* Profile card */}
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          {/* Profile header */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {/* Profile image with fallback to default avatar */}
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt=""
                className="size-32 rounded-full object-cover border-4"
              />
              
              {/* Hidden file input with camera icon button */}
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            
            {/* Upload status message */}
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User information section */}
          <div className="space-y-6">
            {/* Full name field */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            {/* Email field */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account information section */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              {/* Member since date */}
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span> {/* Format date */}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;