class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await this.model.create(data);
  }

  async bulkCreate(records, options = {}) {
    return await this.model.bulkCreate(records, options);
  }

  async getById(filter = {}) {
    return await this.model.findOne({ where: filter });
  }

  async getOne(filter = {}, order = []) {
    return await this.model.findOne({ where: filter, order: order });
  }

  async getAll(filter = {}, page = 1, limit = 0, order = [], include = []) {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.model.findAndCountAll({ where: filter, limit: limit, offset: offset, order: order, include: include });
    return { data: rows, total_count: count, page, total_pages: limit ? Math.ceil(count / limit) : 1 };
  }

  async update(id, data) {
    const record = await this.getById({id});
    if (!record) return null;
    return await record.update(data);
  }

  async delete(id) {
    const record = await this.getById({id});
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = BaseRepository;