import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  type EditProfileSchema,
} from "../../lib/schemas/editProfileSchema";
import "./EditUserForm.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useProfile } from "../../lib/hooks/useProfile";
import { toast } from "react-toastify";

type Props = {
  setEditMode: (editMode: boolean) => void;
};

export default function EditUserForm({ setEditMode }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateProfile, profile, uploadPhoto } = useProfile(id);
  const {
    register,

    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: EditProfileSchema) => {
    updateProfile.mutate(data, {
      onSuccess: () => {
        setEditMode(false);
        toast.success("Profile updated successfully");
        navigate(`/profiles/${id}`);
      },
    });
  };

  return (
    <div className="edit-user-container">
      <form onSubmit={handleSubmit(onSubmit)} className="edit-user-form">
        <div className="form-group">
          <div className="profile-img-wrapper">
            <img
              src={profile?.imageUrl}
              className="profile-img edit-img"
              alt="profile image"
            />

            <input
              type="file"
              accept="image/*"
              id="photoInput"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  uploadPhoto.mutate(e.target.files[0]);
                }
              }}
            />

            <button
              type="button"
              onClick={() => document.getElementById("photoInput")?.click()}
              disabled={uploadPhoto.isPending}
              className="editImg-btn"
            >
              {uploadPhoto.isPending ? "Uploading..." : "Edit"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="pen-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>
          </div>

          <label htmlFor="displayName">FULL NAME</label>
          <input
            type="text"
            defaultValue={profile?.displayName || ""}
            {...register("displayName")}
          />
          {errors.displayName && <span>{errors.displayName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bio">BIO</label>
          <input
            type="text"
            {...register("bio")}
            defaultValue={profile?.bio || ""}
          />
          {errors.bio && <span>{errors.bio.message}</span>}
        </div>

        <div className="btn-row">
          <button
            type="submit"
            className="editProfile-btn btn"
            disabled={!isValid || !isDirty || updateProfile.isPending}
          >
            Save changes
          </button>
          <button
            type="button"
            className="editProfile-nav-btn btn"
            onClick={() => setEditMode(false)}
          >
            Back to profile
          </button>
        </div>
      </form>
    </div>
  );
}
