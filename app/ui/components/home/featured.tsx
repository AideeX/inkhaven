'use client';

import Link from 'next/link';
import { useFeaturedPosts } from '@/app/lib/hooks/featured';
import { Box, Image, Heading, Text } from '@chakra-ui/react';

const FeaturedPosts: React.FC = () => {
    const { posts, loading, error } = useFeaturedPosts();

    if (loading) return <p>Loading featured posts...</p>;
    if (error) return <p>Error loading featured posts: {error.message}</p>;

    return (
        <Box bg="light.secondaryBg" _dark="dark.secondaryBg" p="4" rounded="lg" shadow="md">
            <Heading as="h2" size="md" mb="4" color="light.heading" _dark="dark.heading">Featured Posts</Heading>
            <Box className="space-y-4">
                {posts.map(post => (
                    <Link key={post.id} href={`/home/${post.id}`}>
                        <Box display="flex" alignItems="center" p="2" rounded="md" _hover={{ bg: 'light.accentLight', dark: 'dark.accentLight' }}>
                            {post.coverImageUrl && (
                                <Image src={post.coverImageUrl} alt={post.title} w="16" h="16" objectFit="cover" rounded="md" />
                            )}
                            <Box ml="4">
                                <Heading as="h3" size="sm" color="light.text" _dark="dark.text">{post.title}</Heading>
                                <Text fontSize="sm" color="light.secondaryText" _dark="dark.secondaryText">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </Text>
                            </Box>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Box>
    );
};

export default FeaturedPosts;
