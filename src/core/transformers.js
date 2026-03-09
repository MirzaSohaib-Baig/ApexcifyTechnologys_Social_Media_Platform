const {User} = require("../models");

const transformUser = (user = User) => {
    return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        image: user.image,
        facebook_id: user.facebook_id,
        x_id: user.x_id,
        linkedin_id: user.linkedin_id,
        instagram_id: user.instagram_id,
        country: user.country,
        city_state: user.city_state,
        postal_code: user.postal_code,
        tax_id: user.tax_id,
        created_at: user.createdAt
    };
};

module.exports = { transformUser };