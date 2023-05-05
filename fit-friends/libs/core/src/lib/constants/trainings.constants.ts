export const TrainingsErrorMessage = {
  ReviewLengthNotValid: 'Review text min length is 100, max length is 1024 symbols',
  TrainingTitleLengthNotValid: 'Title min length is 1, max length is 15 symbols',
  TrainingDescriptionLengthNotValid: 'Training description min length is 10, max length is 140 symbols',
} as const;

export const VideoType = /.(mov|avi|mp4)$/;
