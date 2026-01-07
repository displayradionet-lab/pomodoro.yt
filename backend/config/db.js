import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://displayradionet_db_user:wok9buIWmmet481G@cluster0.gzkya0a.mongodb.net/Pomodoro-yt')
    .then(() => console.log("DB Connected"))
}