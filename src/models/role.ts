import { Schema, model } from 'mongoose';
import { Role } from '../interfaces/schemeInterfaces';
import { Collections } from '../types/types';

const RoleSchema = new Schema<Role>({
    role: {
        type: String,
        required: [true, "The role is required"],
    }
});

export default model(Collections.ROLE, RoleSchema);
