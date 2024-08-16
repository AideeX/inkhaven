import { Skeleton, Box, Flex, SimpleGrid } from '@chakra-ui/react';

export function HeroSkeleton() {
    return (
        <Box position="relative" h="100vh" w="full" shadow="lg">
            <Skeleton position="absolute" inset="0" h="full" w="full" />
            <Box zIndex="10" position="relative" display="flex" flexDirection="column" alignItems="center" h="full" px="8" pt="20" w={{ md: "50%" }}>
                <Skeleton height="12" width="75%" mb="4" />
                <Skeleton height="8" width="50%" mb="4" />
                <Skeleton height="6" width="67%" mb="4" />
                <Skeleton height="10" width="33%" mb="4" />
            </Box>
        </Box>
    );
}

export function AboutSkeleton() {
    return (
        <Box bg="light.secondaryBg" p="8" shadow="lg" mt="8">
            <Skeleton height="8" width="50%" mb="4" mx="auto" />
            <Skeleton height="6" width="full" mb="4" />
            <Skeleton height="6" width="75%" mb="4" />
            <Skeleton height="6" width="67%" mb="4" />
            <Skeleton height="6" width="50%" mb="4" alignSelf="end" />
        </Box>
    );
}

export function FeaturesSkeleton() {
    return (
        <Box bg="light.primary" py="16">
            <Box maxW="7xl" mx="auto" px={{ base: "4", lg: "8" }}>
                <Skeleton height="8" width="50%" mb="8" mx="auto" />
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">
                    {[...Array(4)].map((_, idx) => (
                        <Box key={idx} p="6" bg="light.secondaryBg" borderRadius="lg" shadow="lg">
                            <Skeleton height="12" width="12" mx="auto" mb="4" />
                            <Skeleton height="6" width="50%" mx="auto" mb="2" />
                            <Skeleton height="4" width="75%" mx="auto" mb="2" />
                            <Skeleton height="4" width="67%" mx="auto" mb="2" />
                            <Skeleton height="4" width="50%" mx="auto" mb="2" />
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
}

export function LandingPageSkeleton() {
    return (
        <Box bg="light.primary" h="full">
            <Box as="main" display="flex" flexDirection="column" h="screen" px="2">
                <HeroSkeleton />
                <AboutSkeleton />
                <FeaturesSkeleton />
            </Box>
        </Box>
    );
}

export function TagSelectionSkeleton() {
    return (
        <Box bg="gray.100" p="2" shadow="sm" borderRadius="xl" overflow="hidden" position="relative">
            <Flex p="4">
                <Skeleton height="5" width="5" borderRadius="md" bg="gray.200" />
                <Skeleton ml="2" height="6" width="16" borderRadius="md" bg="gray.200" />
            </Flex>
            <Flex alignItems="center" justifyContent="center" bg="white" px="4" py="8" borderRadius="xl">
                <Skeleton height="7" width="20" borderRadius="md" bg="gray.200" />
            </Flex>
        </Box>
    );
}

export function SearchSkeleton() {
    return (
        <Box bg="white" _dark={{ bg: "dark.secondaryBg" }} mt="2" p="2" borderRadius="lg" shadow="lg" maxH="64" overflowY="auto" zIndex="50" position="absolute" top="full" left="0" right="0">
            {[...Array(5)].map((_, index) => (
                <Flex key={index} alignItems="center" px={4} py={2}>
                    <Skeleton height="4" width="4" borderRadius="full" mr="4" bg="gray.300" _dark={{ bg: "gray.600" }} />
                    <Skeleton flex="1" height="4" borderRadius="md" bg="gray.300" _dark={{ bg: "gray.600" }} />
                </Flex>
            ))}
        </Box>
    );
}

export function NotificationSkeleton() {
    return (
        <Box bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} p="4" borderRadius="lg" shadow="lg" zIndex="50" position="absolute" right="0" mt="2" w="64">
            {[...Array(3)].map((_, index) => (
                <Flex key={index} alignItems="center" px="4" py="2">
                    <Skeleton height="6" width="6" borderRadius="full" mr="4" bg="gray.300" _dark={{ bg: "gray.600" }} />
                    <Skeleton flex="1" height="4" borderRadius="md" bg="gray.300" _dark={{ bg: "gray.600" }} />
                </Flex>
            ))}
        </Box>
    );
}

export function DashboardSkeleton() {
    return (
        <Box mx="auto" mt={8} p={4}>
            {[...Array(3)].map((_, index) => (
                <Box key={index} bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} p="6" borderRadius="lg" shadow="lg" overflow="hidden">
                    <Skeleton height="8" width="75%" mb="4" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height="6" width="50%" mb="2" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height="6" width="33%" mb="2" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height="6" width="25%" mb="2" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height="6" width="20%" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                </Box>
            ))}
        </Box>
    );
}

export function HomePageSkeleton() {
    return (
        <Box mx="auto" mt="8" p="4">
            <Skeleton height="8" width="25%" mb="4" borderRadius="md" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
            <Box display="flex" justifyContent="space-between" mb="4">
                {[...Array(3)].map((_, index) => (
                    <Skeleton key={index} height={10} width="25%" borderRadius="md" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                ))}
            </Box>
            {[...Array(3)].map((_, index) => (
                <Box key={index} p={4} mb={4} bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} borderRadius="lg" shadow="md">
                    <Skeleton height={6} width="75%" mb={2} bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height={4} width="50%" mb={2} bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height={4} width="33%" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                </Box>
            ))}
        </Box>
    );
}

export function UserPostsSkeleton() {
    return (
        <Box mx="auto" mt={8} p={4}>
            <Skeleton height={8} width="25%" mb={4} borderRadius="md" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
            {[...Array(3)].map((_, index) => (
                <Box key={index} p="4" mb="4" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} borderRadius="lg" shadow="md">
                    <Skeleton height="6" width="75%" mb="2" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height="4" width="50%" mb="2" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                    <Skeleton height="4" width="33%" bg="light.secondaryBg" _dark={{ bg: "dark.secondaryBg" }} />
                </Box>
            ))}
        </Box>
    );
}
