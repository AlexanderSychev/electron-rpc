import * as React from 'react';
import styled from 'styled-components';

import { GenericArgumentsProps } from './types';
import { GenericArgument } from '../GenericArgument';

export const GenericArguments: React.StatelessComponent<GenericArgumentsProps> = ({
    args
}: GenericArgumentsProps): JSX.Element => <Table>
    <Head>
        <HeadLine>
            <HeadCell>
                Name
            </HeadCell>
            <HeadCell>
                Description
            </HeadCell>
            <HeadCell>
                Extends type
            </HeadCell>
            <HeadCell>
                Default type
            </HeadCell>
        </HeadLine>
    </Head>
    <Body>
        {args.map((arg, index) => <GenericArgument key={index} {...arg} />)}
    </Body>
</Table>;

const Table = styled.table``;

const Head = styled.thead``;

const Body = styled.tbody``;

const HeadLine = styled.tr``;

const HeadCell = styled.td``;
