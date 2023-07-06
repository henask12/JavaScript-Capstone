// eslint-disable-next-line import/prefer-default-export
export const postLikes = async (event) => {
  try {
    return await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/c26WXJgsOY60FiNtcTNS/likes', {
      method: 'POST',
      body: JSON.stringify({
        item_id: `${event.target.parentNode.parentNode.parentNode.id}`,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  } catch (error) {
    return error.message;
  }
};