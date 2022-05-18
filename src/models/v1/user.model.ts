import { userInterface} from "../../interface";
import {Schema, model, Types, Model} from "mongoose"
import  {passwordHash}  from "../../utils/index";
import { USERTYPE } from "../../constants/enum.constants";

const userSchema: Schema<userInterface> = new Schema<userInterface>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    active: {
        type: Boolean,
        default: false
    },
    DOB: {
        type: Date,
        default: null
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        enum: USERTYPE
    },
    profilePicUrl: {
        type: String,
        default: ""
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    phoneVerified: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await passwordHash(this.password);
    }
    next();
});


const UserModel: Model<userInterface> = model<userInterface>('User', userSchema);
export default UserModel;