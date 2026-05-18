class HelperUtils {
  static getRandomEmail() {
    const uniqueString = Math.random().toString(36).substring(2, 10);
    return `user_${uniqueString}@mailinator.com`;
  }

  static getRandomName() {
    const uniqueString = Math.random().toString(36).substring(2, 7);
    return `User_${uniqueString}`;
  }

  static getRandomPhoneNumber() {
    const digits = Math.floor(100000000 + Math.random() * 900000000);
    return `9${digits}`;
  }
}

module.exports = { HelperUtils };
