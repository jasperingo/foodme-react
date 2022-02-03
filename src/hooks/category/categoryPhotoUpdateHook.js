import CategoryRepository from "../../repositories/CategoryRepository";


export function useCategoryPhotoUpdate(id, photo, userToken, onSuccess, onError) {

  return ()=> {

    const form = new FormData();
    form.append('photo', photo);
    
    const api = new CategoryRepository(userToken, null);
  
    api.updatePhoto(id, form)

    .then(onSuccess)
    .catch(onError);
  }
}
