// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   try {
//     const { email, password } = await req.json();

//     // Find user by email
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return Response.json(
//         { success: false, message: "User not found" },
//         { status: 400 }
//       );
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return Response.json(
//         { success: false, message: "Invalid password" },
//         { status: 400 }
//       );
//     }

//     // Create JWT
//     const token = jwt.sign(
//       { id: user.id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return Response.json({
//       success: true,
//       message: "Login successful",
//       token,
//       role: user.role,
//     });
//   } catch (error) {
//     return Response.json(
//       { success: false, message: "Server error", error: error.message },
//       { status: 500 }
//     );
//   }
// }
