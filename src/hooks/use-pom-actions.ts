export type UsePomAction =
  | ["pause"]
  | ["rest"]
  | ["work"]
  | ["set-rest", number]
  | ["set-work", number]
  | ["start-resting"]
  | ["start-working"]
  | ["reset"];
