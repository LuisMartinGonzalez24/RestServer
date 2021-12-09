import { Schema, model } from 'mongoose';

interface Role {
    role: string;
}

const RoleSchema = new Schema<Role>({
    role: {
        type: String,
        required: [true, "The role is required"],
    }
});

export default model('Role', RoleSchema);
