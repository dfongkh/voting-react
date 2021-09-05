import axios from "axios";

const host = "http://localhost:5000";

export const putVote = async (id, data) => {
  return await axios
    .put(`${host}/campaign/${id}`, data)
    // .then((res) => {
    //   // Code for handling the response
    //   res.json();
    // })
    .then((res) => {
      // Code for handling the response
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      // Code for handling the error
      // console.log(error.response);
      // return error.response;
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      }
      return error;
    });
};

export const postCampaign = async (data) => {
  return await axios
    .post(`${host}/campaign`, data)
    // .then((res) => {
    //   // Code for handling the response
    //   res.json();
    // })
    .then((res) => {
      // Code for handling the response
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      // Code for handling the error
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      }
      return error;
    });
};

export const getAllCampaign = async () => {
  return await axios
    .get(`${host}/campaign`)
    .then((res) => {
      // Code for handling the response
      console.log(res.data.data);
      return res.data.data;
    })
    .catch((error) => {
      // Code for handling the error
      console.log(error);
    });
};

export const getCampaign = async (id) => {
  return await axios
    .get(`${host}/campaign/${id}`)
    .then((res) => {
      // Code for handling the response
      return res.data.data;
    })
    .catch((error) => {
      // Code for handling the error
      console.log(error);
    });
};
