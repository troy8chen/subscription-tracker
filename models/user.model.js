import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minlength: [2, 'User name must be at least 3 characters long'],
        maxlength: [50, 'User name must be less than 50 characters'],
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        match: [
            /^\S+@\S+\.\S+$/,
            'Please use a valid email address',
        ],
        minlength: [5, 'User email must be at least 5 characters long'],
        maxlength: [255, 'User email must be less than 100 characters'],
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: [6, 'User password must be at least 8 characters long'],
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

User.create({})
// {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     password: 'password123',
// }