type Type<T> = T extends (infer U)[] ? U : T;
