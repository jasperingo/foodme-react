
export default function makeHeaders(authHeader = {}, content = 'application/json') {
  return {
    ...authHeader,
    'Content-Type': content
  };
}