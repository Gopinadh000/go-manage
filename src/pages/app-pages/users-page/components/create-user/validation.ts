export const validateUserField = (
  field: string,
  value: unknown
): string => {
  switch (field) {
    case "firstName":
      if (!value || !String(value).trim()) {
        return "First name is required";
      }

      if (String(value).trim().length < 2) {
        return "First name must be at least 2 characters";
      }

      return "";

    case "lastName":
      if (!value || !String(value).trim()) {
        return "Last name is required";
      }

      if (String(value).trim().length < 2) {
        return "Last name must be at least 2 characters";
      }

      return "";

    case "email": {
      if (!value || !String(value).trim()) {
        return "Email is required";
      }

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(String(value))) {
        return "Enter a valid email address";
      }

      return "";
    }

    case "role":
      if (!value || value === 0) {
        return "Please select a role";
      }

      return "";

    case "dob":
      if (!value) {
        return "Date of birth is required";
      }

      return "";

    default:
      return "";
  }
};