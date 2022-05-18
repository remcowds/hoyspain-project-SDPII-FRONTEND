import React, { useCallback, useContext, useState } from 'react'
import Title from '../Components/Extra components/Title'
import { useSession } from '../contexts/AuthProvider';
import { ImageContext } from '../contexts/ImageProvider';

const Testpage = () => {
  const [formdata, setFormData] = useState();
	const { POSTImage } = useContext(ImageContext);
  const { token } = useSession();
  

  const handleSubmit = useCallback(async () => {
    POSTImage({formdata, token});
  }, [formdata, POSTImage, token]);


  const handleFileChange = useCallback(async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append(`uploadedImages`, e.target.files[i])
    }
    setFormData(formData)
  }, [])

  return (
    <>
      <Title title="Test" description="idk"/>
      <form onSubmit={handleSubmit}>
      <input type="file" name="files" multiple id="idk" onChange={(e) => handleFileChange(e)}/>
      <button type="submit" className="bg-red-400 px-2 py-1 rounded-lg">Post</button>
      </form>
    </>
  )
}

export default Testpage