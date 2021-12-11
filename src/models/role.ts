import { Schema, model } from 'mongoose';
import { Role } from '../interfaces/schemeInterfaces';

const RoleSchema = new Schema<Role>({
    role: {
        type: String,
        required: [true, "The role is required"],
    }
});

export default model('Role', RoleSchema);
