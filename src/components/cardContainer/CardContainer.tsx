import { Box, Card } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
type Props = {
    children: ReactNode;
    border?: string;
    boxShadow?: string;
    borderRadius?: string;
    background?: string;
    padding?: string;
    width?: string;
    as?: string | boolean;
    cursor?: string,
    height?: string
}
const CardContainer: React.FC<Props> = ({
    children,
    border = '',
    boxShadow = '',
    borderRadius = '',
    background = "",
    padding = "",
    width = "",
    height = '',
    as = true,
    cursor = ''
}) => {
    return (
        <Box
            width={width}
            padding={padding}
            boxShadow={boxShadow}
            borderRadius={borderRadius}
            background={background ? '#F4F4F5' : "white"}
            border={border}
            as={as ? "form" : 'div'}
            height={height}
            cursor={cursor}
        >
            <Card border={'none'} boxShadow={'none'} background={'none'}>
                {children}
            </Card>
        </Box>
    )
}
export default CardContainer;