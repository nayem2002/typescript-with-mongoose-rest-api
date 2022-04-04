import { connect } from "mongoose";

const connectDatabase = async () => {
  try {
    const uri: string | undefined = process.env.DB_URI!;
    const opts: object = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };
    await connect(uri, opts).then(() =>
      console.log("🚀Database connection established")
    );
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    console.log(`Connection failed`);
  }
};

export default connectDatabase;
