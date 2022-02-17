import {Observable} from "rxjs";



export type StrictExtract<T, U> = T extends unknown ? U extends T ? T extends U ? T : never : never : never;

type _StrictExcludeInner<T, U> = 0 extends (
    U extends unknown ? [T] extends [U] ? [U] extends [T] ? 0 : never : never : never
    ) ? never : T;

export type StrictExclude<T, U> = T extends unknown ? _StrictExcludeInner<T, U> : never;


export type IfElse<Condition extends boolean, TrueType, FalseType> = Condition extends true ? TrueType : FalseType;

export type Not<T extends boolean> = T extends true ? false : true;

export type DoesExtend<T1, T2, Distributive extends boolean = true> =
    IfElse<
        Distributive,
        (boolean extends T1 ? boolean : T1) extends T2 ? true : false,
        [T1] extends [T2] ? true : false
    >

// @link https://github.com/microsoft/TypeScript/issues/27024#issuecomment-931205995
/*type EqualsWrapped<T> = T extends infer R & {} ?
    { [P in keyof R]: R[P] }
    : never

export type Equals<A, B> =
    (<T>() => T extends EqualsWrapped<A> ? 1 : 2) extends
        (<T>() => T extends EqualsWrapped<B> ? 1 : 2)
        ? true
        : false*/

export type Equals<T1, T2, AllowSubtypeMatch extends boolean = false> =
    IfElse<
        AllowSubtypeMatch,
        DoesExtend<T1, T2>,
        IfElse<DoesExtend<T1, T2, false>, DoesExtend<T2, T1, false>, false>
  >;

export type EqualsNever<T> = [T] extends [never] ? true : false;

export type ReplaceNeverWith<T, U> = IfElse<EqualsNever<T>, U, T>;

export type ReplaceTypeWith<T, U, V> = T extends U ? V : T;

export type ReplaceTypeInTupleWith<T extends unknown[], U, V> = {[P in keyof T] : ReplaceTypeWith<T[P], U, V>}

export type UnwrapObservables<T> = T extends Observable<infer U> ? U : T;

export type TupleToUnion<T extends any[]> = T[number];

export type AddParameterToTuple<T extends [unknown], U extends unknown[] = []> =
    T extends [] ?
        U :
        T extends [infer H] ?
            [H] extends [never] ?
                U :
                Append<T, U> :
            U

export type TupleElementComparison<T1 extends readonly unknown[], T2 extends readonly unknown[]> =
    {[K in keyof T2]: IfElse<Equals<T2[K], T1[K & keyof T1]>, 1, 0>}


// @link https://stackoverflow.com/a/64194372/1798234
export type Prepend<E extends [unknown], A extends any[]> = [...E, ...A]
export type Append<E extends [unknown], A extends any[]> = [...A, ...E]

// @link https://stackoverflow.com/a/64034671/1798234
export type FilterType<T extends unknown[], U = undefined> = T extends [] ? [] :
    T extends [infer H, ...infer R] ?
    [H] extends [U] ? FilterType<R, U> : [H, ...FilterType<R, U>] : T;

// @link https://stackoverflow.com/a/66146785/1798234
export type SetIndexToType<T extends unknown[], I extends number, U = undefined> = {
    [ P in keyof T ] : P extends Exclude<keyof T, keyof any[]> ? P extends `${I}` ? U : T[P] : T[P]
}

export type SpliceTuple<T extends unknown[], I extends number> = FilterType<SetIndexToType<T, I>>;


// @link https://stackoverflow.com/a/67609110/1798234
type _UnionToIntersectionHelper<U> =
    (U extends unknown ?(k: U) => void : never) extends (k: infer I) => void ? I : never;

export type UnionToIntersection<U> = boolean extends U
  ? _UnionToIntersectionHelper<Exclude<U, boolean>> & boolean
  : _UnionToIntersectionHelper<U>;

// @link https://stackoverflow.com/a/50641073/1798234
// If this is a simple type UnionToIntersection<Key> will be the same type, otherwise it will an
// intersection of all types in the union and probably will not extend `Key`
export type NoUnion<Key> = [Key] extends [UnionToIntersection<Key>] ? Key : never;

// @link https://github.com/Microsoft/TypeScript/issues/14829#issuecomment-504042546
export type NoInfer<T> = [T][T extends any ? 0 : never];

// @link https://engineering.tableau.com/really-advanced-typescript-types-c590eee59a12
export type ErrorBrand<Err extends string> = Readonly<{
    [key in Err]: void;
}>;

export type Invalid<T> = { __errMsg: T };

export type TypeGuard<A, B extends A> = (a: A) => a is B;
