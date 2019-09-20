module.exports = {
  isNumerical,
};

function isNumerical(data) {
  let numeric = /^[0-9]+$/;

  if (data.toString().match(numeric))
    return true;
  else
    return false;
}
