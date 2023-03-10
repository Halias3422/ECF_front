export const API_ROUTES = {
  dishes: {
    createNewDish: '/api/create-new-dish',
    getAllDishesByCategories: '/api/get-all-dishes-by-categories',
  },
  dishesGallery: {
    getAllDishes: '/api/get-all-dishes-gallery',
    getDishImageByName: '/api/get-dish-image-by-name',
    deleteDishGalleryItem: '/api/delete-dish-gallery-item',
    createNewDishGalleryItem: '/api/create-new-dish-gallery-item',
    saveDishGalleryImage: '/api/save-dish-gallery-image',
    modifyDishGalleryItem: '/api/modify-dish-gallery-item',
    deleteImage: '/api/delete-dish-gallery-image',
    verifyIfDuplicateTitleOrImage:
      '/api/dish-gallery-verify-duplicate-title-or-image',
  },
  schedule: {
    getWeekSchedule: '/api/get-week-schedule',
  },
  menus: {
    getAllMenus: '/api/get-all-menus',
  },
  users: {
    login: '/api/user-login',
    signup: '/api/user-signup',
    updateOptionalInfo: '/api/user-update-optional-info',
    getOptionalInfo: '/api/user-get-optional-info',
    getUserRole: '/api/user-get-role',
  },
};
