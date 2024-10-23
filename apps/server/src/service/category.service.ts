import { Category } from '@imperial-kitchen/types';
import prisma from '../dao/index.ts';

export default class CategoryService {
  constructor() {}

  async getAllCategories() {
    const res = await prisma.category.findMany({});
    console.log(res);

    const categoryMap = new Map<number, Category>();

    // res.rows.forEach((row) => {
    //   const categoryId = Number(row.category_id);
    //   if (!categoryMap.has(categoryId)) {
    //     categoryMap.set(categoryId, {
    //       id: categoryId,
    //       name: String(row.category_name),
    //       description: String(row.category_description),
    //       goods: []
    //     });
    //   }

    //   if (row.good_id) {
    //     categoryMap.get(categoryId)?.goods?.push({
    //       id: Number(row.good_id),
    //       name: String(row.good_name),
    //       price: Number(row.good_price),
    //       categoryId: categoryId,
    //       description: row.good_description ? String(row.good_description) : undefined
    //     });
    //   }
    // });

    return Array.from(categoryMap.values());
  }

  async createCategory(name: string) {
    console.log(name, 'createCategory');
  }

  async deleteCategory(id: number) {
    console.log(id, 'deleteCategory');
  }
}
