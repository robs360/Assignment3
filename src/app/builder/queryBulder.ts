import { FilterQuery, Query } from "mongoose";

class queryBuilders<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    console.log("Search")
    const searchTerm = this?.query?.searchTerm;
    const orConditions = searchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    }));
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: orConditions,
      });
    }

    return this;
  }

  filter() {
    console.log("fillter")
    const queryObj = { ...this.query };
    const excludeFields = ["searchTerm", "sort", "page", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    console.log("Sort")
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  sortOrder() {
    console.log("Ordersort")
    const sortOrder = this?.query?.sortBy || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sortOrder as string);
    return this;
  }
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit);
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}

export default queryBuilders;