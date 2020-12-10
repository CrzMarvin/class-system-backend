function checkIdIsNumber(id, res) {
  if (!id) {
    res.status(404);
    throw new Error('invalid id');
  }
  const newId = Number(id);
  if (Number.isNaN(newId)) {
    res.status(404);
    throw new Error('invalid id');
  }
  return true;
}

module.exports = {
  checkIdIsNumber,
};
