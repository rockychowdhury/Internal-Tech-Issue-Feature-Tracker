export const ResponseMessages = {
    // Authentication
    LOGIN_SUCCESS: "Login successful",
    LOGOUT_SUCCESS: "Logout successful",
    REGISTRATION_SUCCESS: "User registered successfully",
    PASSWORD_CHANGED: "Password changed successfully",
    TOKEN_REFRESHED: "Tokens refreshed successfully",

    // Profile
    PROFILE_UPDATED: "Profile updated successfully",
    PROFILE_RETRIEVED: "Profile retrieved successfully",

    // General
    CREATED_SUCCESS: "Created successfully",
    UPDATED_SUCCESS: "Updated successfully",
    DELETED_SUCCESS: "Deleted successfully",
    RETRIEVED_SUCCESS: "Data retrieved successfully",

    // Errors
    INVALID_CREDENTIALS: "Invalid email or password",
    MISSING_CREDENTIALS: "Email and password are required",
    UNAUTHORIZED: "You are not authorized to perform this action",
    NOT_FOUND: "Resource not found",
    VALIDATION_ERROR: "Validation error occurred",
    ACCOUNT_DISABLED: "Account is disabled",
    TOKEN_EXPIRED: "Token has expired",
    TOKEN_INVALID: "Invalid token",
    OLD_PASSWORD_INCORRECT: "The old password is incorrect",
    AUTHENTICATION_FAILED: "Authentication failed",
    PERMISSION_DENIED: "Permission denied",
    SERVER_ERROR: "An internal server error occurred",
    BAD_REQUEST: "Bad request",
    USER_ALREADY_EXISTS: "A user with this email already exists",
    EMAIL_NOT_VERIFIED: "Email address is not verified",
    TOKEN_REFRESH_FAILED: "Token refresh failed",
    TOKEN_VALIDATION_FAILED: "Token validation failed",
    USER_NOT_FOUND: "User not found",
} as const;