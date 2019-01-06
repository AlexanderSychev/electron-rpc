import * as React from 'react';
import styled from 'styled-components';

import { GenericArgumentTemplateProps } from './types';

export const GenericArgumentTemplate: React.SFC<GenericArgumentTemplateProps> = ({
    className,
    name,
    description,
    extendsType = '-',
    defaultType = '-'
}: GenericArgumentTemplateProps): JSX.Element => <Root className={className}>
    <Cell>{name}</Cell>
    <Cell>{description}</Cell>
    <Cell>{extendsType}</Cell>
    <Cell>{defaultType}</Cell>
</Root>;

const Root = styled.tr``;

const Cell = styled.td``;
