// import { pickBy } from 'lodash';
import mongoose from 'mongoose';
import { productQuery, productSort } from './type';
import any = jasmine.any;

export function generateTextSearch(value, fts = false) {
  return fts
    ? {
        $text: { $search: value },
      }
    : {
        $regex: value,
        $options: 'i',
      };
}
// export const cleanObject = (originalObject = {}) => {
//   const validArrays = pickBy(
//       originalObject,
//       (e) => Array.isArray(e) && e.length > 0,
//     ),
//     validObjects = pickBy(
//       originalObject,
//       (e) =>
//         e !== undefined &&
//         e !== null &&
//         e !== '' &&
//         !Array.isArray(e) &&
//         typeof e === 'object' &&
//         Object.keys(e).length > 0,
//     ),
//     validProperties = pickBy(
//       originalObject,
//       (e) =>
//         e !== undefined &&
//         e !== null &&
//         e !== '' &&
//         !Array.isArray(e) &&
//         typeof e !== 'object',
//     );
//   return {
//     ...validProperties,
//     ...validArrays,
//     ...validObjects,
//   };
// };

export function handleProductFilters(filters) {
  if (!filters) {
    return {};
  }
  const { name, categories, ...rest } = filters;

  const query: productQuery = {};
  if (name) {
    query.name = generateTextSearch(name);
  }
  if (categories) {
    query.categories = new mongoose.Types.ObjectId(
      categories,
    );
  }
  // console.log({ ...query, ...rest });
  return { ...query, ...rest };
}

export function handleProductSorts(sorts) {
  if (!sorts) {
    return {};
  }
  const { orderBy } = sorts;
  const sort: productSort = {};
  if (orderBy === 'priceAsc') {
    sort.price = 'asc';
  }
  if (orderBy === 'priceDsc') {
    sort.price = 'desc';
  }
  if (orderBy === 'date') {
    sort.createdAt = 1;
  }
  return { ...sort };
}
