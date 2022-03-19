
export function useMessageMemberGet() {

  return function(chat, userId) {
    return chat.member_one_id === userId ? chat.member_two : chat.member_one;
  }
}
