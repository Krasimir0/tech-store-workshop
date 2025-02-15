import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

// Modify the database from the conditions on the project
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minLength: 10,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    }
});

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
} )

const User = model('User', userSchema);

export default User;