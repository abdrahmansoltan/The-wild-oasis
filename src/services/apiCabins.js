import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
  // Upload image to bucket
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', ''); // Create unique name for image + remove slashes to avoid creating bucket folders
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // Create path to image in bucket
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image); // Upload image to bucket

  // Delete the cabin if the image upload fails
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', newCabin.id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  // Create cabin
  const { data, error } = await supabase.from('cabins').insert({ ...newCabin, image: imagePath });

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}
