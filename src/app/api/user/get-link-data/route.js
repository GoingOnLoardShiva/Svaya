import { connectDB } from "../../../../../lib/db";
import Layout from "../../../../../models/user-acces/layout";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request) => {
  try {
    await connectDB();

    const body = await request.json();
    const { platform, id } = body;

    if (!platform) {
      return new Response(
        JSON.stringify({ message: "Platform and layout_uid are required" }),
        { status: 400 }
      );
    }

    let newData = {
      useruuid: id,
      layout_uid: uuidv4(),
      platform,
    };

    // SOCIAL MEDIA TYPE
    const socialPlatforms = [
      "facebook",
      "instagram",
      "youtube",
      "twitter",
      "linkedin",
    ];

    if (socialPlatforms.includes(platform.toLowerCase())) {
      newData = {
        ...newData,
        platform_Tittle: body.platform_Tittle,
        platform_link: body.platform_link,
        platform_logo: body.platform_logo,
        platform_clicks: 0,
        layout_active: true,
        layout_color: body.layout_color || "",
      };
    }

    // SHOP TYPE
    else if (platform.toLowerCase() === "shop") {
      newData = {
        ...newData,
        product_id: body.product_id,
        product_title: body.product_title,
        product_price: body.product_price,
        product_thubnail: body.product_thubnail,
        product_images: body.product_images || [],
        product_link: body.product_link,
      };
    }

    // APP TYPE
    else if (platform.toLowerCase() === "app") {
      newData = {
        ...newData,
        App_id: body.App_id,
        App_Name: body.App_Name,
        App_Logo: body.App_Logo,
        App_Link: body.App_Link,
        App_Description: body.App_Description,
      };
    }

    // WRONG PLATFORM
    else {
      return new Response(
        JSON.stringify({ message: "Invalid platform type" }),
        {
          status: 400,
        }
      );
    }

    // SAVE TO DB
    const saved = await Layout.create(newData);

    return new Response(JSON.stringify({ message: "Success", data: saved }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating layout data:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
