import User from '../models/user';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//this is for registeering user
export const registerUser = async(req:any, res:any)=>{
    try{
        const {name, email, password, age} = req.body;
        //chacking all inputs fields are filled
        if(!name || !email || !password){
            return res.status(400).json({ message: "all input fields need to be filled"});
        }
        //checking weither the password is at leasr 6 characters long
        if(password.length<6){
            return res.status(400).json({message: "password must be at leasr 6 characters long"});
        }
        //checking weither the user akreasdy exists
        const existingUser = await User.findOne({email :email});
        if(existingUser ){
            return res.status(400).json({message:"User already exists. Please Login"})
        }

        //This is hasihing password here we use Bcrypts
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password : hashedPassword,
            age
        })
        await newUser.save();
        res.status(201).json({message:"User registered Successfully"});

    }
    catch(error:any){
        res.status(500).json({message:error.message});
    }
}



//this is for login user
export const loginUser = async(req:any , res:any)=>{
    try{
        const{email, password } = req.body;

        //checeking if the userExists
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message:"Something went wrong"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Something went wrong"});
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            "shhhhhhhhhh",
            { expiresIn: "7d" }
            );

            res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            });

      res.json({ message: "Login successful" });
      } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Server error" });
  }
}


//this is for when user forgets the password
export const forgotPassword = async (req:any, res:any) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    // Generate reset token
    const resetToken = jwt.sign(
      { id: user._id },
      "reset-secret-key",
      { expiresIn: "10m" }
    );user.resetPasswordToken = resetToken;
    await user.save();

    res.json({
      message: "Password reset token generated",
      resetToken,
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  };
};


//this is for resetting the password
export const resetPassword = async (req: any, res: any) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verify reset token
    const decoded: any = jwt.verify(token, "reset-secret-key");

    // Find user with matching reset token
    const user: any = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password & clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });

  } catch (error: any) {
    console.error("Reset Password Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

