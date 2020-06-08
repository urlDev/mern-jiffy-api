const axios = require('axios');

const url = 'https://urldev-mern-jiffy-api.herokuapp.com';

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
