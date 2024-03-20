import http from './http'
//----------------------------------

export const CreateAds = async (payload) => {
  const { data } = await http.post(`/ads`, payload)
  return data
}
export const GetAds = async (cat) => {
  const { data } = await http.get(`/ads?category=${cat}`)
  return data
}
