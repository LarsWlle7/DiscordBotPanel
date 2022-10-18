import mongoose from "mongoose";

export interface IUser {
  id: string;
  discordId: string;
  accessToken: string;
  refreshToken: string;
  guilds: any[];
}

const UserSchema = new mongoose.Schema<IUser>({
  discordId: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  refreshToken: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  guilds: {
    type: [],
    required: true,
  },
});

export default mongoose.model("users", UserSchema);
