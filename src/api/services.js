import request from "@/utils/request";

export function cityGuess(){
  return request({
    url: `/elm/v1/cities?type=guess`,
  })
}
