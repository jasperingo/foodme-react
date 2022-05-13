
export default class Category {

  static TYPE_PRODUCT = 'product';

  static TYPE_STORE = 'store';

  static getTypes() {
    return [
      Category.TYPE_STORE,
      Category.TYPE_PRODUCT,
    ];
  }

}
