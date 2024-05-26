import { Avatar } from "../models/avatars.js"

const insertDefaultAvatars = async () => {
  try {
    const count = await Avatar.countDocuments();
    if (count === 0) {
      const defaultAvatars = [
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716717633/bussiness-man_dovbg3.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716717633/man_opjwes.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716714602/7074311_3554557_befq66.svg" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045783/7724116_female_mongolian_skin_woman_diversity_nationality_icon_vgtohr.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045462/4043256_indian_male_man_person_icon_d3jliy.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045462/4043250_avatar_child_girl_kid_icon_z4c38h.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045462/4043262_avatar_man_muslim_icon_pkzlbd.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045462/403019_avatar_male_man_person_user_icon_r1hxof.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045462/628297_avatar_grandmother_mature_old_person_icon_mcutu0.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045461/4043248_avatar_female_portrait_woman_icon_u22xx3.png" },
        { link: "https://res.cloudinary.com/shubham-node/image/upload/v1716045461/403024_avatar_boy_male_user_young_icon_nxnpyu.png" },
      ];
      await Avatar.insertMany(defaultAvatars);
      console.log("Default avatars inserted successfully");
    } else {
      console.log("Avatars collection already initialized.");
    }
  } catch (error) {
    console.error("Error inserting default avatars:", error);
  }
};

export default insertDefaultAvatars;