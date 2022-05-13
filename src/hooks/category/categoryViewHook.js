import Category from '../../models/Category';

export function useCategoryTypeText() {
  return function(type) {
    switch(type) {

      case Category.TYPE_STORE:
        return '_store.Store';

      case Category.TYPE_PRODUCT:
        return '_product.Product';

      default:
        return type;
    }
  }
}
