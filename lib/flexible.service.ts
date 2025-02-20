import MixedInterface from "./mixed.interface";

/**
 * Helper that allow to store or retrieve value from nested object using its `propertyPath`. Use `MixedInterface` as a properties tree.
 */
class FlexibleService {
    /**
     * Store a value in object at property specified by `propertyPath`. If some nested nodes are undefined, they'll be created.
     * @param propertyPath - the path to store value like "object.nestedA.nestedB.myProperty"
     * @param value - value to store
     * @param instance - source object
     * @param separator - separator in proprerty path. If separator equals to "#", the path "object#propA#propB" will be resolved as "object.propA.propB".
     * @throws Error - "Invalid instance id" if propertyPath is malformated (no string between two separators) aka "a.b..c"
     */
    set(propertyPath: string, value: any, instance: MixedInterface, separator:string = '.') {
        const tokens = propertyPath.split(separator);

        let node: MixedInterface = instance;
        let lastNode = instance;
        let lastToken;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            if (token.length === 0) {
                throw `Invalid instance id`;
            }

            if (typeof node[token] === 'undefined') {
                node[token] = {};
            }

            lastNode = node;
            node = node[token];
            lastToken = token;
        }

        // @ts-ignore
        lastNode[lastToken] = value;
        return instance;
    }

    /**
     * Retrieve a value from object at property specified by `propertyPath`.
     * @param propertyPath - the path to store value like "object.nestedA.nestedB.myProperty"
     * @param instance - source object
     * @param separator - separator in proprerty path. If separator equals to "#", the path "object#propA#propB" will be resolved as "object.propA.propB".
     * @throws Error - "Invalid instance id" if propertyPath is malformated (no string between two separators) aka "a.b..c"
     * @return {any | null}  if the following property was found, value is return, null instead
     */
    get(propertyPath: string, instance: object, separator: string = '.') : any | null {
        const tokens = propertyPath.split(separator);

        let node = instance;

        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];

            if (token.length === 0) {
                throw `Invalid instance id`;
            }

            // @ts-ignore
            if (typeof node[token] === 'undefined') {
                return null;
            }

            // @ts-ignore
            node = node[token];
        }

        return node;
    }
}

export default FlexibleService;