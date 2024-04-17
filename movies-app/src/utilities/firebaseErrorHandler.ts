function firebaseErrorHandler(errorMessage: string): string {
  switch (errorMessage) {
    case "Firebase: Error (auth/invalid-credential).":
      return "Invalid credentials";
    case "Firebase: Error (auth/invalid-email).":
      return "Invalid email format";
    case "Firebase: Error (auth/missing-password).":
      return "Please enter your password";
    case "Firebase: Error (auth/missing-email).":
      return "Please enter your email";
    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      return "Password should be at least 6 characters";
    default:
      return errorMessage;
  }
}

export default firebaseErrorHandler;
