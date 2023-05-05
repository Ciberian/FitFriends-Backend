export const UsersErrorMessage = {
  EmailNotValid: 'The email format is not valid',
  PasswordNotValid: 'Password min length is 6, max is 12 symbols',
  NameNotValid: 'The user name not valid',
  NameLengthNotValid: 'Name min length is 1, max length is 15 symbols',
  MeritsLengthNotValid: 'Trainer merits min length is 10, max length is 140 symbols',
  DescriptionLengthNotValid: 'Client description min length is 10, max length is 140 symbols',
  NameMinLengthNotValid: 'Min length for the name is 1 symbol',
  NameMaxLengthNotValid: 'Max length for the name is 15 symbols',
  BirthDateNotValid: 'The user date birth is not valid',
  ImageFormatNotValid: 'Only jpg/jpeg or png format is allowed',
  JWTFormatNotValid: 'Refresh token has wrong format',
} as const;

export const Image = {
  FileMaxSize: 500 * 1024,
  FileType: /.(jpg|jpeg|png)$/,
} as const;
