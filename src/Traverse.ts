import clonedeep from 'lodash.clonedeep'

const defaultOptions: TraverseOptions = {
  delimiter: `.`
}

export interface TraverseOptions {
  delimiter: string
}

/**
 * Transforms JSON-like object by visiting every node on recursive walks.
 */
export class Traverse<T extends Record<string, unknown>, O extends Traverse.Options> {
  #value: T
  #options: O

  public constructor(value: T)
  public constructor(value: T, options: O = defaultOptions as O) {
    this.#value = value
    this.#options = options
  }

  public get value(): T {
    return clonedeep(this.#value)
  }

  /**
   * Returns the options was used to construct a traverser.
   *
   * Note that the returned value is unreferenced to the origin, which means
   * modifying the returned value does not affect any result from the origin.
   *
   * @return The options was used to construct a traverser.
   */
  public get options(): O {
    return clonedeep(this.#options)
  }

  /**
   * Gets the element at the path which type is array or string.
   *
   * @example
   * ```ts
   * const traverser = new Traverse({ a: 10 })
   *
   * assert.equal(traverser.get('a'), 10)
   * assert.equal(traverser.get('b'), null)
   * ```
   * @example
   * ```ts
   * const traverser = new Traverse({ b: { c: 20 } })
   *
   * assert.equal(traverser.get('b.c'), 20)
   * assert.equal(traverser.get(['b', 'c']), 20)
   *
   * assert.equal(traverser.get('b.d'), null)
   * assert.equal(traverser.get(['e', 'f']), null)
   * ```
   */
  public get<U>(node: string | string[]): U | null {
    if (Array.isArray(node)) {
      const flattenNodes = node.flat(Number.POSITIVE_INFINITY)
      let lastVisitedNode: T | null = this.value as T | null

      for (const node of flattenNodes) {
        if (!lastVisitedNode || !Reflect.has(lastVisitedNode, node)) {
          lastVisitedNode = null
          break
        }

        lastVisitedNode = lastVisitedNode[node] as T | null
      }

      return lastVisitedNode as U | null
    }

    return this.get(node.split(this.options.delimiter))
  }

  public has(node: string | string[]): boolean {
    return this.get(node) != null
  }

  public set<U>(node: string | string[], value: U): U {
    if (Array.isArray(node)) {
      const flattenNodes = node.flat(Number.POSITIVE_INFINITY)
      const lastNode = flattenNodes.pop()!
      let lastVisitedNode = this.#value

      for (const node of flattenNodes) {
        if (!Reflect.has(lastVisitedNode, node)) {
          Reflect.set(lastVisitedNode, node, {})
        }

        lastVisitedNode = Reflect.get(lastVisitedNode, node) as T
      }

      Reflect.set(lastVisitedNode, lastNode, value)
      return value
    }

    return this.set(node.split(this.options.delimiter), value)
  }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Traverse {
  export type Options = TraverseOptions
}
