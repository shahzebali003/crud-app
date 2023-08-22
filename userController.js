//IMPORT USER SCHEMA
const userdata = require("./userSchema");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userdata.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password === password) {
      return res.status(200).json({ message: "Login successful!!!", user: user.toObject() });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // ENTER DATA INTO SCHEMA
    const newUser = await userdata.create({
      firstName,
      lastName,
      email,
      password,
    });

    // SUCCESS
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });

    // FAIL
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};




exports.updatePassword = async (req, res) => {
  try {
      // Assuming your request body contains the email, password, and newPassword
      const { email, password, newPassword } = req.body;

      // Find the user by their email
      const user = await userdata.findOne({ email });

      if (!user) {
          return res.status(404).json({ status: 'fail', message: 'User not found' });
      }

      // Compare the provided old password with the stored password (plaintext comparison)
      if (user.password !== password) {
          return res.status(401).json({ status: 'fail', message: 'Invalid old password' });
      }else if(user.password === newPassword){
        return res.status(401).json({ status: 'fail', message: 'New Password should not be same!!' });
      }
      

      // Update the user's password with the new password (plaintext)
      user.password = newPassword;
      await user.save();

      res.status(200).json({ status: 'success', message: 'Password updated successfully' });
  } catch (err) {
      res.status(500).json({ status: 'error', message: err.message });
  }
};

