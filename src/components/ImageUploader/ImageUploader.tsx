import axios from "axios";

const uploadImage = async (img: File) => {
  try {
    let formData = new FormData();
    formData.append('image', img);

  
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=9f37c59aee0d043b16ae697f3841385d`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    let imageUrl = data.data.display_url;
    let deleteUrl = data.data.delete_url;
    return { imageUrl, deleteUrl };
  } catch (error) {
    console.log(error, "error");
    return null;
  }
};

export default uploadImage;
