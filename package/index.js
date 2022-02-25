/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => "hello world";

exports.stripPrivateProperties = (privateProperties = [], objList = []) => {
  if (!privateProperties || privateProperties.length === 0) {
    return objList;
  }
  return objList.map((obj) => {
    privateProperties.forEach(
      (privatePropertie) => delete obj[privatePropertie]
    );
    return obj;
  });
};
exports.excludeByProperty = (propertyToExclude, objList) => {
  if (!propertyToExclude) return objList;

  return objList.filter((obj) => !Object.keys(obj).includes(propertyToExclude));
};
exports.sumDeep = (objList = []) => {
  return objList.map((entity) => {
    return {
      objects: entity.objects.reduce((pre, cur) => {
        return { val: pre.val + cur.val };
      }).val,
    };
  });
};
exports.applyStatusColor = (colourStatusMapping = {}, statusList = []) => {
  return statusList.filter((entity) => {
    for (let color of Object.keys(colourStatusMapping)) {
      if (colourStatusMapping[color].includes(entity.status)) {
        entity.color = color;
      }
    }

    return !!entity.color;
  });
};

exports.createGreeting = (greeter, greeting) => {
  return (personName) => greeter(greeting, personName);
};
exports.setDefaults = (defaultProps = {}) => {
  return (obj) => Object.assign({}, defaultProps, obj);
};
exports.fetchUserByNameAndUsersCompany = (username, services) => {
  return new Promise((resolve) => {
    services.fetchUsers().then((users) => {
      let user = users.find((user) => user.name == username);
      Promise.all([
        services.fetchCompanyById(user.companyId),
        services.fetchStatus(),
      ]).then((result) => {
        resolve({ company: result[0], user, status: result[1] });
      });
    });
  });
};
