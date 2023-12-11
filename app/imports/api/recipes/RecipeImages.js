import { FilesCollection } from 'meteor/ostrio:files';

export const RecipeImages = new FilesCollection({
  collectionName: 'RecipeImages',
  allowClientCode: false, // Disallow client operations on files collection
  storagePath: 'assets/app/uploads/recipeImages', // Path to store uploaded files on the server
  downloadRoute: '/recipeImages', // URL endpoint to serve uploaded files
  throttle: false, // Disable throttling of file uploads
  chunkSize: 64 * 1024, // Size of file upload chunks (64 KB in this example)
  permissions: 0o755, // Permissions for uploaded files on the server
  parentDirPermissions: 0o755, // Permissions for parent directories on the server
  cacheControl: 'public, max-age=31536000', // Cache control header for uploaded files
});
