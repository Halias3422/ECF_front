export const API_ROUTES = {
  dishes: {
    createNewDish: '/api/create-new-dish',
    getAllDishesByCategories: '/api/get-all-dishes-by-categories',
    deleteDishItem: '/api/delete-dish',
    deleteImage: '/api/delete-dish-image',
    verifyIfDuplicateTitleOrImage: '/api/dish-verify-duplicate-title-or-image',
    saveDishImage: '/api/save-dish-image',
    modifyDishItem: '/api/modify-dish-item',
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
    modifyWeekSchedule: '/api/modify-week-schedule',
  },
  menus: {
    getAllMenus: '/api/get-all-menus',
    modifyMenu: '/api/modify-menu',
    deleteMenu: '/api/delete-menu',
    createNewMenu: '/api/create-new-menu',
  },
  formulas: {
    deleteFormula: '/api/delete-formula',
    modifyFormula: '/api/modify-formula',
  },
  users: {
    login: '/api/user-login',
    signup: '/api/user-signup',
    updateOptionalInfo: '/api/user-update-optional-info',
    getOptionalInfo: '/api/user-get-optional-info',
    getUserRole: '/api/user-get-role',
    updateMail: '/api/user-update-mail',
    updatePassword: '/api/user-update-password',
    getAuthenticatedProtectedUserFromSession:
      '/api/get-authenticated-protected-user-from-session',
  },
  categories: {
    getAllCategories: '/api/get-all-categories',
    createNewCategory: '/api/create-new-category',
    deleteCategory: '/api/delete-category',
    modifyCategory: '/api/modify-category',
  },
  reservations: {
    getAllPartialReservationsByDate:
      '/api/get-all-partial-reservations-by-date',
    getAllReservationsWithAssociatedMail:
      '/api/get-all-reservations-with-associated-mail',
    createReservation: '/api/create-reservation',
    getUserReservations: '/api/get-user-reservations',
  },
  restaurant: {
    getSeatsCapacity: '/api/get-seats-capacity',
    modifySeatsCapacity: '/api/modify-seats-capacity',
  },
};
