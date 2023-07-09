import instance from "./instance";

const info = () => instance.auth.get(`/member/info`);
const updateLink = (data) => instance.auth.post(`/member/edit`, data);
const updateProfile = (data) => instance.authwithFile.post(`/member/edit`, data);
const bioLink = (username, search) => instance.auth.get(`/${username}?q=${search}`)
const listMember = (search) => instance.auth.get(`/members?q=${search}`)
const updateLimit = (id, data) => instance.auth.put(`/member/${id}/limit`, data);


const apiMember = {
  info,
  updateLink,
  updateProfile,
  bioLink,
  listMember,
  updateLimit
};

export default apiMember;
