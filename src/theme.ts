import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Flex: {
            variants: {
                Primary: {
                    bg: "gray.300",
                    color: "black",
                },
                Secondary: {
                    bg: "gray.500",
                    color: "#fff",
                },
            },
        },
    },
});

export const primaryTheme = {
    colorType: 'Primary',
    title: 'black',
    background: "gray.300",
    innerContainer: "#FFFFFF",
    color: {
        textBg: "gray.300",
        textColor: "#272525"
    }
};

export const secondaryTheme = {
    colorType: 'secondary',
    title: '#FFFF',
    background: "gray.500",
    innerContainer: "gray.300",
    color: {
        textBg: "gray.500",
        textColor: "#fff"
    }
};

export default theme;
