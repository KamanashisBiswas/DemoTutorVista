const jwt = require("jsonwebtoken");

class JWTUtil {
  // Generate access token
  static generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
      issuer: "auth-server",
      audience: "auth-client",
    });
  }

  // Generate refresh token
  static generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
      issuer: "auth-server",
      audience: "auth-client",
    });
  }

  // Verify token
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET, {
        issuer: "auth-server",
        audience: "auth-client",
      });
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  // Decode token without verification (for debugging)
  static decodeToken(token) {
    return jwt.decode(token);
  }

  // Extract token from Bearer format
  static extractBearerToken(authHeader) {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    return authHeader.substring(7);
  }

  // Generate token pair
  static generateTokenPair(userId, email, role = "user") {
    const payload = {
      id: userId,
      email: email,
      role: role,
    };

    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
      expiresIn: process.env.JWT_EXPIRE || "7d",
    };
  }
}

module.exports = JWTUtil;
