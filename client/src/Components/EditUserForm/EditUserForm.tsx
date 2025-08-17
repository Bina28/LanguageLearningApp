import "./EditUserForm.css";

import { useForm } from "react-hook-form";
import { useUpdateUser } from "../../lib/hooks/useUserUpdate";



type EditUser = {
  id: string;
  email: string;
  fullName: string;

};

type EditUserFormProps = EditUser & {
  onCancel: () => void;
};

export default function EditUserForm({
  id,
  fullName,
  email,
  onCancel,
}: EditUserFormProps) {

  const { register, handleSubmit } = useForm<EditUser>({
    defaultValues: {
      id,
      fullName,
      email,
    },
  });

  const { updateUser } = useUpdateUser();

  const onSubmit = async (data: EditUser) => {
    await updateUser.mutateAsync(data);
    onCancel();
  };


  return (
    <div className="edit-user-container">
      <form onSubmit={handleSubmit(onSubmit)} className="edit-user-form">
        <h2 className="edit-form-title">Edit Profile</h2>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName", { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="btn-row">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
