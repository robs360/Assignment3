"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class queryBuilders {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        console.log("Search");
        const searchTerm = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm;
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
        console.log("fillter");
        const queryObj = Object.assign({}, this.query);
        const excludeFields = ["searchTerm", "sort", "page", "limit"];
        excludeFields.forEach((el) => delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj);
        return this;
    }
    sort() {
        var _a, _b, _c;
        console.log("Sort");
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(",")) === null || _c === void 0 ? void 0 : _c.join(" ")) || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    sortOrder() {
        var _a;
        console.log("Ordersort");
        const sortOrder = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sortOrder);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit);
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
}
exports.default = queryBuilders;
