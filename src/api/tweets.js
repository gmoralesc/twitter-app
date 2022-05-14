import http from './http';

function transformTweet(item) {
  return {
    id: item._id,
    content: item.content,
    date: item.createdAt,
    user: {
      name: item.userId ? item.userId.name : 'Unknown',
      username: item.userId ? item.userId.username : 'Unknown',
    },
  };
}

export function getTweets() {
  return http.get(`/tweets?direction=desc`).then(({ data: json }) => {
    const transformData = json.data.map(function (item) {
      return transformTweet(item);
    });

    return {
      data: transformData,
      meta: json.meta,
    };
  });
}

export function getTweet({ id }) {
  return http
    .get(`/tweets/${id}`)
    .then(({ data: json }) => transformTweet(json.data));
}

export function createTweet(payload) {
  return http
    .post(`/tweets/`, payload)
    .then(({ data: json }) => transformTweet(json.data));
}
