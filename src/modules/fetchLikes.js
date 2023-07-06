export const fetchLikes = async () => {
    try {
      return await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/c26WXJgsOY60FiNtcTNS/likes',{
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => response.json());
    } catch (error) {
      return error.message;
    }
  };
