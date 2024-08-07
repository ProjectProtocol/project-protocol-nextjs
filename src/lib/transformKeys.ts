import { isArray, isObject, snakeCase, transform } from "lodash-es";

/**
 * Transforms all keys of an object or array of objects using the given
 * `transformMethod`.
 *
 * e.g.
 *   transformKeys({ no_step_snek: true }, camelCase)
 *     => { noStepSnek: true }
 */
const transformKeys = (
  obj: Record<string, unknown>,
  transformMethod: (s: string) => string
) =>
  transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : transformMethod(key);
      result[camelKey] = isObject(value)
        ? transformKeys(value as Record<string, unknown>, transformMethod)
        : value;
    }
  );

export const snakeCaseKeys = (obj: Record<string, unknown>) =>
  transformKeys(obj, snakeCase);

export default transformKeys;
