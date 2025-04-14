// database.js
let items = [];

module.exports = {
  getAll: () => items,
  getById: (id) => items.find(item => item.id === id),
  create: (item) => {
    items.push(item);
    return item;
  },
  update: (id, updatedItem) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedItem };
      return items[index];
    }
    return null;
  },
  delete: (id) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
      return items.splice(index, 1)[0];
    }
    return null;
  }
};
