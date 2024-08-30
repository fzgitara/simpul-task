const BASE_URL = 'https://dummyjson.com'

export const URL = {
  POSTS: BASE_URL + '/posts',
  COMMENTS: id => BASE_URL + `/posts/${id}/comments`,
  USERS: BASE_URL + '/users'
};
