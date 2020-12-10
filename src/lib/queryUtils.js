function checkId(id, res) {
  if (!id) {
    res.status(400);
    throw new Error('invalid id');
  }
  const newId = Number(id);
  if (Number.isNaN(newId)) {
    res.status(400);
    throw new Error('invalid id');
  }
  return true;
}

module.exports = {
  checkId,
};
