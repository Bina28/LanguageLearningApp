import { useForm } from "react-hook-form";
import {
  editProfileSchema,
  type EditProfileSchema,
} from "../../lib/schemas/editProfileSchema";
import "./EditUserForm.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { useProfile } from "../../lib/hooks/useProfile";
import { useEffect } from "react";

type Props = {
  setEditMode: (editMode: boolean) => void;
};

export default function EditUserForm({ setEditMode }: Props) {
  const { id } = useParams();
  const { updateProfile, profile } = useProfile(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    mode: "onTouched",
  });
  const onSubmit = (data: EditProfileSchema) => {
    updateProfile.mutate(data, {
      onSuccess: () => setEditMode(false),
    });
  };
  useEffect(() => {
    reset({
      displayName: profile?.displayName,
      bio: profile?.bio || "",
    });
  }, [profile, reset]);

  return (
    <div className="edit-user-container">
      <form onSubmit={handleSubmit(onSubmit)} className="edit-user-form">
      

        <div className="form-group">
          <img
            src={profile?.imageUrl}
            className="profile-img"
            alt="profile image"
          />
          <button>Edit</button>
          <label htmlFor="displayName">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            {...register("displayName", { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Bio"
            {...register("bio", { required: true })}
          />
        </div>

        <div className="btn-row">
          <button
            type="submit"
            disabled={!isValid || !isDirty || updateProfile.isPending}
          >
            Save
          </button>
          <button type="button" onClick={() => setEditMode(false)}>
            Back to Profile Page
          </button>
        </div>
      </form>
    </div>
  );
}
