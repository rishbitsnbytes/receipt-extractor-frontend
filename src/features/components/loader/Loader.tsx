import { Center, Loader as MantineLoader, Text, Stack } from '@mantine/core';

export function Loader() {
  return (
    <Center h={300}>
      <Stack align="center">
        <MantineLoader size="lg" />
        <Text fw={500} mt="md">
          Extracting receipt details...
        </Text>
      </Stack>
    </Center>
  );
}