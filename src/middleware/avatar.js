const axios = require('axios');

const url = process.env.API_URL;

const avatar = async (id) => {
  let image = undefined;

  try {
    const response = await axios.get(`${url}/myAvatars/${id}`, {
      responseType: 'arraybuffer',
    });

    return (image = response.data);
  } catch (error) {
    console.log(error);
  }
  return image;
};

module.exports = avatar;
