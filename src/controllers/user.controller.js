import { asyncHandler } from "../utils/asyncHandler.js";
import { GlobalError } from "../utils/globalError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, confirmPassword } = req.body;

  // Check if fields are empty
  if (
    [fullName, email, username, password, confirmPassword].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new GlobalError(400, "All fields are required");
  }

  // Check Password Match
  if (password !== confirmPassword) {
    throw new GlobalError(400, "Passwords do not match");
  }

  // check if user exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new GlobalError(409, "User with this email already Exists!");
  }

  // check if username exists
  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    throw new GlobalError(409, "This Username is already taken!");
  }

  // check if file is uploaded
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new GlobalError(400, "Avatar Image is required");
  }

  // upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new GlobalError(400, "Avatar Image is required");
  }

  const user = await User.create({
    fullName,
    email,
    username: username.toLoweCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new GlobalError(500, "User Registration Failed");
  }

  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Created Successfully"));
});

export { registerUser };
