// typescript magic

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
// picked property can be optional
// type OptionalEmailUser = Optional<User, 'email'>;

type Only<T, U> = {
    [P in keyof T]: T[P]
} & {
    [P in keyof U]?: never
}
export type Either<T, U> = Only<T, U> | Only<U, T>
// either of the two types
// type UserOrAdmin = Either<User, Admin>
