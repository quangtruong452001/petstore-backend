// import { pickBy } from 'lodash';
import mongoose from 'mongoose';
import {
  // productQuery,
  productSort,
} from './type';

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
  const { name, categories, minPrice, maxPrice, ...rest } =
    filters;

  const query: any = {};
  // $or = [];
  if (name) {
    // query.name = generateTextSearch(name);
    query.name = new RegExp(name, 'i');
  }
  if (categories) {
    query.categories = new mongoose.Types.ObjectId(
      categories,
    );
  }
  if (minPrice && maxPrice) {
    query.price = {
      $gte: minPrice,
      $lte: maxPrice,
    };
  } else if (maxPrice) {
    query.price = {
      $lte: maxPrice,
    };
  } else if (minPrice) {
    query.price = {
      $gte: minPrice,
    };
  }
  // if (minPrice && maxPrice) {
  //   $or.push(
  //     ...[
  //       {
  //         ['price']: {
  //           $gte: minPrice,
  //           $lte: maxPrice,
  //         },
  //       },
  //     ],
  //   );
  // } else if (minPrice) {
  //   $or.push(
  //     ...[
  //       {
  //         ['price']: {
  //           $gte: minPrice,
  //         },
  //       },
  //     ],
  //   );
  // } else {
  //   $or.push(
  //     ...[
  //       {
  //         ['price']: {
  //           $lte: maxPrice,
  //         },
  //       },
  //     ],
  //   );
  // }
  // if ($or.length) {
  //   query.$or = $or;
  // }
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
  if (orderBy === 'priceDesc') {
    sort.price = 'desc';
  }
  if (orderBy === 'date') {
    sort.createdAt = 1;
  }
  return { ...sort };
}

export function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}
