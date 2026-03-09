
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async bulkCreate(records) {
    return this.model.insertMany(records);
  }

  async getById(id, populate = '') {
    return this.model.findById(id).populate(populate);
  }

  async getOne(filter = {}, populate = '') {
    return this.model.findOne(filter).populate(populate);
  }

  async getAll(filter = {}, page = 1, limit = 20, sort = { createdAt: -1 }, populate = '') {
    const skip = (page - 1) * limit;

    // Run both queries in parallel — no reason to wait on count before fetching
    const [data, total_count] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(limit).populate(populate),
      this.model.countDocuments(filter),
    ]);

    return {
      data,
      total_count,
      page,
      total_pages: limit ? Math.ceil(total_count / limit) : 1,
    };
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
  }

  async delete(id) {
    const deleted = await this.model.findByIdAndDelete(id);
    return deleted ? true : null;
  }
}

module.exports = BaseRepository;