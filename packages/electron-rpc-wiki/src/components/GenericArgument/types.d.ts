/** Generic argument signature */
export interface GenericArgumentData {
    /** Name of argument */
    name: string;
    /** Description of argument */
    description: string;
    /** Base type of generic argument */
    extendsType?: string;
    /** Default type of generic argument */
    defaultType?: string;
}

/** "GenericArgument" template component properties */
export interface GenericArgumentTemplateProps extends GenericArgumentData {
    /** CSS class (for "styled-components") */
    className?: string;
}
