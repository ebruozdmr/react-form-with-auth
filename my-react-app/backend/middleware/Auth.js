const jwt = require("jsonwebtoken");
const Auth = require("../models/Auth");

// Verify Token Middleware
// asenkron bir işlem
/* next parametresi, bir sonraki middleware fonksiyonuna geçilmesi için kullanılan standart bir fonksiyondur.  */
const verifyToken = async (req, res, next) => {
  // token cookie'den alınacak.
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Lütfen giriş yapınız!" });
  }

  const decodedToken = jwt.verify(
    token,
    "1af1775e0ded8baf2abd3b1e328d1e6878c5b60da53937c90ebca1da1f94157550f0364ecbc825e387283c3a2481c09274c71550c16c6175c8b0b25bfa898829"
  );
  if (!decodedToken) {
    return res.status(401).json({ message: "Token doğrulama başarısız!" });
  }
  req.user = await Auth.findById(decodedToken.id);
  next();
};

// spread operatörü sayesinde dinamik olarak birden fazla değeri bir array içerisinde toplayabiliriz.
// ...roles => (spread operatörü ??????)
const roleChecked = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Yetkisiz erişim!" });
    }
    next();
  };
};

module.exports = { verifyToken, roleChecked };
