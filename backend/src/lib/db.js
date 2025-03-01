import mongoose from "mongoose";


mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

export const mongoConnect = async function mongoConnect() {
  await mongoose.connect(process.env.MONGODB_URI);
}

export const mongoDisconnect = async function mongoDisconnect() {
  await mongoose.disconnect();
}
